package com.style.service;

import com.style.dto.product.ProductResponse;
import com.style.dto.product.CreateProductRequest;
import com.style.dto.product.UpdateProductRequest;
import com.style.entity.Product;
import com.style.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        Objects.requireNonNull(request, "CreateProductRequest must not be null");

        UUID owner = getCurrentUserId();
        Product product = new Product(owner, request.getName(), request.getCost());
        Product savedProduct = Objects.requireNonNull(
                productRepository.save(product),
                "Saved product must not be null"
        );

        return convertToResponse(savedProduct);
    }

    public List<ProductResponse> getProductsByOwner() {
        UUID owner = getCurrentUserId();
        List<Product> products = productRepository.findByOwner(owner);
        return products.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Long id) {
        Objects.requireNonNull(id, "Product ID must not be null");

        UUID owner = getCurrentUserId();
        Product product = productRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return convertToResponse(product);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, UpdateProductRequest request) {
        Objects.requireNonNull(id, "Product ID must not be null");
        Objects.requireNonNull(request, "UpdateProductRequest must not be null");

        UUID owner = getCurrentUserId();
        Product product = productRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product = Objects.requireNonNull(product, "Fetched product must not be null");

        if (request.getName() != null) {
            product.setName(request.getName());
        }
        if (request.getCost() != null) {
            product.setCost(request.getCost());
        }

        Product updatedProduct = Objects.requireNonNull(
                productRepository.save(product),
                "Saved product must not be null"
        );

        return convertToResponse(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Objects.requireNonNull(id, "Product ID must not be null");

        UUID owner = getCurrentUserId();
        if (!productRepository.existsByIdAndOwner(id, owner)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteByIdAndOwner(id, owner);
    }

    private ProductResponse convertToResponse(Product product) {
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
