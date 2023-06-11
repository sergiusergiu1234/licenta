import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {ProductType} from "../Types/ProductType.types"
import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import '../Styles/ProductPage.css';
import { error } from "console";
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
const ProductPage =()=>{
   
    const {id} = useParams();
    const [product,setProduct]= useState<ProductType>({
        id: 0,
        name:"",
        price:0,
        brand: {id:0,
                name:""},
        gender:{id:0,
                name:""},
        category:{id:0,
                name:""},
        image:"",
        description:"",
        isFavorite:false,
        attributes:[{attribute_name:"",
                    value:""}]
    });
    //convert image data 
    const base64String = window.localStorage.getItem("imageUrl");
    const byteCharacters = atob(base64String!);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i=0; i< byteCharacters.length; i++){
        byteNumbers[i]=byteCharacters.charCodeAt(i);
    }
    const byteArray =new Uint8Array(byteNumbers);
    const image= new Blob([byteArray], {type:'image/jpeg'});
    const imageUrl = URL.createObjectURL(image);
    useEffect(()=>{
        fetchProduct();
      },[id])

    const fetchProduct =()=>{
        axios.get(`/products/${id}`).then(
            (response)=>{
                setProduct(response.data);
                console.log(response.data)
            }
        );
     }   

     const addToFavorite =()=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/favorites/add/${id}`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
        
     }

     const addToCart=()=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/shoppingCart/add/${id}`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data =>console.log(data))
     }



    return (
        <Card>
            <CardHeader>
                <h1></h1>
            </CardHeader>
            <Card.Body className="product-page-container">
                <div className="image-container">
                <Card.Img variant="top" src="/snwb1.jpg"/>
                </div>
                <div>
                <p className="bold">
                    {product.gender.name}'s {product.brand.name} {product.category.name.toUpperCase()}<br/>
                    <label className="head-big">{product.name}</label><br/>
                    <label className="head-big">{product.price} RON</label>
                </p>
                <div className="aesthetic-bar"></div>
                    <p className="description-container">{product.description}</p>
                    <div className="aesthetic-bar"></div>
                    <hr/>
                    <label className="bold">Product specs:</label>
                    <br/>
                    {product.attributes.map((product)=>(<><label className="bold">{product.attribute_name}</label>
                                                        <label className="head-big">{`: ${product.value}`}</label><br/></>))}
                
            </div>
            </Card.Body>
        <div className="product-buttons">
                    <IconContext.Provider value={{size: '50px'}}>
                            <Button className="favorite-button2" onClick={addToFavorite}>
                                <AiOutlineHeart />
                                Add to favorites
                            </Button>

                            <Button className="cart-button" onClick={addToCart}>
                                <AiFillPlusCircle />    
                                Add to cart
                            </Button>
                        </IconContext.Provider>
                   
            </div>
            </Card>)
}

export default ProductPage;