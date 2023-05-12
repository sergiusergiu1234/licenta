import { IconContext } from "react-icons";
import { FavoriteType } from "../Types/FavoriteType.types";
import { ProductType } from "../Types/ProductType.types";
import {MdAddShoppingCart} from 'react-icons/md'
import { AiFillDelete, AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import '../Styles/Favorite.css';
import { useNavigate } from "react-router";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect } from "react";
interface Props{
    favorite:FavoriteType
}
const Favorite =({favorite}:Props)=>{
    const navigate = useNavigate(); 

    //convert image data
    const base64String = favorite.productImage;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i=0; i< byteCharacters.length; i++){
        byteNumbers[i]=byteCharacters.charCodeAt(i);
    }
    const byteArray =new Uint8Array(byteNumbers);
    const image= new Blob([byteArray], {type:'image/jpeg'});
    const imageUrl = URL.createObjectURL(image);

    const goToProductDetails =()=>{
        navigate(`/ProductPage/${favorite.productId}`)
        window.localStorage.setItem("imageUrl",base64String)
    }

    const addToCart =()=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/shoppingCart/add/${favorite.productId}`,{
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
    }
    const deleteFavorite =()=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/favorites/delete/${favorite.productId}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
        window.location.reload()
    }

    return (
    <div className="favorite-item">
        <div className="favorite-image" onClick={goToProductDetails}>
            <img src={imageUrl} alt={favorite.productName} />
        </div>
        <div className="product-details">
            <h6>{favorite.productName}</h6>
            <p>{favorite.price} RON</p>
        </div>
        <div className="favorite-buttons">
            <IconContext.Provider value={{size: '30px'}}>
                <button className="addToCart" onClick={addToCart}>
                    <MdAddShoppingCart />
                    Add to cart
                </button>
                </IconContext.Provider>
                <button className="delete-favorite" onClick={deleteFavorite}>
                  
                        <IoTrashOutline/>
                        <label> Sterge</label>
                </button>
        </div>
    </div>)
}

export default Favorite;