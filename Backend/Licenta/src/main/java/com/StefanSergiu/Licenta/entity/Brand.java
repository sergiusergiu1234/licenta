package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "brand")
    private Set<Product>products;
    public Long getId() {
        return id;
    }
}
