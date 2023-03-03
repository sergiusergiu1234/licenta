package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.repository.UserInfoRepository;
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
        Optional<UserInfo> existingUser = repository.findByEmail(userInfo.getEmail());
        if(existingUser.isEmpty()){
            userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
            userInfo.setRoles("ROLE_USER");
            repository.save(userInfo);
            return "user added to system";
        }else{
            throw new RuntimeException("User email taken");
        }

    }

    public List <UserInfo> viewAllUsers() {
        return repository.findAll();
    }
}
