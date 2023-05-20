import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import axios from "../api/axios";
import { fetchOrders } from "../api/api";
import { OrderType } from "../Types/Order.types";
import Order from "../components/Order";
import { OrderDetail } from "../Types/OrderDetail.types";
import "../Styles/AccountPage.css"
import { Button } from "react-bootstrap";



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

          fetchOrders().then(data=>setOrders(data));
        
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
        <h3>Personal data:</h3>
        <p>
             <label>Email:</label> <label>{customer.email}</label> <br/>
             <label>Name:</label> <label>{customer.firstName} {customer.lastName}</label> <br/>
             <label>Phone number:</label> <label>{customer.phoneNumber}</label> <br/>
        </p>
        <hr />
        <h3>Issued orders:</h3>
            {orders.length > 0 ? (
        orders.map((order: OrderType) => (
          <Order key={order.id} order={order} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
        <Button variant="danger" onClick={handleLogout}>Log Out</Button>
    </div>)
}
export default AccountPage;