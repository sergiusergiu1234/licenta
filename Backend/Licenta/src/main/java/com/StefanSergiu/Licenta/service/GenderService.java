package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Category;
import com.StefanSergiu.Licenta.entity.Gender;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.repository.GenderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GenderService {

    @Autowired
    GenderRepository genderRepository;



    public Gender addGender(Gender gender){return genderRepository.save(gender);}

    public List<Gender> getGenders(){
        return StreamSupport
                .stream(genderRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public Gender getGender(Long id){
        return genderRepository.findById(id).orElseThrow(()->new EntityNotFoundException());
    }

    @Transactional
    public Gender deleteGender(Long id){
        Gender gender = getGender(id);
        //for all products of the gender
       List <Product> products = gender.getProducts();
       for(Product product : products){
           Brand brand = product.getBrand();        //remove link brand-product
           brand.removeProduct(product);
//           Category category = product.getCategory();   //remove link category-product
//           category.removeProduct(product);
       }
        genderRepository.delete(gender);
        return gender;
    }

    @Transactional
    public void deleteAllGenders() {
        genderRepository.deleteAll();
    }
    }