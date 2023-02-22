package com.StefanSergiu.Licenta.controller;

import com.StefanSergiu.Licenta.User.User;
import com.StefanSergiu.Licenta.User.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



@RestController
public class HomeController {
    private final UserServiceImpl userService;

    @Autowired
    public HomeController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from our api");
    }


    @GetMapping("/say-good-bye")
    public ResponseEntity<String> sayGoodBye(){
        return ResponseEntity.ok("Good bye and se yoou latr");
    }

    @GetMapping("/user")
    public ResponseEntity<String> user(){
        return ResponseEntity.ok("Hi user man");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String>   admin(){
        return ResponseEntity.ok("Hi admin boi");
    }

    @PostMapping("/register")
    public void registerNewUser(@RequestBody User user){
        userService.saveUser(user);
    }
}
