package com.swadgharka.controller;

import com.swadgharka.model.Order;
import com.swadgharka.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public Order saveOrder(
            @RequestBody Order order
    ) {

        return orderRepository.save(order);
    }
}