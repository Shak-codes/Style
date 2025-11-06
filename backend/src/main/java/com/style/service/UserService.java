package com.style.service;

import com.style.entity.User;
import com.style.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(@NonNull UUID userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(@NonNull String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public boolean userExists(@NonNull UUID userId) {
        return userRepository.existsById(userId);
    }
}
