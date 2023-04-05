package com.StefanSergiu.Licenta.entity;

import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Table
@Entity
@Data
public class Product{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column
    private Float price;

    @ManyToOne
    @JoinColumn(name = "brand_id",nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "gender_id",nullable = false)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<ProductAttribute> productAttributes=new ArrayList<>();
}
