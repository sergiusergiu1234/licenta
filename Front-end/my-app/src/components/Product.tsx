import { ProductType } from "../Types/ProductType.types";
import '../Styles/Product.css';
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


interface Props {
    product: ProductType
    isFavorite: boolean
}
const Product =({product, isFavorite}:Props)=>{
    const [favorited,setFavorited] = useState(isFavorite);
   const navigate = useNavigate();
    const {auth} = useAuth();

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

    
const toggleFavorite =()=>{
   //verify if authenticated
   if(auth.accessToken){
    const token = window.localStorage.getItem('accessToken')
    if(!favorited){
        //send server request
            fetch(`http://localhost:8080/favorites/add/${product.id}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data =>{  //update local storage
                             const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                            existingFavorites.push(data)
                            const updatedFavorites = JSON.stringify(existingFavorites);
                            localStorage.setItem('favorites',updatedFavorites);
                            setFavorited(true);
            })
    }else{
                    //send server request
                    fetch(`http://localhost:8080/favorites/delete/${product.id}`,{
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data =>{  //update local storage
                                const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                                    const updatedFavorites = existingFavorites.filter((product:ProductType) => product.id !== data.id)
                                    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
                                    setFavorited(false);
                    })
    }
    

   
   }else{
    alert("You must log in first!")
   }
}
    const goToProductDetails =()=>{
        navigate(`/ProductPage/${product.id}`)
        window.localStorage.setItem("imageUrl",base64String)
    }
    return(
    <div className="product-container" >
            <div className="product-image" onClick={goToProductDetails}>
                <img src={imageUrl} alt={product.name} />
            </div>
        <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price} RON </div>
            <div className="product-buttons">

                <IconContext.Provider value={{size: '30px'}}>
                    <div className={`${favorited ? 'favorited' : 'not-favorited'}`} onClick={toggleFavorite}>{favorited ? <AiFillHeart />  : <AiOutlineHeart />  }</div> 
                </IconContext.Provider>
            </div>
            

        </div>
    </div>)
}

export default Product;