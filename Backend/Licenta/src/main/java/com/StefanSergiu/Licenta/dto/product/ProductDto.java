package com.StefanSergiu.Licenta.dto.product;

import com.StefanSergiu.Licenta.dto.brand.PlainBrandDto;
import com.StefanSergiu.Licenta.dto.category.PlainCategoryDto;
import com.StefanSergiu.Licenta.dto.gender.PlainGenderDto;
import com.StefanSergiu.Licenta.dto.productAttribute.PlainProductAttributeDto;
import com.StefanSergiu.Licenta.dto.productAttribute.ProductAttributeDto;
import com.StefanSergiu.Licenta.entity.Product;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
public class ProductDto {

    private Long id;
    private String name;

    private Float price;
    private PlainBrandDto plainBrandDto;
    private PlainGenderDto plainGenderDto;
    private PlainCategoryDto plainCategoryDto;
    //**
    private List<PlainProductAttributeDto> productAttributeDtoList = new ArrayList<>();
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
        if(Objects.nonNull(product.getCategory())){
            productDto.setPlainCategoryDto(PlainCategoryDto.from(product.getCategory()));
        }
        //**
        productDto.setProductAttributeDtoList(product.getProductAttributes().stream().map(PlainProductAttributeDto::from).collect(Collectors.toList()));
        return productDto;
    }
}
