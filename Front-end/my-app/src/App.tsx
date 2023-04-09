import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import FavoritesPage from "./Pages/FavoritesPage";
import HomePage from "./Pages/HomePage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Register from "./Pages/Register";
import LoginPage from "./Pages/User/LoginPage";





function App() {
  return (
    <div className="App"> 
     <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path="/Home" element={<HomePage/>}></Route>
      <Route path='/Favorites' element={<FavoritesPage/>}></Route>
      <Route path='/ShoppingCart' element={<ShoppingCartPage/>}></Route>
      <Route path= '/Register' element ={<Register/>}></Route>
      <Route path= '/LoginPage' element ={<LoginPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
