package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.repository.OrderRepository;
import com.StefanSergiu.Licenta.entity.Order;
import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserInfoRepository userRepository;


    public void saveOrder(Order order, int userId) {
        UserInfo user = userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("User Id not found!"));
        order.setUser(user);
        orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }




}
