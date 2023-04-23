
import Navbar from "./components/Navbar";
import FavoritesPage from "./Pages/FavoritesPage";
import HomePage from "./Pages/HomePage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import './App.css';

import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";
import ProductPage from "./Pages/ProductPage";






function App() {
  
  return (
    <div> 
      <Navbar/>

    < Routes>
      <Route path="/" element={<Layout />} >
        <Route path= 'Register' element ={<Register/>} />
        <Route path= 'LoginPage' element ={<LoginPage/>} />


        <Route element={<PersistLogin />} >
          <Route path="Home" element={<HomePage/>} />
    
            <Route path="ProductPage/:id" element={<ProductPage/>} />

          <Route element={<RequireAuth  allowedRoles={["ROLE_USER","ROLE_ADMIN"]}/>}>
            <Route path='Favorites' element={<FavoritesPage/>}></Route>
         
            <Route path='ShoppingCart' element={<ShoppingCartPage/>}></Route>

            <Route path='MyAccount' element={<AccountPage/>}></Route>
          
          </Route>

        </Route>

      </Route>
    </Routes>
 
    </div>
  );
}

export default App;
