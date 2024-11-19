package com.prashantjain.yummyrest.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Automatically generate the primary key
    private Long id;

    @Column(name = "name", nullable = false) // Product name (cannot be null)
    private String name;

    @Column(name = "price", nullable = false) // Product price (cannot be null)
    private Double price;
}
