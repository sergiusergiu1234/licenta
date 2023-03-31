package com.StefanSergiu.Licenta.dto.category;

import com.StefanSergiu.Licenta.entity.Category;
import lombok.Data;

@Data
public class PlainCategoryDto {
    private String name;

    public static PlainCategoryDto from(Category category){
        PlainCategoryDto plainCategoryDto = new PlainCategoryDto();
        plainCategoryDto.setName(category.getName());
        return plainCategoryDto;
    }
}
