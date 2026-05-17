package com.swadgharka.controller;

import com.swadgharka.model.ContactMessage;
import com.swadgharka.repository.ContactMessageRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactMessageRepository contactRepo;

    public ContactController(ContactMessageRepository contactRepo) {
        this.contactRepo = contactRepo;
    }

    // ===================================================
    // POST : Save Contact Message
    // ===================================================
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(
            @RequestBody ContactMessage msg
    ) {

        msg.setStatus("UNREAD");

        contactRepo.save(msg);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Message Sent Successfully"
                )
        );
    }

    // ===================================================
    // GET : Fetch All Messages
    // ===================================================
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {

        return ResponseEntity.ok(contactRepo.findAll());

    }

    // ===================================================
    // GET : Fetch Unread Messages
    // ===================================================
    @GetMapping("/unread")
    public ResponseEntity<List<ContactMessage>> getUnreadMessages() {

        return ResponseEntity.ok(
                contactRepo.findByStatus("UNREAD")
        );

    }

    // ===================================================
    // PUT : Mark Message As Read
    // ===================================================
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {

        return contactRepo.findById(id).map(msg -> {

            msg.setStatus("READ");

            contactRepo.save(msg);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Message marked as READ"
                    )
            );

        }).orElse(
                ResponseEntity.notFound().build()
        );
    }
}