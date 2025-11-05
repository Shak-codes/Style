package com.style.service;

import com.style.dto.service.ServiceResponse;
import com.style.dto.service.CreateServiceRequest;
import com.style.dto.service.UpdateServiceRequest;
import com.style.dto.category.CategoryResponse;
import com.style.dto.category.CreateCategoryRequest;
import com.style.entity.Category;
import com.style.entity.Service;
import com.style.repository.CategoryRepository;
import com.style.repository.ServiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public ServiceResponse createService(CreateServiceRequest request, UUID owner) {
        // Create the main service entity
        Service service = new Service(owner, request.getName(), request.getPrice());

        // Process categories
        if (request.getCategories() != null && !request.getCategories().isEmpty()) {
            Set<Category> categories = processCategories(request.getCategories(), owner);
            service.setCategories(categories);
        }

        // Save the service
        Service savedService = serviceRepository.save(service);
        return convertToResponse(savedService);
    }

    private Set<Category> processCategories(Set<CreateCategoryRequest> categoryRequests, UUID owner) {
        Set<Category> categories = new HashSet<>();

        for (CreateCategoryRequest categoryRequest : categoryRequests) {
            Category category = categoryRepository.findByOwnerAndName(owner, categoryRequest.getName())
                .orElseGet(() -> {
                    Category newCategory = new Category(owner, categoryRequest.getName(), categoryRequest.getColor());
                    return categoryRepository.save(newCategory);
                });
            categories.add(category);
        }

        return categories;
    }

    public List<ServiceResponse> getServicesByOwner(UUID owner) {
        List<Service> services = serviceRepository.findByOwner(owner);
        return services.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse getServiceByIdAndOwner(Long id, UUID owner) {
        Service service = serviceRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        return convertToResponse(service);
    }

    @Transactional
    public ServiceResponse updateService(Long id, UpdateServiceRequest request, UUID owner) {
        Service service = serviceRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        service.setName(request.getName());
        service.setPrice(request.getPrice());

        // Update categories
        if (request.getCategories() != null) {
            Set<Category> categories = processCategories(request.getCategories(), owner);
            service.setCategories(categories);
        }

        Service updatedService = serviceRepository.save(service);
        return convertToResponse(updatedService);
    }

    public void deleteService(Long id, UUID owner) {
        if (!serviceRepository.existsByIdAndOwner(id, owner)) {
            throw new RuntimeException("Service not found");
        }
        serviceRepository.deleteByIdAndOwner(id, owner);
    }

    private ServiceResponse convertToResponse(Service service) {
        Set<CategoryResponse> categoryResponses = service.getCategories().stream()
                .map(this::convertCategoryToResponse)
                .collect(Collectors.toSet());

        return new ServiceResponse(
            service.getId(),
            service.getOwner(),
            service.getName(),
            service.getPrice(),
            service.getCreatedAt(),
            service.getUpdatedAt(),
            categoryResponses
        );
    }

    private CategoryResponse convertCategoryToResponse(Category category) {
        return new CategoryResponse(
            category.getId(),
            category.getOwner(),
            category.getName(),
            category.getColor(),
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }
}