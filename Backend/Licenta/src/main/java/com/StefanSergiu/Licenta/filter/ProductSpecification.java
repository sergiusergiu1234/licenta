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
        //check if attribute and values are not null
        if (request.getAttributes() != null && !request.getAttributes().isEmpty()) {

            //new empty list of predicates
            List<Predicate> attributePredicates = new ArrayList<>();

            //map through the map
            for (Map.Entry<String, String> entry : request.getAttributes().entrySet()) {
                //for each entry ...

                //...save key
                String attributeName = entry.getKey();
                //...save value
                String attributeValueString = entry.getValue();
                //generate list from the value "red,green,blue" becomes [red, green, blue]
                List<String> attributeValues = Arrays.asList(attributeValueString.split(","));

                //join Product with Product Attribute
               //...JOIN product_attribute ON product.id = product_attribute.productId
                Join<Product, ProductAttribute> productAttributeJoin = root.join("productAttributes");

                // link another join to the previous one ^
                 //...JOIN attribute ON product_attribute.attribute_id = attribute.id
                Join<ProductAttribute, Attribute> attributeJoin = productAttributeJoin.join("attribute");

                //[1] ... attribute.name LIKE '%<attributeName>%'
                Predicate attributeNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(attributeJoin.get("name")),
                        "%" + attributeName.toLowerCase() + "%");

                //...[2] product_attribute.value IN (<attributeValues>)
                Predicate attributeValuePredicate = productAttributeJoin.get("value").in(attributeValues);
                //^2^ - AND ...
                attributePredicates.add(attributeValuePredicate);
                //^1^- WHERE ...
                predicates.add(attributeNamePredicate);
            }
            // after generating everything, combine all using OR
            Predicate attributeValueCombinedPredicate = criteriaBuilder.or(attributePredicates.toArray(new Predicate[0]));
            //wrap all in () and add AND
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

////this whole predicate creates this querry example
//SELECT *
//        FROM product
//        JOIN category ON product.category_id = category.id
//        JOIN brand ON product.brand_id = brand.id
//        JOIN gender ON product.gender_id = gender.id
//        JOIN product_attribute ON product.id = product_attribute.product_id
//        JOIN attribute ON product_attribute.attribute_id = attribute.id
//        WHERE
//        LOWER(type.name) LIKE '%<type_name>%'
//        AND (
//        (LOWER(attribute.name) LIKE '%<attribute_name_1>%' AND product_attribute.value IN ('red', 'green', 'blue'))
//        OR
//        (LOWER(attribute.name) LIKE '%<attribute_name_2>%' AND product_attribute.value IN ('X', 'L', 'M'))
//        -- Add more conditions for additional attribute names and values
//        )
//        AND brand.name IN ('<brand_1>', '<brand_2>', '<brand_3>')
//        AND gender.name IN ('<gender_1>', '<gender_2>', '<gender_3>')
//        AND LOWER(product.name) LIKE '%<product_name>%'
//        AND LOWER(category.name) LIKE '%<category_name>%'
//        AND (
//        product.price = <exact_price>
//        OR product.price >= <min_price>
//        AND product.price <= <max_price>
//    )
//            ORDER BY product.price DESC
