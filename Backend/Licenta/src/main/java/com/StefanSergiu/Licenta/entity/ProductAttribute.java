package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

@Entity
public class ProductAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    public Long getId() {
        return id;
    }


}
