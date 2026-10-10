import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import AdminSetting from './AdminPages/AdminSetting'
import Fee from './AdminPages/Fee'
import Registration from './AdminPages/Registration'
import Subjects from './AdminPages/Subjects'
import Teachers from './AdminPages/Teachers'
import AllClasses from './AdminPages/AllClasses'
import Students from './AdminPages/Students'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />


          
          <Route path='/adminsetting' element={<AdminSetting />} />
          <Route path='/fee' element={<Fee />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/subjects' element={<Subjects />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/class' element={<AllClasses />} />
          <Route path='/students' element={<Students/>} />
          
        </Routes>
      </Router>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App