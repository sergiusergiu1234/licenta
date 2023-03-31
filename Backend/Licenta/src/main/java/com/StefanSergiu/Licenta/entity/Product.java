package com.StefanSergiu.Licenta.entity;

import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(unique = true)
    private String name;

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

//    TODO:
//    String descripton
//    product -> cart many to many
//     product -> order_detail one to many
//     Many to one favorite
    // one to many product_attribute



    public static Product from(ProductDto productDto){
        Product product = new Product();
        product.setId(productDto.getId());
        product.setPrice((productDto.getPrice()));
        return product;
    }
}
