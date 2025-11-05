package com.style.controller;

import com.style.dto.service.ServiceResponse;
import com.style.dto.service.CreateServiceRequest;
import com.style.dto.service.UpdateServiceRequest;
import com.style.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping
    public ResponseEntity<ServiceResponse> createService(
            @Valid @RequestBody CreateServiceRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        UUID owner = UUID.fromString(jwt.getSubject());
        ServiceResponse createdService = serviceService.createService(request, owner);
        return ResponseEntity.ok(createdService);
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getServices(@AuthenticationPrincipal Jwt jwt) {
        UUID owner = UUID.fromString(jwt.getSubject());
        List<ServiceResponse> services = serviceService.getServicesByOwner(owner);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse> getService(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        UUID owner = UUID.fromString(jwt.getSubject());
        ServiceResponse service = serviceService.getServiceByIdAndOwner(id, owner);
        return ResponseEntity.ok(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponse> updateService(
            @PathVariable Long id,
            @Valid @RequestBody UpdateServiceRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        UUID owner = UUID.fromString(jwt.getSubject());
        ServiceResponse updatedService = serviceService.updateService(id, request, owner);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        UUID owner = UUID.fromString(jwt.getSubject());
        serviceService.deleteService(id, owner);
        return ResponseEntity.noContent().build();
    }
}