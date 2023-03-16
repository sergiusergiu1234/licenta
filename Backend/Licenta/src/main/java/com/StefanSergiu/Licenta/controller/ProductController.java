package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.dto.product.CreateNewProductModel;
import com.StefanSergiu.Licenta.dto.product.PlainProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/admin/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody final CreateNewProductModel createNewProductModel){
        Product product = productService.addProduct(createNewProductModel);
        return new ResponseEntity<>(ProductDto.from(product), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getproducts(){
        List<Product> products = productService.getProducts();
        List<ProductDto>productsDto = products.stream().map(ProductDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(productsDto, HttpStatus.OK);
    }

    @GetMapping("/{brand_name}")
    public ResponseEntity<List<ProductDto>> getProductsByBrand(@PathVariable final String brand_name){
        List<Product> products = productService.getProductsByBrandName(brand_name);
        List<ProductDto>productsDto = products.stream().map(ProductDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(productsDto,HttpStatus.OK);
    }

    @DeleteMapping(value ="/admin/{id}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable final Long id){
        Product product = productService.deleteProduct(id);
        return new ResponseEntity<>(ProductDto.from(product),HttpStatus.OK);
    }


}
