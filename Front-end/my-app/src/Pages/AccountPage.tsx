import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import axios from "../api/axios";

const ACCOUNT_URL = "/me";

const AccountPage =() =>{
    const { setAuth } = useAuth();
    const {auth} = useAuth();
    const [customer, setCustomer] = useState({
        username:"",
        email: "",
        firstName:"",
        lastName: "",
        phoneNumber: ""
    });
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
      }, []);
    

    const handleLogout =()=>{
        window.localStorage.clear();
        setAuth({
            user:"",
            roles: [""],
            accessToken: ""
        });
    }
    
    return(<div>
        <h1>Account Page</h1>
        <h3>Personal data:</h3>
        <p>
             <label>Email:</label> <label>{customer.email}</label> <br/>
             <label>Name:</label> <label>{customer.firstName} {customer.lastName}</label> <br/>
             <label>Phone number:</label> <label>{customer.phoneNumber}</label> <br/>
             <label>Address:</label> <label>address TODO</label> <br/>
        </p>
        <hr />
        <h3>Issued orders:</h3>
            <label>1.fetch orders
                    2.Map through orders
                    3.Display orders
            </label>
            
        <button onClick={handleLogout}>Log Out</button>
    </div>)
}
export default AccountPage;