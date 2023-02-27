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

    public void setUser(UserInfo user) {
    }
}
