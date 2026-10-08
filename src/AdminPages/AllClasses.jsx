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

    const [modalShow, setModalShow] = useState(false)
    const [teachers, setteachers] = useState([]);
    const [subjects, setsubjects] = useState([]);

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

    const [classes, setclasses] = useState([])

    const fetchClasses = async () => {
        try {
            const res = await axios.get('/Data/Classdetails.json');
            setclasses(res.data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchData();
        fetchClasses();
    }, []);
    return (
        <>
            <DashboardLayout>


                <div className="all-classes-header">
                    <h1>All Classes</h1>
                    <button className='all-create-class' onClick={() => setModalShow(true)}>Create Class</button>
                </div>


                <div className="subject-table" cellPadding="0" cellSpacing="0" striped bordered>
                    <Table striped bordered cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                classes.map((c) => (
                                    <tr>
                                        <td>{c._id}</td>
                                        <td>{c.Class}</td>
                                        <td>
                                            <button className="subject-edit-btn"><FaEdit /></button>
                                            <button className="subject-edit-btn">< MdDelete /></button>
                                            <button className="subject-edit-btn"><FaEye /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>










                <Modal show={modalShow} centered>
                    <Modal.Header className='modal-header'>
                        <h1>Create class</h1>
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
                                            teachers.map((s) => (
                                                <option value={s.id}>{s.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            ))
                        }
                        <button onClick={addmore}> Add</button>
                        {/* <button onClick={saveclass}>Save Class</button> */}

                    </Modal.Body>
                </Modal>





            </DashboardLayout>
        </>
    )
}

export default AllClasses