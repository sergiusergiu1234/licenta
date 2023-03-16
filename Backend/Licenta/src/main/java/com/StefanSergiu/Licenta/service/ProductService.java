package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.product.CreateNewProductModel;
import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Gender;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.repository.BrandRepository;
import com.StefanSergiu.Licenta.repository.GenderRepository;
import com.StefanSergiu.Licenta.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService {
   @Autowired
    ProductRepository productRepository;

   @Autowired
   BrandRepository brandRepository;

   @Autowired
   GenderRepository genderRepository;

    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(()->new EntityNotFoundException("Product with id " + productId + " does not exist"));
    }

    @Transactional
    public Product addProduct(CreateNewProductModel createNewProductModel){
        Product product = new Product();

        Brand brand = brandRepository.findByName(createNewProductModel.getBrand_name());
        if(brand == null){
            throw new EntityNotFoundException("Brand " + createNewProductModel.getBrand_name() + " not found");
        }

        Gender gender = genderRepository.findByName(createNewProductModel.getGender_name());
        if(gender == null){
            throw new EntityNotFoundException("Gender " + createNewProductModel.getGender_name() + " not found");
        }

        product.setGender(gender);
        product.setBrand(brand);
        product.setName(createNewProductModel.getName());
        product.setPrice(createNewProductModel.getPrice());
        brand.addProduct(product);
        gender.addProduct(product);
        return productRepository.save(product);
    }

    public List<Product> getProducts(){
        return StreamSupport
                .stream(productRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public List<Product>  getProductsByBrandName(String brandName){
        return  StreamSupport
                .stream(productRepository.findByBrandName(brandName).spliterator(),false)
                .collect(Collectors.toList());
    }


    public Product deleteProduct(Long id){
        Product product = getProduct(id);
        product.getBrand().getProducts().remove(product);   //detach product from brand
        product.getGender().getProducts().remove(product);  //detach product from gender
        productRepository.delete(product);
        return product;
    }

    @Transactional
    public Product editProduct(Long id, Product product){       //id retrieve product from db. item used to update existing item
        Product productToEdit = getProduct(id);      //mananged product. no need to .save
        productToEdit.setName(product.getName());
        return productToEdit;          //changes will be persisted
    }


}
