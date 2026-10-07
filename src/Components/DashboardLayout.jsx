import React, { useEffect, useState } from 'react'
import './CSS/dashboardLayout.css'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { MdSubject } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdAppRegistration } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
const DashboardLayout = ({children}) => {
  const [role, setRole] = useState('')
  const [isClose, setIsClose] = useState(false)
  const handleSidebar = () => {
    setIsClose(!isClose);
  }
  const handlelogout =()=>{
    localStorage.clear('tocken');
    localStorage.clear('role');
    navigation('/login')
  }

  useEffect(() => {
    setRole(localStorage.getItem('role') ?? "Guest")
  },[])
  

  const tabs = {
    supperAdmin: [
      { title: "Dashboard", path: "/dashboard", icon: IoSettings },
      { title: "Admins", path: "/admins", icon: RiAdminFill }
    ],
    admin: [
      { title: "Dashboard", path: "/dashboard", icon: MdDashboard, },
      { title: "Fee", path: "/fee", icon: FaRupeeSign, },
      { title: "Registration", path: "/registration", icon: MdAppRegistration, },
      { title: "Teachers", path: "/teachers", icon: LiaChalkboardTeacherSolid, },
      { title: "Students", path: "/Students", icon: PiStudentBold, },
      { title: "Class", path: "/class", icon: SiGoogleclassroom, },
      { title: "Subject", path: "/subjects", icon: MdSubject, },
      { title: "Settings", path: "/adminsetting", icon: IoSettings, },
    ],
    teacher: [
      { title: "Dashboard", path: "/dashboard", icon: MdDashboard, },
      { title: "Fee", path: "/fee", icon: FaRupeeSign, },
      { title: "Students", path: "/Students", icon: PiStudentBold, },
      { title: "My Classes", path: "/myclass", icon: SiGoogleclassroom, },
      { title: "My Subjects", path: "/my-subjects", icon: MdSubject, },
      { title: "Profile", path: "/profile", icon: VscAccount, },
    ]
  }

  const roleTabs = tabs[role] || [];
  return (
    <>
      <div className="dashboardLayout-container">
        <div className={`sidebar ${isClose ? "sidebar-close" : ""}`}>
          <div className="logo">
            <img src="/images/logo-erp.png" alt="" className='logo-erp-image' />
            <span className='erp-text'>ERP</span> <span className='erp-management'>Management</span>
          </div>
          <div className="sidebar-items">

            {roleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) =>
                    `navlinks ${isActive ? "sidebar-active" : ""}`
                  }
                >
                  <Icon/>

                  {!isClose && (
                    <span>{tab.title}</span>
                  )}
                </NavLink>
              );
            })}


          </div>
          <div className="logout-outer">
            <button className='sidebar-logout' onClick={handlelogout}>Logout</button>
          </div>
        </div>
        <div className="dashboardLayout-main">
          <div className="dashboardLayout-header">
            <button onClick={handleSidebar}>{isClose ? <IoReorderThreeSharp /> : <IoCloseSharp /> }</button>
            <h1>Welcome Back! {role} </h1>
          </div>
          <div className="dashboardLayout-content">
            {children}
          </div>
        </div>
      </div>


    </>
  )
}

export default DashboardLayout