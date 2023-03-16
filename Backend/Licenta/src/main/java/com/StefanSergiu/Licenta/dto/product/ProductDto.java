package com.StefanSergiu.Licenta.dto.product;

import com.StefanSergiu.Licenta.dto.brand.PlainBrandDto;
import com.StefanSergiu.Licenta.dto.gender.PlainGenderDto;
import com.StefanSergiu.Licenta.entity.Product;
import lombok.Data;

import java.util.Objects;

@Data
public class ProductDto {

    private Long id;
    private String name;

    private Float price;
    private PlainBrandDto plainBrandDto;
    private PlainGenderDto plainGenderDto;
    public static ProductDto from(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setPrice(product.getPrice());
        if(Objects.nonNull(product.getBrand())){
            productDto.setPlainBrandDto(PlainBrandDto.from(product.getBrand()));
        }
        if(Objects.nonNull(product.getGender())){
            productDto.setPlainGenderDto(PlainGenderDto.from(product.getGender()));
        }
        return productDto;
    }
}
