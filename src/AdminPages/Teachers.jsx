import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import DashboardLayout from '../Components/DashboardLayout'
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import './CSS/Teachers.css'

const Teachers = () => {
  const [ModalShow, setModalShow] = useState()
  const [Teachers, setTeachers] = useState([])

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('/Data/Teachers.json')
      console.log(res)
      setTeachers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTeachers();
  },[])
  return (
    <>
      <DashboardLayout>

        <div className="all-classes-header">
          <h2>All Teachers</h2>
          <button className='all-create-class' onClick={() => setModalShow(true)}>Add Teachers</button>
        </div>



        <Table className="subject-table" cellPadding="0" cellSpacing="0" striped bordered>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Subject Name</th>
              <th>Mobile</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td className='text-center'>
                  <button className="subject-edit-btn"><FaEdit /></button>
                  <button className="subject-edit-btn">< MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>










        <Modal show={ModalShow} centered>
          <Modal.Header className='modal-header'>
            <h2>Add Teacher</h2>
            <button onClick={() => setModalShow(false)}><IoCloseSharp size={30} /></button>
          </Modal.Header>
          <Modal.Body>

            <div className="teacher-body">
              <input type="text" placeholder='Enter name' />
              <input type="tel" placeholder='Enter Number' />
              <button>Add Teacher</button>
            </div>

          </Modal.Body>
        </Modal>


      </DashboardLayout>
    </>
  )
}

export default Teachers