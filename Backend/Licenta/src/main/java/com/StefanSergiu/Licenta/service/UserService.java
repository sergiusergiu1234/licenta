package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.user.UserDto;
import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.repository.UserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String addUser(UserInfo userInfo){
        Optional<UserInfo> existingUser = repository.findByUsername(userInfo.getUsername());
        if(existingUser.isEmpty()){
            userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
            userInfo.setRoles("ROLE_USER");
            repository.save(userInfo);
            return "user added to system";
        }else{
            throw new RuntimeException("username taken");
        }

    }

    public List <UserInfo> viewAllUsers() {
        return repository.findAll();
    }


    public UserInfo getLoggedInUser(String username) {
        UserInfo user = repository.findByUsername(username).orElseThrow(()->new EntityNotFoundException("User not found. Username:"+ username));
        return user;
    }
}
