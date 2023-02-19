package com.StefanSergiu.Licenta.Order;

import javax.persistence.*;

@Entity
@Table(name="order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_detail_id;


    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private int quantity;

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
