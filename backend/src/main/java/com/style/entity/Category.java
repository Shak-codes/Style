package com.style.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "categories")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "owner")
    private UUID owner;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "color")
    private String color;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany(mappedBy = "categories")
    private Set<Service> services = new HashSet<>();
    
    public Category() {}
    
    public Category(UUID owner, String name, String color) {
        this.owner = owner;
        this.name = name;
        this.color = color;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    
    public UUID getOwner() { return owner; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Service> getServices() { return services; }

    public void addService(Service service) {
        this.services.add(service);
        service.getCategories().add(this);
    }
    
    public void removeService(Service service) {
        this.services.remove(service);
        service.getCategories().remove(this);
    }
    
    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", owner='" + owner + '\'' +
                '}';
    }
}