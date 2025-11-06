package com.style.entity;

import java.util.UUID;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {
    
    @Id
    @Column(name = "id")
    private UUID id;
    
    @Column(name = "color_index")
    private Integer colorIndex;
    
    public Profile() {}
    
    public Profile(UUID id, Integer colorIndex) {
        this.id = id;
        this.colorIndex = colorIndex;
    }
    
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
    
    public Integer getColorIndex() {
        return colorIndex;
    }
    
    public void setColorIndex(Integer colorIndex) {
        this.colorIndex = colorIndex;
    }
    
    @Override
    public String toString() {
        return "Profile{" +
                "id='" + id + '\'' +
                ", colorIndex=" + colorIndex +
                '}';
    }
}