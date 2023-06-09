import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cartSlice'
import {doc, updateDoc, arrayUnion, setDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig'

export default function Product(props) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    // const itemData = useSelector(state => state.cart)
    //Adding item to cart
    const addToCart = async () =>{
        dispatch(cartActions.addToCart(
            {   key: props.key,
                id: props.id,
                url: props.url,
                brandName: props.brandName,
                productName: props.productName,
                price: props.price,
                collectivePrice: props.price,
                rating: props.rating,
                quantity: 1 
            }
        ))
    }

    //Array for product's rating stars
    let starArray=[]
    //Filled stars
    for(let i=0; i<props.rating;i++){
        starArray[i] = <AiFillStar className='text-[#FFA41C]' key={`${i}`}/>
    }
    //Empty stars for 5 - rating
    for(let i=1; i<=5-props.rating;i++){
        starArray[i+props.rating] = <AiOutlineStar className='text-[#FFA41C]' key={`${5-i}`}/>
    }

  return (
    <div className=' relative border bg-white  rounded shadow-xl w-full h-[320px] md:h-[430px]'>
        {/*Product image*/}
        <div className='w-full h-[50%] lg:h-[55%] flex justify-center border-b p-3'>
            <img src={props.url} alt="Product Image" 
            className='cursor-pointer rounded-t object-contain '/>
        </div>
        {/*Product details*/}
        <div className='text-xs md:text-[15px] flex flex-col justify- items-center text-center md:text-left md:items-start gap-[5px] px-1 py-1 md:px-3'>
            <p className='font-semibold md:text-lg'>{props.brandName}</p>
            <p>{props.productName}</p>
            <div className='flex cursor-pointer'>{starArray}</div>
            <p>₹{props.price}</p>
            <button className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border w-[90%] h-8 rounded mt-3'
            onClick={addToCart}>Add to Cart</button>
        </div>
    </div>
  )
}
