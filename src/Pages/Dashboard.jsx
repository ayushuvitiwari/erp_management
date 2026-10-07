import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'

const Dashboard = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(!token){
      navigate('/login')
    }
  },[])



  return (
   <>
    <DashboardLayout>
      <h1>THis is the Main Dashboard Page</h1>
    </DashboardLayout>
   
   </>
  )
}

export default Dashboard