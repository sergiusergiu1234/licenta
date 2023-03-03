package com.StefanSergiu.Licenta.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "product", targetEntity = OrderDetail.class,cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private Set<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private Set<ShoppingCart>shoppingCart;

    @OneToMany(mappedBy = "product")
    private Set<Favorites> favorites;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

//    @OneToMany(mappedBy = "product", targetEntity = Favorites.class, cascade = CascadeType.ALL,fetch = FetchType.EAGER)
//    private Set<Favorites> favorites;

    public Product() {
    }


    public Long getId() {
        return id;
    }

    public Product(String name, Set<OrderDetail> orderDetails){
        this.name = name;
        this.orderDetails = orderDetails;
     //   this.favorites = favorites;
    }

//    public Set<Favorites> getFavorites() {
//        return favorites;
//    }
//
//    public void setFavorites(Set<Favorites> favorites) {
//        this.favorites = favorites;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
