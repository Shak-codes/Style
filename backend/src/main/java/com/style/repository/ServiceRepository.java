package com.style.repository;

import com.style.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    List<Service> findByOwner(UUID owner);
    
    Optional<Service> findByIdAndOwner(Long id, UUID owner);
    
    @Query("SELECT s FROM Service s JOIN s.categories c WHERE s.owner = :owner AND c.id = :categoryId")
    List<Service> findByOwnerAndCategoryId(@Param("owner") UUID owner, @Param("categoryId") Long categoryId);
    
    boolean existsByIdAndOwner(Long id, UUID owner);
    
    void deleteByIdAndOwner(Long id, UUID owner);
}