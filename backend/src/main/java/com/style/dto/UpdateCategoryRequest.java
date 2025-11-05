package com.style.dto;

import jakarta.validation.constraints.Size;

public class UpdateCategoryRequest {
    
    @Size(min = 1, max = 16, message = "Category name must be between 1 and 16 characters")
    private String name;
    
    @Size(max = 7, message = "Color must be a valid hex color code")
    private String color;

    public UpdateCategoryRequest() {}

    public UpdateCategoryRequest(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}