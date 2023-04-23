package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.config.BucketName;
import com.StefanSergiu.Licenta.dto.product.CreateNewProductModel;
import com.StefanSergiu.Licenta.dto.product.PlainProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductRequestModel;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.service.FileStore;
import com.StefanSergiu.Licenta.service.ProductService;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.apache.http.entity.ContentType.*;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    AmazonS3 s3Client;
    @Autowired
    FileStore fileStore;
    @PostMapping("/admin/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody final CreateNewProductModel createNewProductModel){
        Product product = productService.addProduct(createNewProductModel);
        return new ResponseEntity<>(ProductDto.from(product), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getproducts(@RequestParam(name = "name", required = false) String name,
                                                        @RequestParam(name = "brand_name",required = false)String brand_name,
                                                        @RequestParam(name = "gender", required = false)String gender,
                                                        @RequestParam(name = "category_name",required = false)String category_name,
                                                        @RequestParam(name = "price",required = false)Float price){
        ProductRequestModel request = new ProductRequestModel(name,brand_name,category_name,gender,price);
        List<Product> products = productService.getAllProducts(request);
        List<ProductDto>productsDto = new ArrayList<>();
        for(Product product:products){
            // download the image for every fetched product
            byte[] imageData = fileStore.download(product.getImagePath(), product.getImageFileName());
            //construct the dto with product info and image
            productsDto.add(ProductDto.from(product,imageData));
        }

        //cache the products list
        CacheControl cacheControl = CacheControl.maxAge(30, TimeUnit.SECONDS);
        return ResponseEntity.ok()
                .cacheControl(cacheControl)
                .body(productsDto);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable final Long productId){
        Product product = productService.getProduct(productId);
        return new ResponseEntity<>(new ProductDto().from(product),HttpStatus.OK);
    }
    @DeleteMapping(value ="/admin/{id}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable final Long id){
        Product product = productService.deleteProduct(id);
        fileStore.deleteImage(product.getImagePath(), product.getImageFileName());
        return new ResponseEntity<>(ProductDto.from(product),HttpStatus.OK);
    }

    @GetMapping(value = "{id}/image/download")
    public byte[] downloadProductImage(@PathVariable("id") Long id){
        Product product = productService.getProduct(id);
        return fileStore.download(product.getImagePath(), product.getImageFileName());
    }
    @PostMapping(value = "/admin/add-image/{id}")
    public ResponseEntity<String> addProductImage(@PathVariable Long id, @RequestParam("file")MultipartFile file) {
        //check if product exists
        Product product = productService.getProduct(id);
        if (product == null) {
            return new ResponseEntity<>("Product not found!", HttpStatus.NOT_FOUND);
        }

        //Check if the file is an image
        if (!Arrays.asList(IMAGE_PNG.getMimeType(),
                IMAGE_BMP.getMimeType(),
                IMAGE_GIF.getMimeType(),
                IMAGE_JPEG.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("FIle uploaded is not an image");
        }
        //get file metadata
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        //Save Image in S3
        String path = String.format("%s/images/%s", BucketName.PRODUCT_IMAGE.getBucketName(), UUID.randomUUID());
        String fileName = String.format("%s", file.getOriginalFilename());
        try {
            fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());

        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload file", e);
        }
        //set the image to the product
        productService.updateProductImage(id, path,fileName);

        return new ResponseEntity<>("Image added succesfully",HttpStatus.OK);
    }
}
