package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Gender {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "gender")
    private Set<Product> products;
    public Long getId() {
        return id;
    }

}
