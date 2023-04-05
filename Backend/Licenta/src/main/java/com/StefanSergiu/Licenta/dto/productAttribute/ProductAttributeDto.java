package com.StefanSergiu.Licenta.dto.productAttribute;

import com.StefanSergiu.Licenta.entity.ProductAttribute;
import lombok.Data;

@Data
public class ProductAttributeDto {
    private Long productId;
    private Long attributeId;
    private String value;
    public static ProductAttributeDto from(ProductAttribute productAttribute){
        ProductAttributeDto productAttributeDto = new ProductAttributeDto();

        productAttributeDto.setProductId(productAttribute.getProduct().getId());
        productAttributeDto.setAttributeId(productAttribute.getAttribute().getId());
        productAttributeDto.setValue(productAttribute.getValue());

        return productAttributeDto;
    }
}
