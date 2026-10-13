import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Fee = () => {

  const [Students, setStudents] = useState();
  const [search, setsearch] = useState();
  const [searchedStudents, setsearchedStudents] = useState([]);
  const [allFee, setallFee] = useState([]);
  const [searchedFee, setsearchedFee] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('Data/Student.json');
      setStudents(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);

    }
  };

  const fetchFee = async () => {
    try {
      const res = await axios.get('/Data/Fee.json');
      setallFee(res.data);
    } catch (error) {
      console.log(error);
    };
  };

  const fee = allFee.filter((f) => {
    return f.RegNo === Students?.RegNo
  });
  setsearchedFee(fee);


  useEffect(() => {
    fetchStudents();
    fetchFee();
  }, []);

  const handleSearch = () => {
    let st = Students.find((t) => {
      return t.PhoneNumber === search || t.Email === search || t.RegNo === search
    });
    console.log(st);

    setsearchedStudents(st);

  };

  return (
    <>
      <DashboardLayout>
        <div className="fee-collect-container">
          <div className="fee-collect-header">
            <input type="text" placeholder='Phone / Email / Reg No' onChange={(e) => setsearch(e.target.value)} value={search} />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="fee-collect-details">
            <label>{searchedStudents.RegNo}</label>
            <label>{searchedStudents.Name}</label>
            <label>{searchedStudents.FatherName}</label>
            <label>Students Profile</label>
            <span>{searchedStudents.currentClass}</span>
            <span>Total fee</span>
            <span>Due fee</span>
            <span>Remark</span>
          </div>
        </div>
        <div className="fee-table">
          <Table>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Fee Name</th>
                <th>Fee Type</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
              </tr>
            </thead>

            <tbody>
              {searchedFee.map((f) => (
                <tr key={f._id}>
                  <td>{f.RegNo}</td>
                  <td>{f.FeeType}</td>
                  <td>{f.PaymentType} ({f.FeeMonth || '-'})</td>
                  <td>{f.PaidAmount}</td>
                  <td>{f.Amount - f.PaidAmount}</td>
                </tr>
              ))}
            </tbody>



          </Table>
        </div>



      </DashboardLayout>
    </>
  )
}

export default Fee