package com.style.dto.category;

import java.time.LocalDateTime;
import java.util.UUID;

public class CategoryResponse {
    private final Long id;
    private final UUID owner;
    private final String name;
    private final String color;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public CategoryResponse(Long id, UUID owner, String name, String color, 
                           LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.color = color;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public UUID getOwner() { return owner; }
    public String getName() { return name; }
    public String getColor() { return color; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}