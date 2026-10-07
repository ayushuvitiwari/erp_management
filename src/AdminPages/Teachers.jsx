import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import DashboardLayout from '../Components/DashboardLayout'
import { IoCloseSharp } from "react-icons/io5";

const Teachers = () => {
  const [ModalShow, setModalShow] = useState()
  return (
    <>
      <DashboardLayout>

        <div className="all-classes-header">
          <h1>All Teachers</h1>
          <button className='all-create-class' onClick={() => setModalShow(true)}>Add Teachers</button>
        </div>


        <Modal show={ModalShow} centered>
          <Modal.Header className='modal-header'>
            <h1>create class</h1>
            <button onClick={() => setModalShow(false)}><IoCloseSharp size={30} /></button>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>


      </DashboardLayout>
    </>
  )
}

export default Teachers