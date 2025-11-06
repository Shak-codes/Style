package com.style.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "owner", nullable = false)
    private UUID owner;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Double cost;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany(mappedBy = "products")
    private Set<Client> clients = new HashSet<>();
    
    public Product() {}
    
    public Product(UUID owner, String name, Double cost) {
        this.owner = owner;
        this.name = name;
        this.cost = cost;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public UUID getOwner() { return owner; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Client> getClients() { return clients; }
    public void setClients(Set<Client> clients) { this.clients = clients; }

    public void addClient(Client client) {
        this.clients.add(client);
        client.getProducts().add(this);
    }
    
    public void removeClient(Client client) {
        this.clients.remove(client);
        client.getProducts().remove(this);
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost=" + cost +
                ", owner='" + owner + '\'' +
                '}';
    }
}