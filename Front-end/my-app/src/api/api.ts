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
    
    return response;
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

export const fetchAllOrders = async ()=>{
  const url = "http://localhost:8080/order/admin/all";
  const token = localStorage.getItem("accessToken");
  const response = await fetch(url,{
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
}

export const updateOrderStatus = async(orderId:number | null , newStatus:string) =>{
  const url = "http://localhost:8080/order/update";
  const token = localStorage.getItem("accessToken");
  const requestBody = {
    "orderId": orderId,
    "newStatus": newStatus
  }
  const response = await fetch (url,{
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
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
  return response;
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
export const editBrand = async (brandId:number | null, brandName:string) => {
  const url = `http://localhost:8080/brands/admin/edit/${brandId}`;
  const token = localStorage.getItem('accessToken');
  const requestBody = JSON.stringify({ name: brandName }); 
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
    console.error(error);
    return null;
  }
};


export const addCategory = async (categoryName: string,typeId:number | null ) => {
  const url = `http://localhost:8080/categories/admin/add`;
  const token = localStorage.getItem('accessToken');
  const requestBody = {
    "name": categoryName,
    "typeId": typeId
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

export const deleteCategory = async (categoryId:number)=>{
  const url =`http://localhost:8080/categories/admin/delete/${categoryId}`;
  const token = localStorage.getItem('accessToken');
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export const editCategory = async (categoryId:number | null , categoryName:string)=>{
const url = `http://localhost:8080/categories/admin/edit/${categoryId}`;
const token = localStorage.getItem('accessToken');
const requestBody = JSON.stringify({ name: categoryName }); 
const response = await fetch (url,{
  method:'PUT',
  headers:{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: requestBody
});
const data = await response.json();
return data;
}

export const deleteType = async (typeId:number)=>{
  const url = `http://localhost:8080/types/admin/delete/${typeId}`;
  const token = localStorage.getItem('accessToken');
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export const addType = async (typeName: string) => {
  const url = `http://localhost:8080/types/admin/add`;
  const token = localStorage.getItem('accessToken');
  const requestBody = {
    "name": typeName
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

export const editType = async (typeName:string,typeId:number | null) =>{
  const url =`http://localhost:8080/types/admin/edit/${typeId}`;
  const token = localStorage.getItem('accessToken');
    const requestBody = JSON.stringify({ name: typeName }); 
    const response = await fetch (url,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
    }

  export const addSize = async (sizeValue:string, typeId:number | null) =>{
    const url=`http://localhost:8080/size/admin/add`;
    const token = localStorage.getItem('accessToken');
    const requestBody = {
      "value": sizeValue,
      "typeId": typeId
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

  export const addAttribute = async (attributeName:string , typeId:number | null)=>{
    const url = `http://localhost:8080/attributes/admin/add`;
    const token = localStorage.getItem('accessToken');
    const requestBody = {
      "name": attributeName,
      "typeId": typeId
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

    export const editAttribute = async (attributeName: string, attributeId: number | null) =>{
      const url = `http://localhost:8080/attributes/admin/edit/${attributeId}`;
    const token = localStorage.getItem('accessToken');
    const requestBody = JSON.stringify({ name: attributeName }); 
    const response = await fetch (url,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
    }

    export const deleteAttribute = async (attributeId: number | null) => {
   const url = `http://localhost:8080/attributes/admin/delete/${attributeId}`;
  const token = localStorage.getItem('accessToken');
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}
   

export const addGender = async (genderName:string) => {
  const url = `http://localhost:8080/genders/admin/add`;
  const token = localStorage.getItem('accessToken');
  const requestBody = {
    "name": genderName
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

  export const deleteGender = async (genderId:number)=>{
    const url = `http://localhost:8080/genders/admin/${genderId}`;
    const token = localStorage.getItem('accessToken');
    const response = await fetch (url,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }

  export const editGender = async (genderName: string, genderId: number) =>{
    const url = `http://localhost:8080/genders/admin/edit/${genderId}`;
  const token = localStorage.getItem('accessToken');
  const requestBody = JSON.stringify({ name: genderName }); 
  const response = await fetch (url,{
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: requestBody
  });
  const data = await response.json();
  return data;
  }

 