package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetails;

    @Column(name = "created_at")
    private LocalDate created_at;

    @Column(name = "price")
    private Float price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;

    public Order() {
    }

    public Order(Set<OrderDetail> orderDetails, LocalDate created_at, Float price, UserInfo user) {
        this.orderDetails = orderDetails;
        this.created_at = created_at;
        this.price = price;
        this.user = user;
    }

    public Set<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }
}
