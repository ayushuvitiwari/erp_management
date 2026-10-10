import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { IoCloseSharp } from "react-icons/io5";
import './CSS/Students.css'

const Students = () => {

  const [studentData, setstudentData] = useState([]);
  const [studentModal, setstudentModal] = useState(false);

  const fetchStudentsData = async () => {
    try {
      const res = await axios.get('/Data/Student.json');
      setstudentData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClassAction = () => {
    setstudentModal(true);
  }

  useEffect(() => {
    fetchStudentsData();
    console.log(studentData);
  }, []);
  return (
    <DashboardLayout>

      <div className="student-header">
        <h3>All Students</h3>
        <input type="search" placeholder='Search by Name , Email , Phone' />
      </div>

      <div className="students-container">
        <Table className="subject-table text-center" cellPadding="0" cellSpacing="0" striped bordered>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Reg.No.</th>
              <th>Student Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              studentData?.map((s) => (
                <tr key={s._id}>
                  <td>{s._id}</td>
                  <td>{s.RegNo}</td>
                  <td>{s.Name}</td>
                  <td>{s.PhoneNumber}</td>
                  <td>{s.Email}</td>
                  <td className='text-center'>
                    <button className="subject-edit-btn" onClick={handleClassAction}><FaEye /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>



      {/* Show students Data  */}


      <Modal show={studentModal} centered>
        <Modal.Header className='modal-header'>
          <h3><span style={{ color: "gray", fontSize: "22px" }}> - Details</span></h3>
          <button onClick={() => setstudentModal(false)}><IoCloseSharp size={30} /></button>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive className='text-center'>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>RegNo</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>AdharNumber</th>
                <th>FatherName</th>
                <th>MotherName</th>
                <th>LastSchool</th>
                <th>LastClass</th>
                <th>LastSchoolCode</th>
                <th>CurrentClass</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {
                studentData?.Subject?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Subject}</td>
                    <td>{item.Teacher}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <h3><span style={{ color: "gray", fontSize: "22px" }}> - Details</span></h3>
          <Table bordered striped>
            <thead className='text-center'>
              <tr>
                <th>Fee Type</th>
                <th>Fee Amount</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                studentData?.fee?.map((f) => (
                  <tr>
                    <td>{f.FeeType}</td>
                    <td>{f.Amount}</td>
                    <td>{f.PaymentType}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>



        </Modal.Body>
      </Modal>
    </DashboardLayout>
  )
}

export default Students