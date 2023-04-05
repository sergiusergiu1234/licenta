package com.StefanSergiu.Licenta.dto.attribute;

import com.StefanSergiu.Licenta.entity.Attribute;
import lombok.Data;

@Data
public class PlainAttributeDto {
    private String name;
    public static PlainAttributeDto from(Attribute attribute){
        PlainAttributeDto plainAttributeDto = new PlainAttributeDto();
        plainAttributeDto.setName(attribute.getName());
        return plainAttributeDto;
    }
}
