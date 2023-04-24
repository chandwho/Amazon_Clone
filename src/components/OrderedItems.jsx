import React from 'react'
import { useSelector } from 'react-redux'
// import { cartActions } from '../store/cartSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export default function CheckoutItems(props) {

    const user = useSelector(state => state.auth.user)
    // const dispatch = useDispatch()
    const itemRef = doc(db, 'users', `${user?.email}`)
    //Cancelling orders
    const cancleOrder = async (id) =>{
        //Returns array of items without the item that is canceled
        const updatedOrders = props.orderItems.filter((order) => order.id != id)
        await updateDoc(
            itemRef, 
            {cart: updatedOrders}
            )
        alert('Your order has been canceled!')
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
            <button className='bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-8 rounded px-2 w-full'
                onClick={() =>cancleOrder(props.id)}>Cancel Order</button> 
            </div>
    </div>
  )
  }