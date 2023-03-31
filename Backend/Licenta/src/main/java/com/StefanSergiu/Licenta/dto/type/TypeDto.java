package com.StefanSergiu.Licenta.dto.type;

import com.StefanSergiu.Licenta.dto.category.PlainCategoryDto;
import com.StefanSergiu.Licenta.entity.Type;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class TypeDto {
    private Long id;
    private String name;
    private List<PlainCategoryDto> categoryDtoList = new ArrayList<>();

    //TODO: attribute link

    public static TypeDto from(Type type){
        TypeDto typeDto = new TypeDto();
        typeDto.setId(type.getId());
        typeDto.setName(type.getName());
        typeDto.setCategoryDtoList(type.getCategories().stream().map(PlainCategoryDto::from).collect(Collectors.toList()));
        return typeDto;
    }
}
