import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderedItems from '../components/OrderedItems'
import Navbar from '../components/Navbar'
import { db } from '../firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'


export default function Orders() {
  
  const [cartItems,setCartItems] = React.useState([])  
  const user = useSelector(state => state.auth.user)
    //Read data from firestore
    const itemRef = doc(db, 'users', `${user?.email}`) 

      React.useEffect( () =>{
        onSnapshot(itemRef, async (doc) =>{
          (setCartItems(doc.data().cart)) /*Receiving data from firebase and setting state*/ 
        })
      },[user?.email])
      
  //Total price of cart
  const totalPrice = cartItems.reduce((total,item) =>{
    return(total + item.collectivePrice)
  }, 0)

  // Mapping items in cart
  const orderedItem = cartItems.map(item =>{
    return(
      <OrderedItems
        key = {item.id}
        id = {item.id}
        url = {item.url}
        brandName = {item.brandName}
        productName = {item.productName}
        rating = {item.rating}
        price = {item.price}
        quantity = {item.quantity}
        collectivePrice = {item.collectivePrice}
        orderItems = {cartItems}
      />
    )
  })
  return (
    <div>
      <Navbar/>
      <div className='mt-[110px] md:mt-[55px] bg-gray-200 p-5 text-sm md:text-lg'>
        {/* <h2>Hello, {user? user?.email:''}</h2> */}
        {
        cartItems.length===0?
        // When cart is empty
          <div className='h-[150px] w-full bg-white p-4 flex flex-col justify-center gap-3'>
            <h1 className='text-2xl font-semibold'>Your have no orders.</h1>
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
            <h1 className='text-xl md:text-3xl font-semibold mb-7'>Your orders</h1>
            <div className='flex flex-col items-center md:items-start  md:flex-row gap-5'>
              {/* Cart Items*/}
              <div className='flex flex-col gap-3 w-[75%]'>
                {orderedItem}
              </div>
              {/*Section to display total price of cart*/}
              <div className='p-5 flex flex-col justify-center items-center gap-3 md:w-[23%] md:h-[220px] border bg-white rounded shadow-xl'>
                <p className='text-[17px] md:text-[20px]'>Total: <strong>₹{totalPrice}</strong></p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}














