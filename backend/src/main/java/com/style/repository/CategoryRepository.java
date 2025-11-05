package com.style.repository;

import com.style.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    List<Category> findByOwner(UUID owner);
    Optional<Category> findByOwnerAndName(UUID owner, String name);
}