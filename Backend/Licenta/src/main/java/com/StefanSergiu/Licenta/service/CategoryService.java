package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.category.CreateNewCategoryModel;
import com.StefanSergiu.Licenta.entity.*;
import com.StefanSergiu.Licenta.repository.CategoryRepository;
import com.StefanSergiu.Licenta.repository.TypeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    TypeRepository typeRepository;
    public Category addCategory(CreateNewCategoryModel createNewCategoryModel){
        Category category = new Category();

        Type type = typeRepository.findByName(createNewCategoryModel.getType_name());
        if(type == null){
            throw new EntityNotFoundException("Type "+ createNewCategoryModel.getType_name()+ " not found.");
        }
        category.setType(type);
        category.setName(createNewCategoryModel.getName());
        type.addCategory(category);
        return categoryRepository.save(category);}



    public List<Category> getCategories(){
        return StreamSupport
                .stream(categoryRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public Category getCategory(Long id){
        return categoryRepository.findById(id).orElseThrow(()->new EntityNotFoundException());
    }

    @Transactional
    public Category deleteCategory(Long id){
        Category category = getCategory(id);

        categoryRepository.delete(category);
        return category;
    }
}
