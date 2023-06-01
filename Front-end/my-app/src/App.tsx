
import Navbar from "./components/Navbar";
import FavoritesPage from "./Pages/FavoritesPage";
import HomePage from "./Pages/HomePage";
import './App.css';

import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route, Outlet } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";
import ProductPage from "./Pages/ProductPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import { OrderDetailsProvider } from "./context/OrderDetailsProvider";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import ConfirmOrderPage from "./Pages/ConfirmOrderPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageProducts from "./Pages/Admin/ManageProducts";
import ManageBrands from "./Pages/Admin/ManageBrands";
import ManageCategories from "./Pages/Admin/ManageCategories";


const OrderPagesWrapper =() =>{
  return(
    <OrderDetailsProvider>
      <Outlet/>
    </OrderDetailsProvider>
  )
}



function App() {
  
  return (
    <div> 
      <Navbar/>
    < Routes>
      <Route path="/" element={<Layout />} >
        <Route path= 'Register' element ={<Register/>} />
        <Route path= 'LoginPage' element ={<LoginPage/>} />


        <Route element={<PersistLogin />} >
          
          <Route path="" element={<HomePage/>} />
    
            <Route path="ProductPage/:id" element={<ProductPage/>} />
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
            <Route path="admin" element={<AdminDashboard/>}></Route>
            <Route path="admin/products" element={<ManageProducts/>}></Route>
            <Route path="admin/brands" element={<ManageBrands/>}></Route>
            <Route path="admin/categories" element={<ManageCategories/>}></Route>
          </Route>
          <Route element={<RequireAuth  allowedRoles={["ROLE_USER"]}/>}>
            <Route path='Favorites' element={<FavoritesPage/>}></Route>
         
            <Route path='MyAccount' element={<AccountPage/>}></Route>

            <Route  element={<OrderPagesWrapper/>}>
              <Route path="ShoppingCart" element={<ShoppingCartPage/>} />
              <Route path="OrderDetails" element={<OrderDetailsPage />} />
              <Route path="/ConfirmOrder" element={<ConfirmOrderPage />} />
            </Route>
            
          </Route>

        </Route>

      </Route>
    </Routes>
 
    </div>
  );
}

export default App;
