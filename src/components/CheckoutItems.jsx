import React from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cartSlice'

export default function CheckoutItems(props) {

    const dispatch = useDispatch()
    //Calling function to remove items from cart
    const removeFromCart = () =>{
        dispatch(cartActions.removeFromCart(props.id
        ))
    }

  return (
        <div className='relative flex flex-col items-center justify-evenly md:flex-row md:justify-evenly border bg-white rounded shadow-xl h-[320px] md:h-[220px] text-sm md:text-lg px-5 md:px-10'>
            <div className='flex flex-col items-center md:flex-row h-[75%] md:h-full md:w-[80%]'>
                <div className='flex justify-center p-3 h-[50%] md:h-[70%]'>
                    <img src={props.url} alt="Product Image" 
                    className='cursor-pointer rounded-t max-w-[200px] object-contain '/>
                </div>
                <div className='flex flex-col justify- items-center text-center md:text-left md:items-start p-1 md:px-3'>
                    <p className='font-semibold text-[16px] md:text-xl'>{props.brandName}</p>
                    <p>{props.productName}</p>
                    <p>Quantity: {props.quantity}</p>

                    {/* <div className='flex cursor-pointer'>{starArray}</div> */} 
                    <p>Price: <strong>₹{props.price}</strong></p>
                </div>
            </div> 
            <div className='w-full md:w-[23%] flex flex-col gap-2 items-center'>
            <p className='text-[15px] md:text-lg'>Sub Total:<strong>₹{props.collectivePrice}</strong> </p>
            <button className='bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-8 rounded px-2 w-full'
                onClick={removeFromCart}>Remove Item</button> 
            </div>
    </div>
  )
  }