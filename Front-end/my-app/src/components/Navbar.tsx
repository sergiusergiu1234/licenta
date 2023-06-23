
import {AiOutlineSetting} from 'react-icons/ai'
import {IoPersonOutline} from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiOutlineHome} from 'react-icons/ai'
import { IconContext } from 'react-icons';
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom';

import '../Styles/Navbar.css';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import { Button } from 'react-bootstrap';

const Navbar = ()=>{
    const { auth,setAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
  

    useEffect(() => {
      const role = window.localStorage.getItem('roles')
        // Check if the user has the admin role
        const checkAdminRole = () => {
        
          //setIsAdmin(auth.roles.includes('ROLE_ADMIN'));
          if (role) {
            setIsAdmin(role.includes('ROLE_ADMIN'));
          }
          
          setLoading(false);
        };
        console.log(isAdmin)
        checkAdminRole();
      }, [auth.roles,loading]);

      if (loading) {
        return <div>Loading...</div>; // Display a loading state while fetching authentication information
      }

     
    return (
        <div className={isAdmin ? "navbar-admin" : "navbar-user"}>
          <div className={isAdmin ? 'navbar-buttons-admin':'navbar-buttons-user'}>
            <IconContext.Provider value={{ size:'1em' }}>
            { isAdmin ? 
              <div className='nav-container-admin'>
                <div className='toolbar-action-icon'>
                <CustomLink to={'/'}>Products</CustomLink>
                </div>
                <CustomLink to='/admin/products'><div>Manage Products</div></CustomLink>
                <CustomLink to='/admin/brands'><div>Manage Brands</div></CustomLink>
                <CustomLink to='/admin/categories'><div>Categories & Types</div></CustomLink>
                <CustomLink to='/admin/attributes'><div>Mange Attributes</div></CustomLink>
                <CustomLink to='/admin/genders'><div>Manage Genders</div></CustomLink>
                <CustomLink to='/admin/orders'><div>Manage Orders</div></CustomLink>
                
               
              </div > : 
              <div className="nav-container">
                
                <CustomLink to={'/home'}>
                  <AiOutlineHome />
                </CustomLink>
               
               
                
                
                <div className='toolbar-action-icons'>
                  
                <div className='toolbar-action-icon'>
                <CustomLink to={'/'}>Products</CustomLink>
                </div>
                    <CustomLink to={'/MyAccount'} >
                      <IoPersonOutline />
                    </CustomLink>
                  
                  
                    <CustomLink to={'/Favorites'}>
                      <AiOutlineHeart />
                    </CustomLink>
                 
                                 
                    <CustomLink to={'/ShoppingCart'}>
                      <AiOutlineShoppingCart />
                    </CustomLink>
                                   
                </div>
              </div>
            }
            </IconContext.Provider>
          
          </div>  
          <div className='ribbon'></div>
        </div>
        
      );
      
    };
    
export default Navbar;

function CustomLink({ to, children}:any) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <div className={isActive ? "active" : ""}>
        <Link to={to}>
          <div className='toolbar-action-icon'>
          {children}
          </div>
        </Link>
      </div>
    )
  }