package com.style.dto.service;

import com.style.dto.category.CreateCategoryRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

public class CreateServiceRequest {
    @NotBlank(message = "Service name is required")
    private String name;

    @NotNull(message = "Price is required")
    private Double cost;

    private Set<CreateCategoryRequest> categories;

    public CreateServiceRequest() {}

    public CreateServiceRequest(String name, Double cost, Set<CreateCategoryRequest> categories) {
        this.name = name;
        this.cost = cost;
        this.categories = categories;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return cost; }
    public void setPrice(Double cost) { this.cost = cost; }

    public Set<CreateCategoryRequest> getCategories() { return categories; }
    public void setCategories(Set<CreateCategoryRequest> categories) { this.categories = categories; }
}