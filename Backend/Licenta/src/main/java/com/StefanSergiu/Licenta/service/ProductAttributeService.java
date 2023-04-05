package com.StefanSergiu.Licenta.service;



import com.StefanSergiu.Licenta.dto.productAttribute.CreateProductAttributeModel;
import com.StefanSergiu.Licenta.entity.Attribute;
import com.StefanSergiu.Licenta.entity.Product;
//import com.StefanSergiu.Licenta.entity.ProductAttributeKey;
import com.StefanSergiu.Licenta.entity.ProductAttribute;
import com.StefanSergiu.Licenta.entity.ProductAttributeKey;
import com.StefanSergiu.Licenta.repository.AttributeRepository;
import com.StefanSergiu.Licenta.repository.ProductAttributeRepository;
import com.StefanSergiu.Licenta.repository.ProductRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductAttributeService {
    @Autowired
    EntityManager entityManager;
    @Autowired
    private ProductAttributeRepository productAttributeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AttributeRepository attributeRepository;

    @Transactional
    public ProductAttribute getProductAttribute(Long id){
        return productAttributeRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("ProductAttribute with id "+ id+ " not found!"));
    }
    @Transactional
    public ProductAttribute createProductAttribute(CreateProductAttributeModel createProductAttributeModel) {
        Product product = productRepository.findById(createProductAttributeModel.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + createProductAttributeModel.getProductId() + " not found!"));
        Attribute attribute = attributeRepository.findById(createProductAttributeModel.getAttributeId())
                .orElseThrow(() -> new EntityNotFoundException("Attribute with id " + createProductAttributeModel.getAttributeId() + " not found!"));
        String value = createProductAttributeModel.getValue();

        //create product_attibute key
        ProductAttributeKey key = new ProductAttributeKey();
        key.setProductId(createProductAttributeModel.getProductId());
        key.setAttributeId(createProductAttributeModel.getAttributeId());


        if(productAttributeRepository.findById(key).isPresent())     //check if combination already exists
            throw new EntityExistsException("Entity with composite key "+ key + " already exists!");

        //create new productAttribute
        ProductAttribute productAttribute = new ProductAttribute();
        productAttribute.setId(key);
        productAttribute.setProduct(product);
        productAttribute.setAttribute(attribute);
        productAttribute.setValue(value);

        return productAttributeRepository.save(productAttribute);
    }


    public List<ProductAttribute> getProductAttributes(){
       return StreamSupport.stream(productAttributeRepository.findAll().spliterator(),false)
               .collect(Collectors.toList());
    }

    @Transactional
    public ProductAttribute deleteProductAttribute(Long id){
        ProductAttribute productAttribute = getProductAttribute(id);
        //may need to detach but try this first
        productAttributeRepository.delete(productAttribute);
        return productAttribute;
    }


}
