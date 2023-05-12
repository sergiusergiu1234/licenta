import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";


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
            .then(data =>{setFavorited(true);
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
                    .then(data =>{
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


        const addToCart =()=>{
            const token = window.localStorage.getItem('accessToken')
            fetch(`http://localhost:8080/shoppingCart/add/${product.id}`,{
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(response => response.json())
        }
    
    return(

    <Card style={{ width: '300px' }}>
           <div className="hoverable">
    <Card.Img variant="top" src={"/snwb1.jpg"}
                 onClick={goToProductDetails}
                />
 </div>
    <Card.Body >
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>
        Brand: {product.brand.name}
        <br/>
        Price: {product.price} RON
      </Card.Text>
                 <IconContext.Provider value={{size: '50px'}}>
                 <div className={`${favorited ? 'favorited' : 'not-favorited'}`}
                              onClick={toggleFavorite}>
                                 {favorited ? <AiFillHeart />  : <AiOutlineHeart />  }
                                 </div> 
                                 <div>       
                <button className="addToCart2" onClick={addToCart}>
                    <MdAddShoppingCart />
                    Add to cart
                </button>
                </div>
                </IconContext.Provider>

    </Card.Body>
  </Card>
    )
}

export default Product;