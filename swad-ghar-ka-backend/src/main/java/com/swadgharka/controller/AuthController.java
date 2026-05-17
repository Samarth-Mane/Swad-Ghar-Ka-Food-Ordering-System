package com.swadgharka.controller;

import com.swadgharka.model.User;
import com.swadgharka.repository.UserRepository;
import com.swadgharka.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // REGISTER API
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user
    ) {

        // CHECK EXISTING EMAIL
        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if (existingUser.isPresent()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already exists");
        }

        // ENCODE PASSWORD
        user.setPassword(

                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        // DEFAULT ROLE
        user.setRole(User.Role.USER);

        // SAVE USER
        userRepository.save(user);

        return ResponseEntity.ok(
                "User registered successfully"
        );
    }

    // =========================
    // LOGIN API
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser
    ) {

        // FIND USER
        Optional<User> user =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        // EMAIL CHECK
        if (user.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid Email");
        }

        // PASSWORD CHECK
        if (!passwordEncoder.matches(

                loginUser.getPassword(),

                user.get().getPassword()

        )) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid Password");
        }

        // GENERATE JWT TOKEN
        String token =
                jwtUtil.generateToken(
                        user.get().getEmail()
                );

        // RESPONSE
        Map<String, String> response =
                new HashMap<>();

        response.put(
                "token",
                token
        );

        response.put(
                "name",
                user.get().getName()
        );

        response.put(
                "email",
                user.get().getEmail()
        );

        return ResponseEntity.ok(response);
    }
}