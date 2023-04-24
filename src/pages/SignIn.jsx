import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth';
import { authActions } from '../store/authSlice';

export default function SignIn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userData, setUserData] = React.useState({
    email: "", password: ""
  })
  const [error, setError] = React.useState("")
  //Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      //Logging in registered user
    const res = await signInWithEmailAndPassword(auth, userData.email, userData.password)
    dispatch(authActions.signIn(res.user.email))  
    // user returned from redux store is null initially 
    //and order items were not rendering untill page is reloaded. 
    // Navigates to Home page and reloads it to render Order items
    navigate('/')
    location.reload()
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
        <img src="../src/assets/amazonblacklogo.png" alt="" 
        className='h-7 md:h-[40px] cursor-pointer object-contain'/>
      </Link>
      {/*Sign in form*/}
      <form
        onSubmit={handleSubmit} 
        className='flex flex-col py-6 px-10 border rounded w-full md:w-[400px]'>
        <div className='h-[48px]'>
        <h2 className='text-lg md:text-2xl font-semibold'>Sign In</h2>
        <p className='text-xs text-red-700'>{error}</p>
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
        <p className='text-xs text-gray-500 mb-2'>New to Amazon?</p>
        <Link to='/signup'>
          <button className='text-sm md:text-[15px] bg-gray-300 hover:bg-gray-400 border h-8 rounded px-2 w-full'>
            Create your account
          </button>
        </Link>
      </div>
      
    </div>
  )

}
