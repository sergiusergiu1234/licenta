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
   setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItem =({item,addToCart,removeFromCart, setIsValid}:Props)=>{


  const [cartItem, setCartItem] = useState<CartItemType>({
    productId: item.productId,
    productImage: item.productImage,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    product:{
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
        name: item.product.category.name,
        typeName: item.product.category.typeName
      },
      image: item.productImage,
      description: item.product.description,
      isFavorite: item.product.isFavorite,
      attributes: item.product.attributes,
      stock: item.product.stock
    },stock:item.stock
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
          name: item.product.category.name,
          typeName: item.product.category.typeName
        },
        image: item.productImage,
        description: item.product.description,
        isFavorite: item.product.isFavorite,
        attributes: item.product.attributes,
        stock: item.product.stock
      },stock:item.stock
    });
  }, [item]);

  useEffect(() => {
    setIsValid(item.quantity <= item.product.stock); // Update the isValid state within the CartItem component
  }, [item.quantity]);


  return (
    <Card className="cartItem">
      <CardHeader as="h5">{cartItem.productName}</CardHeader>
      <Card.Body >
            <div className="cart-attributes">
              
              <label  className="attribute_name">{item.product.brand.name} - {item.product.category.name} - {item.product.category.typeName}</label>
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
                <label>({cartItem.product.stock} in stock)</label>
                <br/>
                <label className="attribute_name">Price: {cartItem.price}</label>
          </div>
          <div className="shoppingCart-buttons">
          <button className="addToCart" onClick={()=> cartItem.quantity !== cartItem.product.stock ? 
              addToCart(item) : alert(`Only ${cartItem.product.stock} left in stock!`)}>
            <HiOutlinePlusCircle />
          </button>
          <button className="removeFromCart" onClick={()=>
             removeFromCart(item) }>
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