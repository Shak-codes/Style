package com.style.service;

import com.style.entity.Profile;
import com.style.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Optional<Profile> getProfile() {
        UUID userUid = Objects.requireNonNull(getCurrentUserId(), "User ID must not be null");
        return profileRepository.findById(userUid);
    }

    @Transactional
    public Profile createOrUpdateProfile(Integer colorIndex) {
        UUID userUid = Objects.requireNonNull(getCurrentUserId(), "User ID must not be null");
        Optional<Profile> existingProfile = profileRepository.findById(userUid);
        if (existingProfile.isPresent()) {
            Profile profile = existingProfile.get();
            profile.setColorIndex(colorIndex);
            return profileRepository.save(profile);
        } else {
            Profile newProfile = new Profile();
            newProfile.setId(userUid);
            newProfile.setColorIndex(colorIndex);
            return profileRepository.save(newProfile);
        }
    }

    @Transactional
    public Optional<Profile> updateProfileColor(Integer colorIndex) {
        UUID userUid = Objects.requireNonNull(getCurrentUserId(), "User ID must not be null");
        Optional<Profile> profileOpt = profileRepository.findById(userUid);
        if (profileOpt.isPresent()) {
            Profile profile = profileOpt.get();
            profile.setColorIndex(colorIndex);
            return Optional.of(profileRepository.save(profile));
        }
        return Optional.empty();
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            return UUID.fromString(jwt.getSubject());
        }
        throw new RuntimeException("User not authenticated");
    }
}