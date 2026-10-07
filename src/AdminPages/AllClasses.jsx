import React, { useState } from 'react'
import './CSS/AllClasses.css'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal';
import { IoCloseSharp } from "react-icons/io5";

const AllClasses = () => {

    const [modalShow,setModalShow] = useState(false)
  return (
    <>
    <DashboardLayout>


        <div className="all-classes-header">
            <h1>All Classes</h1>
            <button className='all-create-class' onClick={()=>setModalShow(true)}>Create Class</button>
        </div>
        

        <Modal show={modalShow} centered>
            <Modal.Header className='modal-header'>
                <h1>create class</h1>
                <button onClick={()=>setModalShow(false)}><IoCloseSharp size={30}/></button>
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

export default AllClasses