import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutItems from '../components/CheckoutItems'
import Navbar from '../components/Navbar'
import { db } from '../firebaseConfig'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { cartActions } from '../store/cartSlice'
import Footer from '../components/Footer'

export default function Checkout() {

  const cartItems = useSelector(state => state.cart.cartItems)
  const cartCount = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(state => state.auth.user)

  //Total price of cart
  const totalPrice = cartItems.reduce((total,item) =>{
    return(total + item.collectivePrice)
  }, 0)

  // Mapping items in cart
  const checkoutItems = cartItems.map(item =>{
    return(
      <CheckoutItems
        id = {item.id}
        url = {item.url}
        brandName = {item.brandName}
        productName =  {item.productName}
        rating = {item.rating}
        price = {item.price}
        quantity = {item.quantity}
        collectivePrice = {item.collectivePrice}
      />
    )
  })

  const saveOrders = () =>{
    //If user is logged in
    if(user){
      cartItems.map(async (item) =>{
        const itemRef = doc(db, 'users', `${user.email}`)
        // Addidng data to firestore
        await updateDoc(itemRef,
          {cart: arrayUnion({
            id: item.id,
            url: item.url,
            brandName: item.brandName,
            productName: item.productName,
            rating: item.rating,
            price: item.price,
            quantity: item.quantity,
            collectivePrice: item.collectivePrice,
            })
          }
          //Reset redux cart state after order is placed
        )
        dispatch(cartActions.resetCart())
      })
      alert('Yay! Your order has been placed.')  
    }else{
      navigate('/signin')
    }
    }
  
  return (
    <div>
      <Navbar/>
      <div className='mt-[110px] md:mt-[55px] bg-gray-200 p-5 text-sm md:text-lg'>
        {/* <h2>Hello, {user? user?.email:''}</h2> */}
        {
        cartItems.length===0?
        // When cart is empty
          <div className='h-[150px] w-full bg-white p-4 flex flex-col justify-center gap-3'>
            <h1 className='text-2xl font-semibold'>Your Amazon Cart is empty.</h1>
            {user?  
              <Link to='/'>
                <p className='cursor-pointer text-[15px] hover:text-blue-700'>Continue Shopping</p>
              </Link>  
            : 
              <Link to='/signin'> 
                <button className='text-sm md:text-[15px] bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-8 rounded px-2'>
                Sign in to continue shopping
                </button>
              </Link>
            }  
          </div>
          :
          // When cart has items
          <div>
            <h1 className='text-xl md:text-3xl font-semibold mb-7'>Shopping Cart</h1>
            <div className='flex flex-col items-center md:items-start md:min-h-[220px] md:flex-row gap-5'>
              {/* Cart Items*/}
              <div className='flex flex-col gap-3 w-[75%]'>
                {checkoutItems}
              </div>
              {/*Section to display total price of cart*/}
              <div className='sticky top-[94px] p-5 flex flex-col justify-center items-center gap-3 md:w-[23%] md:h-[220px] border bg-white rounded shadow-xl'>
                <p className='text-[17px] md:text-[20px]'>Subtotal of ({cartCount} items): <strong>₹{totalPrice}</strong></p>
                <button 
                onClick={saveOrders}
                className='bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-9 rounded px-2 w-full'
                    >Proceed to buy</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
