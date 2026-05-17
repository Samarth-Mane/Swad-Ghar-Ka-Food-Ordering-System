package com.swadgharka.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double price;

    // e.g. Breakfast, Lunch, Dinner, Snacks, Dessert, Drinks
    @Column(nullable = false)
    private String category;

    private String imageUrl;

    private boolean isVeg = true;

    private boolean available = true;

    private Integer preparationTimeMinutes = 20;
}
