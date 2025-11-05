package com.style.dto.service;

import com.style.dto.category.CategoryResponse;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class ServiceResponse {
    private final Long id;
    private final UUID owner;
    private final String name;
    private final Double cost;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    private final Set<CategoryResponse> categories;

    public ServiceResponse(Long id, UUID owner, String name, Double cost, 
                          LocalDateTime createdAt, LocalDateTime updatedAt, 
                          Set<CategoryResponse> categories) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.cost = cost;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categories = categories;
    }

    public Long getId() { return id; }
    public UUID getOwner() { return owner; }
    public String getName() { return name; }
    public Double getPrice() { return cost; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public Set<CategoryResponse> getCategories() { return categories; }
}