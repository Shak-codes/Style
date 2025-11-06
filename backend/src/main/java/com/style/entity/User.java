package com.style.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users", schema = "auth")
public class User {
    
    @Id
    @Column(name = "id")
    private UUID id;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "last_sign_in_at")
    private LocalDateTime lastSignInAt;
    
    public User() {}
    
    public User(UUID id, String email) {
        this.id = id;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    public UUID getId() { return id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public LocalDateTime getLastSignInAt() { return lastSignInAt; }
    public void setLastSignInAt(LocalDateTime lastSignInAt) { this.lastSignInAt = lastSignInAt; }
}