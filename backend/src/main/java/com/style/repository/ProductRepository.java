package com.style.repository;

import com.style.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByOwner(UUID owner);
    
    Optional<Product> findByIdAndOwner(Long id, UUID owner);
    
    Optional<Product> findByOwnerAndName(UUID owner, String name);
    
    @Query("SELECT p FROM Product p JOIN p.clients c WHERE p.owner = :owner AND c.id = :clientId")
    List<Product> findByOwnerAndClientId(@Param("owner") UUID owner, @Param("clientId") Long clientId);
    
    boolean existsByIdAndOwner(Long id, UUID owner);
    
    void deleteByIdAndOwner(Long id, UUID owner);
    
    List<Product> findByNameContainingIgnoreCaseAndOwner(String name, UUID owner);
}