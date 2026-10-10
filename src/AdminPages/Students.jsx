import React from 'react'
import DashboardLayout from '../Components/DashboardLayout'

const Students = () => {
  return (
    <DashboardLayout>

        <div className="student-header">
            <h3>All Students</h3>
            <input type="search" placeholder='Search by name , Email , Phone' />
        </div>

        <div className="students-container"></div>
    </DashboardLayout>
  )
}

export default Students