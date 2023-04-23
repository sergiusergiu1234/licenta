package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.product.CreateNewProductModel;
import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductRequestModel;
import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Category;
import com.StefanSergiu.Licenta.entity.Gender;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.filter.ProductSpecification;
import com.StefanSergiu.Licenta.repository.BrandRepository;
import com.StefanSergiu.Licenta.repository.CategoryRepository;
import com.StefanSergiu.Licenta.repository.GenderRepository;
import com.StefanSergiu.Licenta.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class ProductService {
    @Autowired
    FileStore fileStore;

   @Autowired
    ProductRepository productRepository;

   @Autowired
   BrandRepository brandRepository;

   @Autowired
   GenderRepository genderRepository;
    @Autowired
     CategoryRepository categoryRepository;

    @Autowired
    ProductSpecification productSpecification;

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

        Category category = categoryRepository.findByName(createNewProductModel.getCategory_name());
        if(category == null){
            throw new EntityNotFoundException("Category " + createNewProductModel.getCategory_name() + " not found");
        }


        //set every field of the product (from createNewProductModel)
        product.setGender(gender);
        product.setBrand(brand);
        product.setCategory(category);
        product.setName(createNewProductModel.getName());
        product.setPrice(createNewProductModel.getPrice());
        product.setDescription(createNewProductModel.getDescription());
        //add the product to the other side of every relationship
        brand.addProduct(product);
        gender.addProduct(product);
        category.addProduct(product);

        return productRepository.save(product);
    }


    public byte[] downloadProductImage(Long id) {
        Product product = productRepository.findById(id).get();
        return fileStore.download(product.getImagePath(), product.getImageFileName());
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

    @Transactional
    public Product deleteProduct(Long id){
        Product product = getProduct(id);
        product.getBrand().getProducts().remove(product);   //detach product from brand
        product.getGender().getProducts().remove(product);  //detach product from gender
        product.getCategory().getProducts().remove(product); //detach product from category
        productRepository.delete(product);
        return product;
    }

    @Transactional
    public Product editProduct(Long id, Product product){       //id retrieve product from db. item used to update existing item
        Product productToEdit = getProduct(id);      //mananged product. no need to .save
        productToEdit.setName(product.getName());
        return productToEdit;          //changes will be persisted
    }

    @Transactional
    public void updateProductImage(Long productId, String imagePath, String imageFileName) {
        Product product = getProduct(productId);
        product.setImageFileName(imageFileName);
        product.setImagePath(imagePath);
        productRepository.save(product);
    }

    public List<Product> getAllProducts(ProductRequestModel request){
        List<Product> list = null;
        list = productRepository.findAll(productSpecification.getProducts(request));
        return list;
    }
}
