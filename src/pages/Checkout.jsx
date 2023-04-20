import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutItems from '../components/CheckoutItems'

export default function Checkout() {
  const cartItems = useSelector(state => state.cart.cartItems)
  const cartCount = useSelector(state => state.cart.totalQuantity)

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
        productName = {item.productName}
        rating = {item.rating}
        price = {item.price}
        quantity = {item.quantity}
        collectivePrice = {item.collectivePrice}
      />
    )
  })
  return (
    <div className='mt-[55px] bg-gray-200 p-5 text-sm md:text-lg'>
      {
      cartItems.length===0?
      // When cart is empty
        <div className='h-[150px] w-full bg-white p-4 flex flex-col justify-center gap-3'>
          <h1 className='text-2xl font-semibold'>Your Amazon Cart is empty.</h1>
          <Link to='/'>
          <p className='cursor-pointer text-[15px] hover:text-blue-700'>Continue Shopping</p>
          </Link>  
        </div>
        :
        // When cart has items
        <div className='mt-[100px] md:mt-0'>
          <h1 className='text-xl md:text-3xl font-semibold mb-7'>Shopping Cart</h1>
          <div className='flex flex-col md:flex-row gap-5'>
            {/* Cart Items*/}
            <div className='flex flex-col gap-3 md:w-[75%]'>
              {checkoutItems}
            </div>
            {/*Section to display total price of cart*/}
            <div className='p-5 flex flex-col justify-center items-center gap-3 md:w-[23%] max-h-[220px] border bg-white rounded shadow-xl'>
              <p className='text-[17px] md:text-[20px]'>Subtotal of ({cartCount} items): <strong>₹{totalPrice}</strong></p>
              <button className='bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-9 rounded px-2 w-full'
                  >Proceed to buy</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
