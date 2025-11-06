package com.style.dto.client;

import com.style.dto.product.ProductResponse;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class ClientResponse {
    private final Long id;
    private final UUID owner;
    private final String name;
    private final String notes;
    private final String[] hairProfile;
    private final Integer visits;
    private final Double spendingTotal;
    private final Double spendingAvg;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    private final Set<ProductResponse> products;

    public ClientResponse(Long id, UUID owner, String name, String notes, String[] hairProfile, 
                         Integer visits, Double spendingTotal, Double spendingAvg,
                         LocalDateTime createdAt, LocalDateTime updatedAt, Set<ProductResponse> products) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.notes = notes;
        this.hairProfile = hairProfile;
        this.visits = visits;
        this.spendingTotal = spendingTotal;
        this.spendingAvg = spendingAvg;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.products = products;
    }

    // Getters
    public Long getId() { return id; }
    public UUID getOwner() { return owner; }
    public String getName() { return name; }
    public String getNotes() { return notes; }
    public String[] getHairProfile() { return hairProfile; }
    public Integer getVisits() { return visits; }
    public Double getSpendingTotal() { return spendingTotal; }
    public Double getSpendingAvg() { return spendingAvg; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public Set<ProductResponse> getProducts() { return products; }
}