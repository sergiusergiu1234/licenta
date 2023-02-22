package com.StefanSergiu.Licenta.Order;

import com.StefanSergiu.Licenta.User.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetails;

    @Column(name = "created_at")
    private LocalDate created_at;

    @Column(name = "price")
    private Float price;
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
