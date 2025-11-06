package com.style.repository;

import com.style.entity.User;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    User findByEmail(@NonNull String email);

    boolean existsById(@NonNull UUID id);

    boolean existsByEmail(@NonNull String email);

    User findByEmailIgnoreCase(@NonNull String email);
}
