package com.style.service;

import com.style.entity.Category;
import com.style.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        UUID owner = getCurrentUserId();
        return categoryRepository.findByOwner(owner);
    }

    public Category createCategory(String name, String color) {
        UUID owner = getCurrentUserId();
        Category category = new Category(owner, name, color);
        return categoryRepository.save(category);
    }

    public Optional<Category> updateCategory(Long id, String name, String color) {
        Objects.requireNonNull(id, "Category ID must not be null");
        UUID owner = getCurrentUserId();
        
        Optional<Category> existingCategory = categoryRepository.findById(id);
        
        if (existingCategory.isPresent() && existingCategory.get().getOwner().equals(owner)) {
            Category category = existingCategory.get();
            
            if (name != null) {
                category.setName(name);
            }
            if (color != null) {
                category.setColor(color);
            }
            
            category.setUpdatedAt(java.time.LocalDateTime.now());
            
            return Optional.of(categoryRepository.save(category));
        }
        
        return Optional.empty();
    }

    public boolean deleteCategory(Long id) {
        Objects.requireNonNull(id, "Category ID must not be null");
        UUID owner = getCurrentUserId();
        
        Optional<Category> category = categoryRepository.findById(id);
        
        if (category.isPresent() && category.get().getOwner().equals(owner)) {
            categoryRepository.deleteById(id);
            return true;
        }
        
        return false;
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            return UUID.fromString(jwt.getSubject());
        }
        throw new RuntimeException("User not authenticated");
    }
}