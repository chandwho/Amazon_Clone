import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FiShoppingCart} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store/authSlice'

export default function Navbar() {

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user)
  // No. of itms in cart  
  const cartCount = useSelector(state => state.cart.totalQuantity)

  const handleLogOut = async () =>{
    if(user){
        try{
        dispatch(authActions.logOut())
        navigate('/')
        location.reload()
        }catch(error){
            alert(error)
        }
    }else{
        navigate('/signin')
    }
  }  
  // user returned from redux store is null initially 
  //and order items were not rendering untill page is reloaded. 
  // Navigates to Order page and reloads it to render Order items
  function reloadPage(){
    navigate('/orders')
    location.reload()
  }

  return (
    <nav className='bg-[#131921] px-4 py-2 flex flex-col md:flex-row gap-2 md:gap-5 items-center w-full fixed top-0 z-50'>
        {/*Amazon logo*/}
        <Link to='/'>
            <img src="../src/assets/amazonIN_logo.png" alt="" 
            className='h-5 md:h-[30px] cursor-pointer object-contain'/>
        </Link>
        {/*Search box*/}
        <div className='flex flex-1' id='search-container'>
            <input type="text" 
            className='h-6 md:h-[35px]  w-full rounded-tl-sm rounded-bl-sm'/>
            <AiOutlineSearch className='h-6 w-[25px]  md:h-[35px] md:w-[50px] bg-[#febd69] p-1 text-xl md:text-4xl rounded-tr-sm rounded-br-sm'/>
        </div>
        {/*Navlink section for sign-in, prime, returns and orders and cart*/}
        <div id='navlink-container' className='flex text-white gap-5 justify-evenly'>
            <div className='cursor-pointer'
            onClick={handleLogOut}>
                {/*Displays user's name and Sign Out if logged in else Sign In */}
                <p className='text-[10px] md:text-xs'>Hello, {user?.email}</p>
                <p className='text-[12px] md:text-[15px] font-semibold'>{user?'Sign Out':'Sign In'}</p>
            </div>

            <Link
            onClick={reloadPage}
            >
                <div className='cursor-pointer'>
                    <p className='text-[10px] md:text-xs'>Returns</p>
                    <p className='text-[12px] md:text-[15px] font-semibold'>& Orders</p>
                </div>
            </Link>
            <Link>
                <div className='cursor-pointer'>
                    <p className='text-[10px] md:text-xs'>Your</p>
                    <p className='text-[12px] md:text-[15px] font-semibold'>Prime</p>
                </div>
            </Link>
            <Link to='/checkout'>
                <div className='cursor-pointer flex'>
                    <FiShoppingCart className='text-2xl md:text-4xl'/>
                    {/*Showing no of items in cart*/}
                    <p className='text-sm text-[#FFA41C] md:text-xl font-semibold mt-[6px] md:mt-[10px] ml-[2px]'>{cartCount}</p>
                    </div>
            </Link>
        </div>
    </nav>
  )
}
