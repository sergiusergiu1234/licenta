package com.StefanSergiu.Licenta.dto.orderDetail;

import com.StefanSergiu.Licenta.entity.OrderDetail;
import lombok.Data;

@Data
public class OrderDetailDto {
    private String productName;
    private Long quantity;
    private Float price;
    public static OrderDetailDto from(OrderDetail orderDetail){
        OrderDetailDto orderDetailDto = new OrderDetailDto();
        orderDetailDto.setProductName(orderDetail.getProduct().getName());
        orderDetailDto.setPrice(orderDetail.getPrice());
        orderDetailDto.setQuantity(orderDetail.getQuantity());
        return orderDetailDto;
    }
}
