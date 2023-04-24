import React from 'react'
import logo from '../assets/amazonblacklogo.png'
import { Link, useNavigate  } from 'react-router-dom'
import { useDispatch}  from 'react-redux'
import { auth, db } from '../firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { authActions } from '../store/authSlice';
import {doc, setDoc} from 'firebase/firestore'

export default function SignUp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userData, setUserData] = React.useState({
    email: "", password: "", name: ""
  })
  const [error, setError] = React.useState("")

  //Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      //User Sign Up(registering new user)
    const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    res.user.displayName = userData.name
    console.log(res.user )
    dispatch(authActions.signUp({
      email: res.user.email,
      name: userData.name
    }))
    //Creating firebase doc to store data for each user  
    await setDoc(doc(db, 'users', userData.email),
    {cart: []})   
    navigate('/')
    }catch(err) { setError(err.message)}
  }

  //Setting email and password state
  const handleChange = (e) =>{
    setUserData(prevData =>{
      return{
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }
  return (
    <div className='flex flex-col items-center gap-5 p-5 text-sm md:text-lg w-full'>
      {/*Logo*/}
      <Link to='/'>
        <img src={logo} alt="" 
        className='h-7 md:h-[40px] cursor-pointer object-contain'/>
      </Link>
      {/*Sign up form*/}
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col py-6 px-10 border rounded w-full md:w-[400px]'>
        <div className='h-[48px]'>
        <h2 className='text-lg md:text-2xl font-semibold'>Sign Up</h2>
        <p className='text-xs text-red-700'>{error}</p>
        </div>
        <div>
        <label htmlFor="name"
          className='text-sm font-semibold'>
          Name
          </label>
          <input type="text"
          id='name'
          onChange={handleChange}
          name='name'
          value={userData.name} 
          required
          autoComplete='off'
          className='border-2 rounded p-[3px] hover:shadow-md indent-1 text-[15px] w-full mb-1'
          />
        </div>
        <div>
          <label htmlFor="email"
            className='text-sm font-semibold'>
            Email
          </label>
          <input type="email"
          id='email' 
          onChange={handleChange}
          name='email'
          value={userData.email}
          required
          autoComplete='off'
          className='border-2 rounded p-[3px] hover:shadow-md indent-1 text-[15px] w-full mb-1'
          />
        </div>
        <div>
          <label htmlFor="password"
            className='text-sm font-semibold'>
            Password
          </label>
          <input type="password"
          id='password' 
          onChange={handleChange}
          name='password'
          value={userData.password}
          required
          className='border-2 rounded p-[3px] hover:shadow-md indent-1 text-[15px] w-full mb-5'
          />
        </div>
        <button className='text-sm md:text-[15px] bg-[#FFD814] hover:bg-yellow-500 border-[#c9a801] border h-8 rounded px-2 w-full'>
          Continue
        </button>
        <p className='text-xs'>By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940"
          className='text-blue-500 hover:text-orange-600'>
            Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380"
            className='text-blue-500 hover:text-orange-600'>
            Privacy Notice</a>.
        </p>
        <a className='text-sm text-blue-500 hover:text-orange-600 cursor-pointer'>Need help?</a>
      </form>
      <div className='w-full md:w-[400px] text-center'>
        <p className='text-xs text-gray-500 mb-2'>Already have a account?</p>
        <Link to='/signin'>
            <button className='text-sm md:text-[15px] bg-gray-300 hover:bg-gray-400 border h-8 rounded px-2 w-full'>
                Sign In
            </button>
        </Link>
      </div>
      
    </div>
  )
}

