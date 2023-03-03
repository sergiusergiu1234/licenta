package com.StefanSergiu.Licenta.controller;



import com.StefanSergiu.Licenta.entity.Order;
import com.StefanSergiu.Licenta.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }



    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(path = "/admin/orders/all")
    public List<Order> getAllOrders(){return orderService.getAllOrders(); }


/*
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping(path="/user/orders/new")
    public String postOrder(){

    }
*/
}
