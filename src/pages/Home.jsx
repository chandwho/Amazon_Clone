import React from 'react'
import Product from '../components/Product'
import productData from '../ProductData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {

  // Mapping product items
  const product = productData.map(data =>{
    return(
      <Product
        key = {data.id}
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
    
    <div className=''>
      <Navbar/>
      {/*Banner image*/}
      <div className='relative mt-[108px] md:mt-[54px] mb-[-80px] md:mb-[-180px] lg:mb-[-250px]'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/MayART23/GW/GW_HERO-PC_PEA_V1_2X._CB590992786_.jpg" alt="" 
        className='object-contain'/>
        {/*Div for applying gradient at the bottom of image*/}
        <div className='absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white'></div>
      </div>
      <div id='product-container' className=' w-full flex flex-col justify-center items-center gap-5 p-5'>
        {/*Product Item container*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
          {product}
        </div>
      </div> 
    </div>
  )
}