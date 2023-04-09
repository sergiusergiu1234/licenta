package com.StefanSergiu.Licenta.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestModel {
    private String name;
    private String brand_name;
    private String category_name;
    private String gender;
    private Float price;

}
