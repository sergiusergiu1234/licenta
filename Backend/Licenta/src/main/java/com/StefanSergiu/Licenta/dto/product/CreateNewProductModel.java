package com.StefanSergiu.Licenta.dto.product;

import lombok.Getter;

@Getter
public class CreateNewProductModel {
    private String name;
    private String brand_name;
    private String gender_name;
    private Float price;
    //TODO: celelalte foreign keyuri
}
