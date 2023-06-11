import { IconContext } from "react-icons";
import {HiOutlineMinusCircle, HiOutlinePlusCircle} from "react-icons/hi"
import { CartItemType } from "../Types/CartItemType.types";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

import { useEffect, useState } from "react";
import '../Styles/CartItem.css'
import { json } from "stream/consumers";
interface Props {
   item:CartItemType;
   addToCart: (item: CartItemType) => void;
   removeFromCart: (item: CartItemType) => void;
}

const CartItem =({item,addToCart,removeFromCart}:Props)=>{
  const token = window.localStorage.getItem("accessToken");
  const [cartItem, setCartItem] = useState<CartItemType>({
    productId: item.productId,
    productImage: item.productImage,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    product:{
        id: item.product.id,
        name:item.productName,
        price:item.price,
        brand: {id:item.product.brand.id,
                name:item.product.brand.name},
        gender:{id:item.product.gender.id,
                name:item.product.gender.name},
        category:{id:item.product.category.id,
                name:item.product.category.name},
        image:item.productImage,
        description:item.product.description,
        isFavorite:item.product.isFavorite,
        attributes:item.product.attributes
    }
  });

  useEffect(() => {
    setCartItem({
      productId: item.productId,
      productImage: item.productImage,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product.id,
        name: item.productName,
        price: item.price,
        brand: {
          id: item.product.brand.id,
          name: item.product.brand.name
        },
        gender: {
          id: item.product.gender.id,
          name: item.product.gender.name
        },
        category: {
          id: item.product.category.id,
          name: item.product.category.name
        },
        image: item.productImage,
        description: item.product.description,
        isFavorite: item.product.isFavorite,
        attributes: item.product.attributes
      }
    });
  }, [item]);

  return (
    <Card className="cartItem">
      <CardHeader as="h5">{cartItem.productName}</CardHeader>
      <Card.Body >
            <div className="cart-attributes">
              
              <label  className="attribute_name">{item.product.brand.name} - {item.product.category.name}</label>
                <hr/>
                <div className="attr">
                {item.product.attributes.map((attribute)=>(
                  <div>
                    <label className="attribute_name">{attribute.attribute_name}:</label>
                    <label className="value">{attribute.value}</label>
                    <br/>
                  </div>
                ))}
                </div>
            </div>
      <div>
        <IconContext.Provider value={{ size: "30px" }}>
            <div  >
                <label className="attribute_name">Quantity: {cartItem.quantity}</label>
                <br/>
                <label className="attribute_name">Price: {cartItem.price}</label>
          </div>
          <div className="shoppingCart-buttons">
          <button className="addToCart" onClick={()=> addToCart(item)}>
            <HiOutlinePlusCircle />
          </button>
          <button className="removeFromCart" onClick={()=> removeFromCart(item)}>
            <HiOutlineMinusCircle />
          </button>
          </div>
        </IconContext.Provider>
    </div>


      </Card.Body>
    </Card>
  );
}

export default CartItem;