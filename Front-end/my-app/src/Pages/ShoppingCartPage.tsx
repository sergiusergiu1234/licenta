import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";

import { CartItemType } from "../Types/CartItemType.types";
import SumarComanda from "../components/SumarComanda";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../Styles/CartPage.css"
import OrderContext from "../context/OrderDetailsProvider";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { VscDebugStart } from "react-icons/vsc";
const ShoppingCartPage =()=>{
    const [cartItems,setCartItems]=useState<CartItemType[]>([]);
    const token = window.localStorage.getItem('accessToken');
    const [totalPrice,setTotalPrice]= useState(0);
    const {order, setOrder} = useContext(OrderContext);
    const [isValid, setIsValid] = useState(true);

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

    const navigate = useNavigate();
    const goToCheckout =()=>{
        //update order context
        const updatedOrder = {...order,items:cartItems,total:totalPrice};

        setOrder(updatedOrder);
        console.log(order)
        navigate("/OrderDetails");
    }
    useEffect(() => {
        const allItemsValid = cartItems.every((cartItem) => cartItem.quantity <= cartItem.product.stock);
        setIsValid(allItemsValid);
      }, [cartItems]);
    return(<div className="cartPage">
            <h1>Shopping cart</h1>
         <div className="cartContent">
            <div className="cartList">
            {cartItems.map((cart:CartItemType)=>(
                <CartItem key={cart.productId} item={cart} addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                setIsValid={setIsValid}
                isValid={isValid}/>
            ))}
            </div>
            <div className="sumar-comanda">
                <SumarComanda total={totalPrice}/>
                <IconContext.Provider value={{ size: "30px" }}>
            <button className={isValid ? "continue-button" : "invalid-continue" } 
                    onClick={goToCheckout}
                    disabled={!isValid}>
            <VscDebugStart />
            Continue
            </button>
        </IconContext.Provider>
            </div>
            </div>
        </div>)
}
export default ShoppingCartPage;