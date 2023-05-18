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
  