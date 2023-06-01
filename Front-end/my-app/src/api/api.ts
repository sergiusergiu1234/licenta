export const fetchTypes = async () => {
    const url = "http://localhost:8080/types/all";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchGenders = async () => {
    const url ="http://localhost:8080/genders/all";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchBrands = async () => {
    const url ="http://localhost:8080/brands/all";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchCategories = async () =>{
    const url = "http://localhost:8080/categories/all";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }


  export const handleCheckout = async (checkoutData:any) =>{
    const url ="http://localhost:8080/order/create";
    const token = localStorage.getItem("accessToken")
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    });
    const data = await response.json();
    return data
  }
  

 

export const fetchOrders =async () => {
  const url = "http://localhost:8080/order";
  const token = localStorage.getItem("accessToken")
  const response = await fetch(url,{
    method: 'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data;
}

export const deleteProduct = async (productId:number | null) => {
  const url = `http://localhost:8080/products/admin/${productId}`;
  const token = localStorage.getItem('accessToken');
  const response = await fetch(url,{
    method: 'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
}


export const addBrand = async (brandName: string) => {
const url = `http://localhost:8080/brands/admin/add`;
const token = localStorage.getItem('accessToken');
const requestBody = {
  "name": brandName
}
const response = await fetch(url,{
  method: 'POST',
  headers:{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
});
const data = await response.json();
return data;
}

export const deleteBrand = async (brandId:number)=>{
  const url =`http://localhost:8080/brands/admin/delete/${brandId}`;
  const token = localStorage.getItem('accessToken');
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}
export const editBrand = async (brandId:number, brandName:string) => {
  const url = `http://localhost:8080/brands/admin/edit/${brandId}`;
  const token = localStorage.getItem('accessToken');
  const requestBody = JSON.stringify({ name: brandName }); // Format the request body as valid JSON
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    return null;
  }
};
