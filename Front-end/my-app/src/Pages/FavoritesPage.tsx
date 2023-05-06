import { useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";

import { FavoriteType } from "../Types/FavoriteType.types";
import Favorite from "../components/Favorite";

const FavoritesPage =()=>{
    const [favoriteList,setFavorites] = useState([]);
    useEffect(()=>{
        const token = window.localStorage.getItem('accessToken');
        fetch('http://localhost:8080/favorites',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => { setFavorites(data);
                        console.log(data)}
           )
        .catch(error => console.log(error));
    },[]);

    
    return (<div>
        <h1>Favorite products</h1>
        <div className="favorites">
        {favoriteList.map((favorite:FavoriteType)=>(
            <Favorite key={favorite.productId} favorite={favorite} />
        ))}
        </div>
        
    </div>)
}
export default FavoritesPage;