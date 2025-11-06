package com.style.service;

import com.style.entity.User;
import com.style.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getCurrentUser() {
        UUID userId = Objects.requireNonNull(getCurrentUserId(), "User ID must not be null");
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(@NonNull String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            return UUID.fromString(jwt.getSubject());
        }
        throw new RuntimeException("User not authenticated");
    }
}