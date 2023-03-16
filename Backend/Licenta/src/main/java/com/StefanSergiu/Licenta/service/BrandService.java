package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Product;
import com.StefanSergiu.Licenta.exception.ProductIsAlreadyAssignedToBrandException;
import com.StefanSergiu.Licenta.repository.BrandRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class BrandService {

    @Autowired
    BrandRepository brandRepository;



    public Brand addBrand(Brand brand){return brandRepository.save(brand);}

    public List<Brand> getBrands(){
        return StreamSupport
                .stream(brandRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public Brand getBrand(Long id){
        return brandRepository.findById(id).orElseThrow(()->new EntityNotFoundException());
    }

    @Transactional
    public Brand deleteBrand(Long id){
        Brand brand = getBrand(id);
        brandRepository.delete(brand);
        return brand;
    }

    @Transactional
    public Brand editBrand(Long id, Brand brand){
        Brand brandToEdit = getBrand(id);
        brandToEdit.setName(brand.getName());
        return brandToEdit;
    }
    @Transactional
    public void deleteAllBrands() {
        brandRepository.deleteAll();
    }


//
}
