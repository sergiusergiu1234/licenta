import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {ProductType} from "../Types/ProductType.types"
import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import '../Styles/ProductPage.css';
import { error } from "console";
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
        description:""
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

     }



    return (<div><br></br>

<hr/>
    <div className="product">
        <div className="product-image" >
                <img src={imageUrl} alt={product.name} />
        </div>

        <div className="product-details-container">
            <div>
                <label className="bold">Name:  </label><label>{product.name}</label><br/>
                
                <label className="bold">Brand:  </label><label>{product.brand.name}</label><br/>
                <label className="bold">Category:  </label><label>{product.category.name}</label><br/>
                <label className="bold">Gender:  </label><label>{product.gender.name}</label><br/>
                <hr/>
                <label className="bold">Description: </label>{product.description}<label></label><br/>
                <hr/>
                <label className="bold">Price:  </label><label>{product.price} RON</label><br/>
                
            </div>
        </div>
        <div className="product-buttons">

                    <table>
                    <IconContext.Provider value={{size: '60px'}}>
                        <tr>
                            <div className="favorite-button2" onClick={addToFavorite}>
                                <td> <AiOutlineHeart /></td>
                                <td><label className="bold">Adauga la favorite</label></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="cart-button" onClick={addToCart}>
                                <td> <AiFillPlusCircle /></td>
                                <td><label className="bold">Adauga in cos</label></td>
                            </div>
                        </tr>
                        </IconContext.Provider>
                    </table>    
                <hr/> 
            </div>
           
         </div>
    </div>)
}

export default ProductPage;