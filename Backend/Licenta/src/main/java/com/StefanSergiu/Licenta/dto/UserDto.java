package com.StefanSergiu.Licenta.dto;

import com.StefanSergiu.Licenta.entity.UserInfo;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int id;
    private String name;
    private String email;
    private String password;

    public UserDto(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
