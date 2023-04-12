package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.dto.productAttribute.CreateProductAttributeModel;
import com.StefanSergiu.Licenta.dto.productAttribute.ProductAttributeDto;
//import com.StefanSergiu.Licenta.entity.ProductAttributeKey;
import com.StefanSergiu.Licenta.entity.ProductAttribute;
import com.StefanSergiu.Licenta.service.ProductAttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/productAttributes")
public class ProductAttributeController {
    @Autowired
    ProductAttributeService productAttributeService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductAttributeDto>> getProductAttributes(){
        List<ProductAttribute> productAttributes = productAttributeService.getProductAttributes();

        List<ProductAttributeDto> productAttributeDtoList = productAttributes.stream().map(ProductAttributeDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(productAttributeDtoList, HttpStatus.OK);
    }

    @PostMapping("admin/add")
    public ResponseEntity<ProductAttributeDto> newProductAttribute(@RequestBody final CreateProductAttributeModel createProductAttributeModel){
        ProductAttribute productAttribute = productAttributeService.createProductAttribute(createProductAttributeModel);
        return new ResponseEntity<>(ProductAttributeDto.from(productAttribute),HttpStatus.OK);
    }

    @DeleteMapping("admin/delete/{id}")
    public ResponseEntity<ProductAttributeDto> deleteProductAttribute(@PathVariable final Long id){
        ProductAttribute productAttribute = productAttributeService.deleteProductAttribute(id);
        return new ResponseEntity<>(ProductAttributeDto.from(productAttribute),HttpStatus.OK);
    }
}