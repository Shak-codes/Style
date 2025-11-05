package com.style.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner", nullable = false)
    private UUID owner;

    @Column(nullable = false)
    private String name;

    @Column(name = "cost")
    private Double cost;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "service_categories",
        joinColumns = @JoinColumn(name = "service_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    public Service() {}

    public Service(UUID owner, String name, Double cost) {
        this.owner = owner;
        this.name = name;
        this.cost = cost;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UUID getOwner() { return owner; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return cost; }
    public void setPrice(Double cost) { this.cost = cost; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Category> getCategories() { return categories; }
    public void setCategories(Set<Category> categories) { this.categories = categories; }

    public void addCategory(Category category) {
        this.categories.add(category);
        category.getServices().add(this);
    }

    public void removeCategory(Category category) {
        this.categories.remove(category);
        category.getServices().remove(this);
    }
}