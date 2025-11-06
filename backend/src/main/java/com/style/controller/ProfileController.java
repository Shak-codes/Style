package com.style.controller;

import com.style.entity.Profile;
import com.style.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<Profile> getProfile() {
        Optional<Profile> profile = profileService.getProfile();
        return profile.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestParam @NonNull Integer colorIndex) {
        Profile profile = profileService.createOrUpdateProfile(colorIndex);
        return ResponseEntity.ok(profile);
    }

    @PatchMapping("/color")
    public ResponseEntity<Profile> updateProfileColor(@RequestParam @NonNull Integer colorIndex) {
        Optional<Profile> profile = profileService.updateProfileColor(colorIndex);
        return profile.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}