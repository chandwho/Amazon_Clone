import React from 'react'
import Product from './components/Product'
import productData from './components/ProductData'

export default function Home() {

  const product = productData.map(data =>{
    return(
      <Product
        id = {data.id}
        url = {data.url}
        brandName = {data.brandName}
        productName = {data.productName}
        rating = {data.rating}
        price = {data.price}
      />
    )
  })

  return (
    <div className='relative'>
      <div className='relative mt-[110px] md:mt-[55px]'>
        <img src="https://m.media-amazon.com/images/I/71M4ML7NToL._SX3000_.jpg" alt="" 
        className='object-contain'/>
        <div className='absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white'></div>
      </div>
      <div id='product-container' className='absolute top-[80%] md:top-2/3 w-full flex flex-col justify-center items-center gap-5 p-5'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          {product}
        </div>
      </div> 
    </div>
  )
}