package com.StefanSergiu.Licenta.entity;

import com.StefanSergiu.Licenta.dto.product.ProductDto;
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

//    TODO:
//    category_id ManyToOne
//    String descripton
//    product -> cart many to many



    public static Product from(ProductDto productDto){
        Product product = new Product();
        product.setId(productDto.getId());
        product.setPrice((productDto.getPrice()));
        return product;
    }
}
