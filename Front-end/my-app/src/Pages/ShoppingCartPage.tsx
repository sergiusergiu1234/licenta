import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

import { CartItemType } from "../Types/CartItemType.types";
import SumarComanda from "../components/SumarComanda";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../Styles/CartPage.css"
const ShoppingCartPage =()=>{
    const [cartItems,setCartItems]=useState<CartItemType[]>([]);
    const token = window.localStorage.getItem('accessToken');
    const [totalPrice,setTotalPrice]= useState(0);

    useEffect(()=>{
        
        fetch('http://localhost:8080/shoppingCart',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => { setCartItems(data);
                        })
    },[]);

    useEffect(()=>{
        let price =0;
        cartItems.forEach((cart)=>{
            price += cart.price;
        })
        setTotalPrice(price);
        console.log(price)
    },[cartItems]);

    const handleAddToCart =(item: CartItemType) =>{
        fetch(`http://localhost:8080/shoppingCart/add/${item.productId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCartItems((prev) => prev.map((cart) => {
                    if (cart.productId === data.productId) {
                        return data;
                    }
                    return cart;
                }));
            });
    }

    
    const handleRemoveFromCart = (item: CartItemType) => {
        fetch(`http://localhost:8080/shoppingCart/delete/${item.productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if ((item.quantity-1) === 0) {
                    setCartItems((prev) => prev.filter((cart) => cart.productId !== item.productId));
                } else {
                    setCartItems((prev) => prev.map((cart) => {
                        if (cart.productId === data.productId) {
                            return data;
                        }
                        return cart;
                    }));
                }
            });
    };

    return(<Card>
        <CardHeader>
         <h1>Shopping cart</h1>
         </CardHeader>
         <div className="cartPage">
            <div className="cartList">
            {cartItems.map((cart:CartItemType)=>(
                <CartItem key={cart.productId} item={cart} addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}/>
            ))}
            </div>
            <div className="sumar-comanda">
                <SumarComanda total={totalPrice}/>
            </div>
            </div>
        </Card>)
}
export default ShoppingCartPage;