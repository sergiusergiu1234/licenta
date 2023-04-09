package com.StefanSergiu.Licenta.filter;



import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductRequestModel;
import com.StefanSergiu.Licenta.entity.Brand;
import com.StefanSergiu.Licenta.entity.Product;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {  public Specification<Product> getProducts(ProductRequestModel request) {
    return (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();
        if (request.getBrand_name() != null && !request.getBrand_name().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand");
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(brandJoin.get("name")),
                    "%" + request.getBrand_name().toLowerCase() + "%"));
        }
        if (request.getName()!= null && !request.getName().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
                    "%" + request.getName().toLowerCase() + "%"));
        }
        if (request.getGender() != null && !request.getGender().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("gender")),
                    "%" + request.getGender().toLowerCase() + "%"));
        }
        if (request.getCategory_name() != null && !request.getCategory_name().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("category")),
                    "%" + request.getCategory_name().toLowerCase() + "%"));
        }

        query.orderBy(criteriaBuilder.desc(root.get("price")));
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
}
}
