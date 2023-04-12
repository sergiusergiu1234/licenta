
import {AiOutlineSetting} from 'react-icons/ai'
import {IoPersonOutline} from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiOutlineHome} from 'react-icons/ai'
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ()=>{
    const navigate=useNavigate();

    const handleAccount =()=>{
        navigate('/MyAccount')
    }
    const handleFavorites=()=>{
        navigate('/Favorites')
    }
    const handleShoppingCart =()=>{
        navigate('/ShoppingCart')
    }
    const handleGoHome=()=>{
        navigate("/Home")
    }
    return(
    <div className='navbar'>
        <div>
            <IconContext.Provider value={{size: '40px'}}>
            <div className='navbarIcons' onClick={handleGoHome}> <AiOutlineHome/></div> 
            <div className='navbarIcons' onClick={handleAccount}><IoPersonOutline/></div>
            <div className='navbarIcons' onClick={handleFavorites}><AiOutlineHeart /></div>
            <div className='navbarIcons' onClick={handleShoppingCart}><AiOutlineShoppingCart/> </div> 
            </IconContext.Provider>
        </div>
      
    </div>) 
}
export default Navbar;