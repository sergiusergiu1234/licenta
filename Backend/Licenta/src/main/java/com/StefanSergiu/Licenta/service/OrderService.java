package com.StefanSergiu.Licenta.service;

import com.StefanSergiu.Licenta.dto.order.CreateNewOrderModel;
import com.StefanSergiu.Licenta.dto.order.UpdateOrderModel;
import com.StefanSergiu.Licenta.entity.OrderDetail;
import com.StefanSergiu.Licenta.entity.Orders;
import com.StefanSergiu.Licenta.entity.ShoppingCart;
import com.StefanSergiu.Licenta.entity.UserInfo;
import com.StefanSergiu.Licenta.repository.OrderDetailRepository;
import com.StefanSergiu.Licenta.repository.OrderRepository;
import com.StefanSergiu.Licenta.repository.ShoppingCartRepository;
import com.StefanSergiu.Licenta.repository.UserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public Orders getOrder(Long id){
        return orderRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Order with id "+id + " not found!"));
    }

    @Transactional
    public Orders createOrder(CreateNewOrderModel createNewOrderModel,Integer userId){
        //get user info
        UserInfo user = userInfoRepository.findById(userId)
                .orElseThrow(()-> new EntityNotFoundException("User with id "+userId+" not found"));


        //generate new order object
        Orders newOrder = new Orders();
        newOrder.setUser(user);
        newOrder.setGenerationDateTime(LocalDateTime.now());
        newOrder.setStatus("pending");
        newOrder.setTotal((float) 0);
        Float total = newOrder.getTotal();

        //TODO: get  all order details and add their costs and save it to price field
        //get empty orderDetails list
        List<OrderDetail> orderDetails = (List<OrderDetail>) orderDetailRepository.findByOrderId(newOrder.getId());
        //get user's shopping carts
        List<ShoppingCart> shoppingCarts = (List<ShoppingCart>) shoppingCartRepository.findByUserId(userId);
        for(ShoppingCart shoppingCart : shoppingCarts){
            //generate empty orderDetail and populate it based on shopping cart info
            OrderDetail newOrderDetail = new OrderDetail();
            newOrderDetail.setProduct(shoppingCart.getProduct());
            newOrderDetail.setQuantity(shoppingCart.getQuantity());
            newOrderDetail.setPrice(shoppingCart.getPrice());
            newOrder.setTotal(newOrder.getTotal()+ newOrderDetail.getPrice());
            //set Order
            newOrderDetail.setOrder(newOrder);
            orderDetailRepository.save(newOrderDetail);
            //add it to Order's orderDetails list
            orderDetails.add(newOrderDetail);
        }

        return orderRepository.save(newOrder);
    }

    public List<Orders> getOrdersByUser(Integer userId){
        return StreamSupport.stream(orderRepository.findByUserId(userId).spliterator(),false)
                .collect(Collectors.toList());
    }

    @Transactional
    public Orders updateOrderStatus(UpdateOrderModel updateOrderModel){
        Orders order= orderRepository.findById(updateOrderModel.getOrderId())
                .orElseThrow(()->new EntityNotFoundException("Order with id" + updateOrderModel.getOrderId()+ " doesn;t exist|!"));
        order.setStatus(updateOrderModel.getNewStatus());
        return order;
    }
}