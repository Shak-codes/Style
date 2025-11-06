package com.style.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "clients")
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "owner", nullable = false)
    private UUID owner;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "hair_profile")
    private String[] hairProfile;
    
    @Column(name = "visits")
    private Integer visits = 0;
    
    @Column(name = "spending_total")
    private Double spendingTotal = 0.0;
    
    @Column(name = "spending_avg")
    private Double spendingAvg = 0.0;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "client_products",
        joinColumns = @JoinColumn(name = "client_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products = new HashSet<>();
    
    public Client() {}
    
    public Client(UUID owner, String name, String notes, String[] hairProfile) {
        this.owner = owner;
        this.name = name;
        this.notes = notes;
        this.hairProfile = hairProfile;
        this.visits = 0;
        this.spendingTotal = 0.0;
        this.spendingAvg = 0.0;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public UUID getOwner() { return owner; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public String[] getHairProfile() { return hairProfile; }
    public void setHairProfile(String[] hairProfile) { this.hairProfile = hairProfile; }
    
    public Integer getVisits() { return visits; }
    public void setVisits(Integer visits) { this.visits = visits; }
    
    public Double getSpendingTotal() { return spendingTotal; }
    public void setSpendingTotal(Double spendingTotal) { this.spendingTotal = spendingTotal; }
    
    public Double getSpendingAvg() { return spendingAvg; }
    public void setSpendingAvg(Double spendingAvg) { this.spendingAvg = spendingAvg; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Set<Product> getProducts() { return products; }
    public void setProducts(Set<Product> products) { this.products = products; }
    
    public void addProduct(Product product) {
        this.products.add(product);
        product.getClients().add(this);
    }
    
    public void removeProduct(Product product) {
        this.products.remove(product);
        product.getClients().remove(this);
    }
    
    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", owner='" + owner + '\'' +
                '}';
    }
}