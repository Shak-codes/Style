package com.style.dto.client;

import com.style.dto.product.CreateProductRequest;
import jakarta.validation.constraints.Size;
import java.util.Set;

public class UpdateClientRequest {
    @Size(min = 1, max = 100, message = "Client name must be between 1 and 100 characters")
    private String name;

    @Size(max = 1000, message = "Notes cannot exceed 1000 characters")
    private String notes;

    private String[] hairProfile;

    private Set<CreateProductRequest> products;

    public UpdateClientRequest() {}

    public UpdateClientRequest(String name, String notes, String[] hairProfile, Set<CreateProductRequest> products) {
        this.name = name;
        this.notes = notes;
        this.hairProfile = hairProfile;
        this.products = products;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String[] getHairProfile() { return hairProfile; }
    public void setHairProfile(String[] hairProfile) { this.hairProfile = hairProfile; }

    public Set<CreateProductRequest> getProducts() { return products; }
    public void setProducts(Set<CreateProductRequest> products) { this.products = products; }
}