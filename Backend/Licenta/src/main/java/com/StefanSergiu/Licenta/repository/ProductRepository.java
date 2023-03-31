package com.StefanSergiu.Licenta.repository;

import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    Optional<Product> findByBrand(Brand brand);

    List<Product> findByBrandName(String brandName);
}
