package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "type")
    private Set<Category> categorySet;

    public Long getId() {
        return id;
    }

}
