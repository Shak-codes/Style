package com.style.controller;

import com.style.dto.client.ClientResponse;
import com.style.dto.client.CreateClientRequest;
import com.style.dto.client.UpdateClientRequest;
import com.style.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientResponse> createClient(@RequestBody @NonNull CreateClientRequest request) {
        ClientResponse createdClient = clientService.createClient(request);
        return ResponseEntity.ok(createdClient);
    }

    @GetMapping
    public ResponseEntity<List<ClientResponse>> getClients() {
        List<ClientResponse> clients = clientService.getClientsByOwner();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> getClient(@PathVariable @NonNull Long id) {
        ClientResponse client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponse> updateClient(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull UpdateClientRequest request) {
        ClientResponse updatedClient = clientService.updateClient(id, request);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable @NonNull Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
