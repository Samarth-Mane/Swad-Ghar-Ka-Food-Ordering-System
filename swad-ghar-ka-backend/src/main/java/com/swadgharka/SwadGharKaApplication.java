package com.swadgharka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwadGharKaApplication {
    public static void main(String[] args) {
        SpringApplication.run(SwadGharKaApplication.class, args);
        System.out.println("========================================");
        System.out.println("  Swad Ghar Ka Backend Started!");
        System.out.println("  API running at: http://localhost:1818");
        System.out.println("========================================");
    }
}
