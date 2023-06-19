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
    const [pendingOrders,setPendingOrders] = useState<OrderType[]>([]);
    const [acceptedOrders,setAcceptedOrders]= useState<OrderType[]>([]);
    const [declinedOrders,setDeclinedOrders] = useState<OrderType[]>([]);
    const [deliveredOrders,setDeliveredOrders] = useState<OrderType[]>([]);

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

      useEffect(()=>{
        setPendingOrders(orders.filter((order:OrderType)=>order.status !== "pending"));
        setAcceptedOrders(orders.filter((order:OrderType)=>order.status !== "Accepted"))
        setDeclinedOrders(orders.filter((order:OrderType)=>order.status !== "Declined"));
        setDeliveredOrders(orders.filter((order:OrderType)=>order.status !== "Delivered"))

      },[orders])

    const handleLogout =()=>{
        window.localStorage.clear();
        setAuth({
            user:"",
            roles: [""],
            accessToken: ""
        });
    }
    
    return (
      <div className="account-page">
        <div className="account-details">
          <h1>Personal data:</h1>
          <p>
            <label>Email:</label> <label>{customer.email}</label> <br />
            <label>Name:</label>{" "}
            <label>
              {customer.firstName} {customer.lastName}
            </label>{" "}
            <br />
            <label>Phone number:</label> <label>{customer.phoneNumber}</label>{" "}
            <br />
          </p>
          <div className="aesthetic-bar"></div>
          <h1>Issued orders:</h1>


          {/* Map through pendingOrders and show orders with "pending state" */}
          <div>
            <h3>Pending orders</h3>
            {orders.length > 0 ? (
              pendingOrders.map((order: OrderType) => (
                <Order key={order.id} order={order} />
              ))
            ) : (
              <p>You have no pending orders</p>
            )}
          </div>

     {/* Map through pendingOrders and show orders with "pending state" */}
     <div>
            <h3>Accepted orders orders</h3>
            {orders.length > 0 ? (
              acceptedOrders.map((order: OrderType) => (
                <Order key={order.id} order={order} />
              ))
            ) : (
              <p>You have no pending orders</p>
            )}
          </div>

     {/* Map through pendingOrders and show orders with "pending state" */}
     <div>
            <h3>Delivered orders</h3>
            {orders.length > 0 ? (
              deliveredOrders.map((order: OrderType) => (
                <Order key={order.id} order={order} />
              ))
            ) : (
              <p>You have no pending orders</p>
            )}
          </div>

     {/* Map through pendingOrders and show orders with "pending state" */}
     <div>
            <h3>Declined orders</h3>
            {orders.length > 0 ? (
              declinedOrders.map((order: OrderType) => (
                <Order key={order.id} order={order} />
              ))
            ) : (
              <p>You have no pending orders</p>
            )}
          </div>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    );
}
export default AccountPage;