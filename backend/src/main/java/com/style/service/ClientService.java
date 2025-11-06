package com.style.service;

import com.style.dto.client.ClientResponse;
import com.style.dto.client.CreateClientRequest;
import com.style.dto.client.UpdateClientRequest;
import com.style.dto.product.ProductResponse;
import com.style.dto.product.CreateProductRequest;
import com.style.entity.Client;
import com.style.entity.Product;
import com.style.repository.ClientRepository;
import com.style.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ClientResponse createClient(CreateClientRequest request) {
        Objects.requireNonNull(request, "CreateClientRequest must not be null");

        UUID owner = getCurrentUserId();
        Client client = new Client(owner, request.getName(), request.getNotes(), request.getHairProfile());

        if (request.getProducts() != null && !request.getProducts().isEmpty()) {
            Set<Product> products = processProducts(request.getProducts(), owner);
            client.setProducts(products);
        }

        Client savedClient = Objects.requireNonNull(clientRepository.save(client), "Saved client must not be null");
        return convertToResponse(savedClient);
    }

    private Set<Product> processProducts(Set<CreateProductRequest> productRequests, UUID owner) {
        Objects.requireNonNull(productRequests, "productRequests must not be null");
        Objects.requireNonNull(owner, "owner must not be null");

        Set<Product> products = new HashSet<>();

        for (CreateProductRequest productRequest : productRequests) {
            Objects.requireNonNull(productRequest, "productRequest must not be null");
            Product product = productRepository.findByOwnerAndName(owner, productRequest.getName())
                .orElseGet(() -> {
                    Product newProduct = new Product(owner, productRequest.getName(), productRequest.getCost());
                    return Objects.requireNonNull(productRepository.save(newProduct), "Saved product must not be null");
                });
            products.add(Objects.requireNonNull(product, "Product must not be null"));
        }

        return products;
    }

    public List<ClientResponse> getClientsByOwner() {
        UUID owner = getCurrentUserId();
        List<Client> clients = clientRepository.findByOwner(owner);
        return clients.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ClientResponse getClientById(Long id) {
        Objects.requireNonNull(id, "Client ID must not be null");
        UUID owner = getCurrentUserId();

        Client client = clientRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        return convertToResponse(client);
    }

    @Transactional
    public ClientResponse updateClient(Long id, UpdateClientRequest request) {
        Objects.requireNonNull(id, "Client ID must not be null");
        Objects.requireNonNull(request, "UpdateClientRequest must not be null");

        UUID owner = getCurrentUserId();
        Client client = clientRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        client = Objects.requireNonNull(client, "Fetched client must not be null");

        if (request.getName() != null) {
            client.setName(request.getName());
        }
        if (request.getNotes() != null) {
            client.setNotes(request.getNotes());
        }
        if (request.getHairProfile() != null) {
            client.setHairProfile(request.getHairProfile());
        }

        if (request.getProducts() != null) {
            Set<Product> products = processProducts(request.getProducts(), owner);
            client.setProducts(products);
        }

        Client updatedClient = Objects.requireNonNull(clientRepository.save(client), "Saved client must not be null");
        return convertToResponse(updatedClient);
    }

    @Transactional
    public void deleteClient(Long id) {
        Objects.requireNonNull(id, "Client ID must not be null");

        UUID owner = getCurrentUserId();
        if (!clientRepository.existsByIdAndOwner(id, owner)) {
            throw new RuntimeException("Client not found");
        }
        clientRepository.deleteByIdAndOwner(id, owner);
    }

    private ClientResponse convertToResponse(Client client) {
        Objects.requireNonNull(client, "Client must not be null");

        Set<Product> clientProducts = Objects.requireNonNullElse(client.getProducts(), Collections.emptySet());
        Set<ProductResponse> productResponses = clientProducts.stream()
                .map(this::convertProductToResponse)
                .collect(Collectors.toSet());

        return new ClientResponse(
            client.getId(),
            client.getOwner(),
            client.getName(),
            client.getNotes(),
            client.getHairProfile(),
            client.getVisits(),
            client.getSpendingTotal(),
            client.getSpendingAvg(),
            client.getCreatedAt(),
            client.getUpdatedAt(),
            productResponses
        );
    }

    private ProductResponse convertProductToResponse(Product product) {
        Objects.requireNonNull(product, "Product must not be null");
        return new ProductResponse(
            product.getId(),
            product.getOwner(),
            product.getName(),
            product.getCost(),
            product.getCreatedAt(),
            product.getUpdatedAt()
        );
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            String subject = jwt.getSubject();
            return Objects.requireNonNull(UUID.fromString(subject), "User UUID cannot be null");
        }
        throw new RuntimeException("User not authenticated");
    }
}
