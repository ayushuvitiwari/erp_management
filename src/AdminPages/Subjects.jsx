import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal'
import './CSS/Subjects.css'
import { IoCloseSharp } from "react-icons/io5"
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Subjects = () => {

  const [subject, setSubject] = useState([])
  const [modalShow, setModalShow] = useState(false)

  const fetchSubject = async () => {
    try {
      const res = await axios.get('/Data/Subject.json')
      console.log(res)
      setSubject(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSubject()
  }, [])

  return (
    <>
      <DashboardLayout>

        <div className="all-subject-header">
          <h2>All Subject</h2>
          <button className="all-create-subject" onClick={() => setModalShow(true)}>
            Create Subject
          </button>
        </div>

        <Table className="subject-table" cellPadding="0" cellSpacing="0" striped bordered>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Subject Name</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>

          <tbody>
            {subject.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td className='text-center'>
                  <button className="subject-edit-btn"><FaEdit /></button>
                  <button className="subject-edit-btn">< MdDelete/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={modalShow} centered>
          <Modal.Header className="modal-header">
            <h2>Create Subject</h2>

            <button onClick={() => setModalShow(false)}>
              <IoCloseSharp size={30} />
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="subject-body">
              <input type="text" placeholder="Enter Subject name" />
              <button>Add</button>
            </div>
          </Modal.Body>
        </Modal>

      </DashboardLayout>
    </>
  )
}

export default Subjects
