package com.style.repository;

import com.style.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    
    List<Client> findByOwner(UUID owner);
    
    Optional<Client> findByIdAndOwner(Long id, UUID owner);
    
    @Query("SELECT c FROM Client c JOIN c.products p WHERE c.owner = :owner AND p.id = :productId")
    List<Client> findByOwnerAndProductId(@Param("owner") UUID owner, @Param("productId") Long productId);
    
    boolean existsByIdAndOwner(Long id, UUID owner);
    
    void deleteByIdAndOwner(Long id, UUID owner);
    
    List<Client> findByNameContainingIgnoreCaseAndOwner(String name, UUID owner);
}