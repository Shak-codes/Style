package com.style.dto.product;

import java.time.LocalDateTime;
import java.util.UUID;

public class ProductResponse {
    private final Long id;
    private final UUID owner;
    private final String name;
    private final Double cost;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public ProductResponse(Long id, UUID owner, String name, Double cost, 
                          LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.cost = cost;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public UUID getOwner() { return owner; }
    public String getName() { return name; }
    public Double getCost() { return cost; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}