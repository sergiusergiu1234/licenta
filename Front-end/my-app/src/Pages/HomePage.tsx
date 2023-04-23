import { useContext, useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";
import Product from "../components/Product";
import '../Styles/HomePage.css';
import FilterBar from "../components/FilterBar";
import useSWR from 'swr';
import qs from 'qs';
import useAuth from "../hooks/useAuth";



const HomePage = () => {
  const [searchParams, setSearchParams] = useState({ name: '', brand_name: '' }); //parametrii de filtrare
  const [filteredProducts, setFilteredProducts] = useState([]);   //produse filtrate
  
  //onCLick search for product
  const handleSearch = (productName:string, brandName:string) => {  

    const newSearchParams ={ ...searchParams, name: productName, brand_name: brandName}  
      setSearchParams(newSearchParams);

      let filteredProducts = products.filter((product:ProductType) =>{
        if(productName && !product.name.toLowerCase().includes(productName.toLowerCase())) {
          return false;
        }
        if (brandName && !product.brand.name.toLowerCase().includes(brandName.toLowerCase())) {
          return false;
        }
        return true;
      });
      setFilteredProducts(filteredProducts);
  };

  const queryParams = qs.stringify(searchParams);
  const url = `http://localhost:8080/products?${queryParams}`;

  async function fetchProducts(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const { data: products, error } = useSWR(url, fetchProducts, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  if (error) return <div>Error loading products</div>;
  if (!products) return <div>Loading products...</div>;

  const productsList = filteredProducts.length ? filteredProducts : products;

  const favorites= JSON.parse(localStorage.getItem('favorites') || '[]');
  const handleFav =( id:number)=>{

    return favorites.some((favorite: {productId: number}) => favorite.productId === id);
  }
  
  return (
    <div className="homepage">
      <div className="filter-container">
         <FilterBar onSearch={handleSearch} />
      </div>
      <div className="product-list">
          {productsList.length ? (
            <div>
              {productsList.map((product: ProductType) => (
                <div className="product" key={product.id}> 
                <Product  product={product} 
                           isFavorite={handleFav(product.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-result">There are no products with the specified criteria.</div>
          )}
      </div>
    </div>
  );
};
export default HomePage;


