import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { OrderType } from "../Types/Order.types";
import { fetchOrders } from "../api/api";
import Order from "../components/Order";
import useAuth from "../hooks/useAuth";
import "../Styles/AccountPage.css";


const ACCOUNT_URL = "/me";

const AccountPage =() =>{
    const { setAuth } = useAuth();
    const [customer, setCustomer] = useState({
        username:"",
        email: "",
        firstName:"",
        lastName: "",
        phoneNumber: ""
    });
    const [orders,setOrders]= useState<OrderType[]>([]);

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken')
       
        fetch('http://localhost:8080/users/me',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
          .then(response => response.json())
          .then(data => setCustomer(data))
          .catch(error => console.error(error));

          fetchOrders().then(data=>{setOrders(data);console.log(data)});
        
      }, []);

    const handleLogout =()=>{
        window.localStorage.clear();
        setAuth({
            user:"",
            roles: [""],
            accessToken: ""
        });
    }
    
    return(<div className="account-page">
        
        <div className="account-details">
            
        <h1>Personal data:</h1>
        <p>
             <label>Email:</label> <label>{customer.email}</label> <br/>
             <label>Name:</label> <label>{customer.firstName} {customer.lastName}</label> <br/>
             <label>Phone number:</label> <label>{customer.phoneNumber}</label> <br/>
        </p>
        <hr />
        <h1>Issued orders:</h1>
            {orders.length > 0 ? (
        orders.map((order: OrderType) => (
          <Order key={order.id} order={order} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
        <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </div>
    </div>)
}
export default AccountPage;