package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.config.AuthRequest;
import com.StefanSergiu.Licenta.dto.UserDto;
import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.service.JwtService;
import com.StefanSergiu.Licenta.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public String addNewUser(@RequestBody UserInfo userInfo){
        return userService.addUser(userInfo);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/allUsers")
    public List<UserInfo> getAllUsers (){return userService.viewAllUsers();}

    @PostMapping("/signin")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(authRequest.getUsername());
        }else{
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/me")
    public String myInfo(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name =  authentication.getName();    //get users name
        String orders="";       //get oreders TODO
        return ("User "+ name+ " has " + orders + " orders");
    }
}

