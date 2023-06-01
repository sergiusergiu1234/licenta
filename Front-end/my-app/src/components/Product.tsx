import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { deleteProduct } from "../api/api";


interface Props {
    product: ProductType
    isFavorite: boolean
}
const Product =({product, isFavorite}:Props)=>{
    const [favorited,setFavorited] = useState(isFavorite);
   const navigate = useNavigate();
    const {auth} = useAuth();
    const [isAdmin,setIsAdmin] = useState(false);


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

    useEffect(()=>{
        setIsAdmin(auth.roles.includes('ROLE_ADMIN'))
    },[]);

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
    

    const handleProductDelete =()=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/shoppingCart/delete/${product.id}`,{
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
    }

    return(

    <Card className="card" 
    style={{ width: '300px' }}>
           <div className="hoverable">
    <Card.Img variant="top" src={"/snwb1.jpg"}
                 onClick={goToProductDetails}
                />
 </div>
    <Card.Body className="card-details">
      <Card.Text className="product-details">
        <label className="product-name">{product.name} </label><br/>
        <label className="product-price">{product.price} RON </label>
      </Card.Text>
      <div className="product-buttons">
                 <IconContext.Provider value={{size: '50px'}}>
                 <div className={`${favorited ? 'favorited' : 'not-favorited'}`}
                              onClick={toggleFavorite}>
                                 {favorited ? <AiFillHeart />  : <AiOutlineHeart />  }
                                 </div> 
                    <div className={isAdmin ? "admin-product-delete" : 'user-product-delete'} onClick={()=>deleteProduct(product.id)}><AiOutlineCloseCircle/></div>
                 </IconContext.Provider>
                 <IconContext.Provider value={{size: '50px'}}>
                    <Button className="addToCart-h" onClick={addToCart}><MdAddShoppingCart/></Button>
                 </IconContext.Provider>
      </div>
    </Card.Body>
  </Card>
    )
}

export default Product;