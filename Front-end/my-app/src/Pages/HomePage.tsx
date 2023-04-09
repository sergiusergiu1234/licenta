import { useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";
import Product from "../components/Product";
import '../Styles/HomePage.css';


const HomePage =()=>{

    const [productsList,setProducts]=useState([]);

    //GetRequest
    useEffect(() => {
        const filters ={};
        fetch('http://localhost:8080/products')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error(error));
      }, []);
      
    return(<div className="homepage">
        <h1>Home page</h1>
        <div>
          {productsList.map((product:ProductType)=>(
            <Product key={product.id} product={product} />
          ))}</div>

    </div>)}

export  default HomePage;


