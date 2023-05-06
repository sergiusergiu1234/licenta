package com.StefanSergiu.Licenta.filter;



import com.StefanSergiu.Licenta.dto.product.ProductDto;
import com.StefanSergiu.Licenta.dto.product.ProductRequestModel;
import com.StefanSergiu.Licenta.entity.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class ProductSpecification {

    public Specification<Product> getProducts(ProductRequestModel request) {
    return (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();

        //filter by type
        if(request.getType_name() != null ){
            Join<Product, Category> categoryJoin = root.join("category");
            Join<Category,Type> typeJoin = categoryJoin.join("type");

            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(typeJoin.get("name")),
                     "%" + request.getType_name().toLowerCase() + "%"));
        }

        // filter by attribute name and value
        if (request.getAttributes() != null && !request.getAttributes().isEmpty()) {
            List<Predicate> attributePredicates = new ArrayList<>();
            for (Map.Entry<String, String> entry : request.getAttributes().entrySet()) {
                String attributeName = entry.getKey();
                String attributeValueString = entry.getValue();
                List<String> attributeValues = Arrays.asList(attributeValueString.split(","));
                Join<Product, ProductAttribute> productAttributeJoin = root.join("productAttributes");
                Join<ProductAttribute, Attribute> attributeJoin = productAttributeJoin.join("attribute");

                Predicate attributeNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(attributeJoin.get("name")),
                        "%" + attributeName.toLowerCase() + "%");

                Predicate attributeValuePredicate = productAttributeJoin.get("value").in(attributeValues);
                attributePredicates.add(attributeValuePredicate);
                predicates.add(attributeNamePredicate);
            }
            Predicate attributeValueCombinedPredicate = criteriaBuilder.or(attributePredicates.toArray(new Predicate[0]));
            predicates.add(attributeValueCombinedPredicate);
        }


        // filter by brand names
        if (request.getBrands() != null && !request.getBrands().isEmpty()) {
            String[] brandNames = request.getBrands().split(",");
            List<String> brandList = Arrays.asList(brandNames);
            Join<Product, Brand> brandJoin = root.join("brand");
            predicates.add(brandJoin.get("name").in(brandList));
        }

        //filter by gender names
        if (request.getGenders() != null && !request.getGenders().isEmpty()) {
            String[] genderNames = request.getGenders().split(",");
            List<String> genderList = Arrays.asList(genderNames);
            Join<Product, Gender> genderJoin = root.join("gender");
            predicates.add(genderJoin.get("name").in(genderList));
        }

        if (request.getName()!= null && !request.getName().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
                    "%" + request.getName().toLowerCase() + "%"));
        }

        if (request.getCategory_name() != null && !request.getCategory_name().isEmpty()) {
            Join<Product, Category> categoryJoin = root.join("category");
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("name")),
                    "%" + request.getCategory_name().toLowerCase() + "%"));
        }
        if (request.getPrice() != null) {
            predicates.add(criteriaBuilder.equal(root.get("price"), request.getPrice()));
        } else {
            if (request.getMinPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }
            if (request.getMaxPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }
        }


        query.orderBy(criteriaBuilder.desc(root.get("price")));
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
}
}
