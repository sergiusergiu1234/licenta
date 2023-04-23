package com.StefanSergiu.Licenta.dto.favorite;

import com.StefanSergiu.Licenta.entity.Favorite;
import lombok.Data;

@Data
public class FavoriteDto {
    private Integer userId;
    private Long productId;

    private String productName;
    private Float price;
    private byte[] productImage;
    public static FavoriteDto from(Favorite favorite){
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.setProductId(favorite.getId().getProductId());
        favoriteDto.setUserId(favorite.getUser().getId());
        favoriteDto.setProductName(favorite.getProduct().getName());
        favoriteDto.setPrice(favorite.getProduct().getPrice());
        return favoriteDto;
    }
    public static FavoriteDto from(Favorite favorite, byte[]productImage){
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.setProductId(favorite.getId().getProductId());
        favoriteDto.setUserId(favorite.getUser().getId());
        favoriteDto.setProductName(favorite.getProduct().getName());
        favoriteDto.setPrice(favorite.getProduct().getPrice());
        favoriteDto.setProductImage(productImage);
        return favoriteDto;
    }
}
