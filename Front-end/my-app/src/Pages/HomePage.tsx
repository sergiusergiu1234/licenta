import { useContext, useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";
import Product from "../components/Product";
import '../Styles/HomePage.css';
import FilterBar from "../components/FilterBar";
import Pagination from 'react-bootstrap/Pagination';




const HomePage = () => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(2);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filter,setFilter] = useState({
    name: '',
    brands:'',
    gender: '',
    category_name: '',
    minPrice:'',
    maxPrice:'',
    type_name:"",
    attributes:""
  })

  const fetchProducts = async ()=>{
    const {name, brands, gender, category_name, minPrice, maxPrice,type_name,attributes} = filter;
    let params ='';
    params += `&pageNumber=${activePage-1}`
    if(name) params += `&name=${name}`;
    if(brands) params += `&brands=${brands}`
    if(gender) params += `&gender=${gender}`;
    if(category_name) params += `&category_name=${category_name}`;
    if(minPrice) params += `&minPrice=${minPrice}`;
    if(maxPrice) params += `&maxPrice=${maxPrice}`;
    if(type_name) params += `&type_name=${type_name}`;
    if(attributes) params +=`&attributes=${attributes}`
    const token = window.localStorage.getItem('accessToken');
    const url = `http://localhost:8080/products?${params.slice(1)}`;
    console.log(params)
    let response;
    if(token != null){
      response = await fetch(url,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
    }else{
      response = await fetch(url);
    }
    const data = await response.json();
    setProducts(data.content);
    setTotalPages(data.totalPages)
    console.log(data)
  };

  useEffect(()=>{
    fetchProducts();
  },[filter,activePage]);

  const handleSearch =(productName:string,
                       brands:string[], 
                       genderName:string,
                       categoryName:string,
                       minPrice:string,
                       maxPrice:string,
                       typeName:string,
                       attributeString:string
                       ) =>{
    setFilter({ name:productName,
                brands:brands.join(","),
                gender:genderName,
                category_name:categoryName,
                minPrice:minPrice,
                maxPrice:maxPrice,
                type_name:typeName,
                attributes:attributeString
              });

  }

  const handlePageChange = (pageNumber:number) => {
    setActivePage(pageNumber);
  }

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="homepage">

      <div className="filter-container">
      <FilterBar  onSearch={handleSearch}/>
      <br/>
      <Pagination>{paginationItems}</Pagination>
      </div>
   
      <div>
            <div className="product-grid">
              {products.map((product: ProductType) => (
                <div className="product-column" key={product.id}> 
                <div>
                <Product  product={product} 
                           isFavorite={product.isFavorite} />  
                           </div>   
                </div>
                
              ))}
            </div>
     </div>
   </div>
  )
}

export default HomePage;