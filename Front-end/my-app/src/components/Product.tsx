import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { deleteProduct } from "../api/api";
import "../Styles/Product.css";

interface Props {
    product: ProductType
    isFavorite: boolean
}
const Product =({product, isFavorite}:Props)=>{
   const navigate = useNavigate();

    //convert image data 
    const base64String = product.image;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i=0; i< byteCharacters.length; i++){
        byteNumbers[i]=byteCharacters.charCodeAt(i);
    }
    const byteArray =new Uint8Array(byteNumbers);
    const image= new Blob([byteArray], {type:'image/jpeg'});
    const imageUrl = URL.createObjectURL(image);

    const goToProductDetails =()=>{
    
        navigate(`/ProductPage/${product.name}`)
        window.localStorage.setItem("productName",product.name)
        window.localStorage.setItem("imageUrl",base64String)
    }
   

    return(
    <Card>
           <div className="hoverable">
    <Card.Img variant="top" src={imageUrl}
                 onClick={goToProductDetails}
                 style={{ height: "40vh"}}
                />
 </div>
    <Card.Body className="card-details">
      <Card.Text>
        <label className={product.name.length > 16 ? `product-name-small` : `product-name-normal`}>{product.name} </label><br/>
        <label className="product-price">{product.price} RON </label>
      </Card.Text>
    </Card.Body>
  </Card>
    )
}

export default Product;