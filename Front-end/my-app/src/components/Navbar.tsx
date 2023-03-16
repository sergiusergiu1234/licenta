import {AiOutlineSetting} from 'react-icons/ai'
import {IoPersonOutline} from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiOutlineHome} from 'react-icons/ai'
import { IconContext } from 'react-icons';
const Navbar = ()=>{
    const handleAccount =()=>{
        console.log('go personal account');
    }
    const handleFavorites=()=>{
        console.log('go favorites');
    }
    const handleShoppingCart =()=>{
        console.log('hhandleShoppingCart');
    }
    const handleGoHome=()=>{
        console.log('go home');
    }

    return(
    <div className='navbar'>
        <div>
            <IconContext.Provider value={{size: '40px'}}>
            <div className='navbarIcons' onClick={handleAccount}><IoPersonOutline/></div>
            <div className='navbarIcons' onClick={handleFavorites}><AiOutlineHeart /></div>
            <div className='navbarIcons' onClick={handleShoppingCart}><AiOutlineShoppingCart/> </div> 
            <div className='navbarIcons' onClick={handleGoHome}> <AiOutlineHome/></div> 
            </IconContext.Provider>
        </div>
      
    </div>) 
}
export default Navbar;