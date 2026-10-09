import React, { useEffect, useState } from 'react'
import './CSS/AllClasses.css'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal';
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { FaEye } from "react-icons/fa";

const AllClasses = () => {

    const [modalShow, setModalShow] = useState(false);
    const [teachers, setteachers] = useState([]);
    const [subjects, setsubjects] = useState([]);
    const [classModal, setclassModal] = useState(false);
    const [selectClass, setselectClass] = useState([]);
    const [classes, setclasses] = useState([]);

    const [row, setrow] = useState([
        { teacher: "", subject: "" },
    ]);

    const fetchData = async () => {
        try {
            const res = await axios.get('/Data/Subject.json');
            setsubjects(res.data);


            const res1 = await axios.get('/Data/Teachers.json');
            setteachers(res1.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addmore = () => {
        setrow([...row, { teacher: "", subject: "" }])
    }



    const fetchClasses = async () => {
        try {
            const res = await axios.get('/Data/Classdetails.json');
            setclasses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const showClass = (data) => {
        setclassModal(true);
        setselectClass(data);
    }

    const saveclass = () => {

    }

    useEffect(() => {
        fetchData();
        fetchClasses();
    }, []);
    return (
        <>
            <DashboardLayout>


                <div className="all-classes-header">
                    <h2>All Classes</h2>
                    <button className='all-create-class' onClick={() => setModalShow(true)}>Create Class</button>
                </div>


                <div className="subject-table" cellPadding="0" cellSpacing="0">
                    <Table striped bordered cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Class</th>
                                <th className='action-btn text-center'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                classes.map((c) => (
                                    <tr>
                                        <td>{c._id}</td>
                                        <td>{c.Class}</td>
                                        <td className='text-center'>
                                            <button className="subject-edit-btn"><FaEdit /></button>
                                            <button className="subject-edit-btn">< MdDelete /></button>
                                            <button className="subject-edit-btn" onClick={() => showClass(c)} ><FaEye /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>





                {/* show class modal */}

                <Modal show={classModal} centered>
                    <Modal.Header className='modal-header'>
                        <h3>{selectClass?.Class} <span style={{color: "gray", fontSize: "22px"}}> - Details</span></h3>
                        <button onClick={() => setclassModal(false)}><IoCloseSharp size={30} /></button>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover responsive className='text-center'>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Teacher</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectClass?.Subject?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Subject}</td>
                                            <td>{item.Teacher}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                        <h2>Fee</h2>
                        <Table bordered striped>
                            <thead >
                                <tr>
                                    <th>Fee Type</th>
                                    <th>Fee Amount</th>
                                    <th>Payment Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  selectClass?.fee?.map((f)=>(
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



                {/* Create class modal */}
                <Modal show={modalShow} centered>
                    <Modal.Header className='modal-header'>
                        <h2>Create class</h2>
                        <button onClick={() => setModalShow(false)}><IoCloseSharp size={30} /></button>
                    </Modal.Header>
                    <Modal.Body>

                        <input type="text" placeholder='Enter class name' /> <br /> <br />
                        {
                            row.map((index, data) => (
                                <div key={index}>
                                    <select>
                                        <option value="">Select Teacher</option>
                                        {
                                            teachers.map((t) => (
                                                <option value={t.id}>{t.name}</option>
                                            ))
                                        }
                                    </select>
                                    &emsp;
                                    <select>
                                        <option value="">Select Subject</option>
                                        {
                                            subjects.map((s) => (
                                                <option value={s.id}>{s.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            ))
                        }
                        <button onClick={addmore}> Add</button>
                        <button className='save-class-btn' onClick={saveclass}>Save Class</button>

                        <br /> <br />
                        <h2>Fee</h2>
                        <select name="" id="">
                            <option id="">Select fee Type</option>
                            <option name="" id="">Tution fee</option>
                            <option name="" id="">Exam fee</option>
                            <option name="" id="">Admisson fee</option>
                            <option name="" id="">Other</option>
                        </select>
                        <input type="text" name='fee' placeholder='Enter fee in rupees'/>
                        <input type="radio" value="monthly" /> Monthly
                        <input type="radio" value="6-month" />6 Month
                        <input type="radio" value="one-time" /> One Time
                    </Modal.Body>
                </Modal>


            </DashboardLayout>
        </>
    )
}

export default AllClasses