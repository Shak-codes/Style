package com.style.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CreateProductRequest {
    @NotBlank(message = "Product name is required")
    @Size(min = 1, max = 100, message = "Product name must be between 1 and 100 characters")
    private String name;

    @NotNull(message = "Cost is required")
    @Positive(message = "Cost must be greater than 0")
    private Double cost;

    public CreateProductRequest() {}

    public CreateProductRequest(String name, Double cost) {
        this.name = name;
        this.cost = cost;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }
}