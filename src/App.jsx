import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Checkout from './pages/Checkout'
import SignUp from './pages/SignUp'
import { authActions } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebaseConfig';
import Orders from './pages/Orders'
import Footer from './components/Footer'

export default function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)

  // Listens to user login and logout and dispatches used details(renders only once when App loads)
  React.useEffect(() =>{
    onAuthStateChanged(auth, (currentUser) =>{
      if(currentUser){
        // console.log(currentUser)
        // dispatch(authActions.setUser(currentUser))
        dispatch(authActions.signIn({
          email: currentUser.email,
          name: currentUser.displayName
        }))
      }else{
        dispatch(authActions.logOut())
      }
    })
  },[])



  return (
    <div className='min-h-full flex flex-col justify-between'>
      <Routes>
        <Route path='/' element={<Home/>}>
        </Route>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
