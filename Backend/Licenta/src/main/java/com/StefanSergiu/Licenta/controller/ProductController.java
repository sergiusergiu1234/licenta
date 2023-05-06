package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.config.BucketName;
import com.StefanSergiu.Licenta.dto.product.CreateNewProductModel;
import com.StefanSergiu.Licenta.dto.product.PlainProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductRequestModel;
import com.StefanSergiu.Licenta.entity.Favorite;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.repository.FavoriteRepository;
import com.StefanSergiu.Licenta.service.FavoriteService;
import com.StefanSergiu.Licenta.service.FileStore;
import com.StefanSergiu.Licenta.service.ProductService;
import com.StefanSergiu.Licenta.service.UserService;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Autowired
    UserService userService;

    @Autowired
    FavoriteService favoriteService;

    @PostMapping("/admin/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody final CreateNewProductModel createNewProductModel){
        Product product = productService.addProduct(createNewProductModel);
        return new ResponseEntity<>(ProductDto.from(product), HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public ResponseEntity<Page<ProductDto>> getproducts(@RequestParam(name = "name", required = false) String name,
                                                        @RequestParam(name = "brands",required = false)String brands,
                                                        @RequestParam(name = "genders", required = false)String genders,
                                                        @RequestParam(name = "category_name",required = false)String category_name,
                                                        @RequestParam(name = "price",required = false)Float price,
                                                        @RequestParam(name ="minPrice", required = false) Float minPrice,
                                                        @RequestParam(name = "maxPrice", required = false) Float maxPrice,
                                                        @RequestParam(name = "type_name", required = false) String type_name,
                                                        @RequestParam(name = "attributes", required = false) String attributesParam,
                                                        @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber,
                                                        @RequestParam(name = "size", defaultValue = "9") int size){

        // Parse attributes parameter into a Map<String, String>
        Map<String, String> attributes = new HashMap<>();
        if (attributesParam != null) {
            String[] pairs = attributesParam.split("_");
            for (String pair : pairs) {
                String[] parts = pair.split(":");
                if (parts.length == 2) {
                    attributes.put(parts[0], parts[1]);
                }
            }
        }

        ProductRequestModel request = new ProductRequestModel(name,brands,category_name,genders,price, minPrice, maxPrice, type_name,attributes);
        //get logged in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        UserInfo user = userService.getLoggedInUser(username);
        //---
        Integer userId = null;
        if (user != null) {
            userId = user.getId();
        }
        //---
        //favorite list by logged user. If user is null, then all productDto's are false on favorite
        List<Favorite> favorites;
        if(userId != null){
            favorites = favoriteService.getFavoriteByUser(userId);
        } else {
            favorites = null;
        }


        Pageable pageable = PageRequest.of(pageNumber, size, Sort.Direction.ASC,"name");

        Page<ProductDto> productsPage = productService.getAllProducts(request, pageable)
                .map(product -> {
                    ProductDto productDto = ProductDto.from(product);

//            // download the image for every fetched product
//            byte[] imageData = fileStore.download(product.getImagePath(), product.getImageFileName());
//            //set the image to the dto
//            productDto.setImage(imageData);
                    //placeholder for image downloading
                    byte[] placeholderByteArray = new byte[16992];
                    productDto.setImage(placeholderByteArray);

                    //set isFavorite to false by default
                    productDto.setIsFavorite(false);
                    //for every favorite entry in favorites list, set the isFavorite flag in Dto
                    if(favorites != null){
                        for(Favorite favorite: favorites) {
                            if (favorite.getProduct().getId() == product.getId()) {
                                productDto.setIsFavorite(true);
                                break;
                            }
                        }
                    }
                    return productDto;
                });

        return ResponseEntity.ok(productsPage);
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
