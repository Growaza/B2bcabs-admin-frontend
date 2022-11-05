import React,{useState,useEffect} from 'react'
import  { useNavigate   } from 'react-router-dom'

export const ProtectedRoute = (props) => {
    const [login,setLogin] = useState(false)
    // localStorage.setItem('user',[])
    let navigate = useNavigate();
    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('user'))
      console.log(token,'token')
      if(token == null){
          console.log(token,'token')
          return navigate('/authentication/sign-in')
      }
    },[])
  
    
  return (
    <>
      {props.props} 
    </>
  )
}
