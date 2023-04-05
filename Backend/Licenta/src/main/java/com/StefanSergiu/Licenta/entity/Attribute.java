package com.StefanSergiu.Licenta.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Table
@Entity
@Data
public class Attribute{
    @Id
    @GeneratedValue
    @Column(name = "id",nullable = false)
    private Long id;
    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id",nullable = false)
    @JsonIgnoreProperties("attributes")
    private Type type;

    @OneToMany(mappedBy = "attribute")
    private List<ProductAttribute> productAttributes;
}
