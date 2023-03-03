package com.StefanSergiu.Licenta.entity;


import jakarta.persistence.*;

import java.util.Set;

@Entity
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    private String name;
    private String email;
    private String password;
    private String roles;    //probabil trebuie sa am role si in constructor

    @OneToMany(mappedBy = "user")
    private Set<Order> IssuedOrders;

    @OneToMany(mappedBy = "user")
    private Set<Favorites> favoriteItem;

    @OneToMany(mappedBy = "user")
    private Set<ShoppingCart> shoppingCarts;

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public UserInfo() {     //no args constructor
    }
    public UserInfo(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    public UserInfo(int id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}