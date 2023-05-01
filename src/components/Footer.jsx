import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center w-full text-white'>
        <div className='bg-[#232F3E] grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center text-[13px] border-b-[0.5px] border-gray-500 p-10'>
            <div className='flex flex-col items-center gap-2'>
                <h3 className='text-sm md:text-lg font-semibold'>Get to Know Us</h3>
                <a className='hover:underline cursor-pointer text-gray-300'>About Us</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Careers</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Press Releases</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Amazon Science</a>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h3 className='text-sm md:text-lg font-semibold'>Connect with Us</h3>
                <a className='hover:underline cursor-pointer text-gray-300'>Facebook</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Twitter</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Instagram</a>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h3 className='text-sm md:text-lg font-semibold'>Make Money with Us</h3>
                <a className='hover:underline cursor-pointer text-gray-300'>Sell on Amazon</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Protect and Build Your Brand</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Become an Affiliate</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Amazon Global Selling</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Advertise Your Products</a>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h3 className='text-sm md:text-lg font-semibold'>Let Us Help You</h3>
                <a className='hover:underline cursor-pointer text-gray-300'>COVID-19 and Amazon</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Your Account</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Returns Centre</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Amazon App Download</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Help</a>
            </div>
        </div>
        <div className='bg-[#131921] flex flex-col w-full items-center justify-center text-xs gap-3 p-5'>
            <div className='flex gap-3'>
                <a className='hover:underline cursor-pointer text-gray-300'>Conditions of Use & Sale</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Privacy Notice</a>
                <a className='hover:underline cursor-pointer text-gray-300'>Interest-Based Ads</a>
            </div>
            <div>© 1996-2023, Amazon.com, Inc. or its affiliates</div>
        </div>
    </div>
  )
}





