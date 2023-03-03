package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "category")
    private Set<Product> productSet;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
    public Long getId() {
        return id;
    }


}
