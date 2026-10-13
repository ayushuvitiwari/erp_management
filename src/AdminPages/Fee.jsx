import React, { useEffect, useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './CSS/Fee.css';

const Fee = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [allFee, setAllFee] = useState([]);
  const [searchedFee, setSearchedFee] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, feeRes] = await Promise.all([
          axios.get('/Data/Student.json'),
          axios.get('/Data/Fee.json')
        ]);

        setStudents(studentRes.data);
        setAllFee(feeRes.data);
      } catch (error) {
        console.log(error);
        setMessage('Unable to load student or fee data.');
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim().toLowerCase();

    if (!value) {
      setSearchedStudent(null);
      setSearchedFee([]);
      setMessage('Please enter Phone Number, Email or Registration Number.');
      return;
    }

    const student = students.find((s) =>
      [s.RegNo, s.PhoneNumber, s.Email].some(
        (item) => String(item ?? '').toLowerCase() === value
      )
    );

    if (!student) {
      setSearchedStudent(null);
      setSearchedFee([]);
      setMessage('Student not found. Please check the details.');
      return;
    }

    setSearchedStudent(student);
    setSearchedFee(
      allFee.filter(
        (f) => String(f.RegNo) === String(student.RegNo)
      )
    );
    setMessage('');
  };

  const totalFee = searchedFee.reduce(
    (sum, f) => sum + Number(f.Amount || 0),
    0
  );

  const paidFee = searchedFee.reduce(
    (sum, f) => sum + Number(f.PaidAmount ?? f.paidAmount ?? 0),
    0
  );

  const dueFee = totalFee - paidFee;

  return (
    <DashboardLayout>
      <div className="fee-page">
        <div className="fee-page-heading">
          <div>
            <h2>Fee Management</h2>
            <p>Search students and manage their fee details.</p>
          </div>
        </div>

        <form className="fee-search-box" onSubmit={handleSearch}>
          <div className="fee-search-input">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Enter Phone Number, Email or Reg No"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button type="submit">Search Student</button>
        </form>

        {message && (
          <div className="fee-message">{message}</div>
        )}

        {searchedStudent && (
          <>
            <div className="student-profile-card">
              <div className="student-avatar">
                {String(searchedStudent.Name || 'S')
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="student-profile-info">
                <h3>{searchedStudent.Name || '-'}</h3>
                <p>Registration No: {searchedStudent.RegNo || '-'}</p>
                <span className="student-class-badge">
                  {searchedStudent.currentClass || '-'}
                </span>
              </div>

              <div className="student-profile-status">
                <span>Student Profile</span>
                <strong>{searchedStudent.Email || '-'}</strong>
                <small>{searchedStudent.PhoneNumber || '-'}</small>
              </div>
            </div>

            <div className="student-details-grid">
              <div className="student-detail-item">
                <span>Father's Name</span>
                <strong>{searchedStudent.FatherName || '-'}</strong>
              </div>

              <div className="student-detail-item">
                <span>Registration No.</span>
                <strong>{searchedStudent.RegNo || '-'}</strong>
              </div>

              <div className="student-detail-item">
                <span>Class</span>
                <strong>{searchedStudent.currentClass || '-'}</strong>
              </div>
            </div>

            <div className="fee-summary-grid">
              <div className="fee-summary-card total">
                <span>Total Fee</span>
                <h3>₹{totalFee.toLocaleString('en-IN')}</h3>
              </div>

              <div className="fee-summary-card paid">
                <span>Paid Fee</span>
                <h3>₹{paidFee.toLocaleString('en-IN')}</h3>
              </div>

              <div className="fee-summary-card due">
                <span>Due Fee</span>
                <h3>₹{dueFee.toLocaleString('en-IN')}</h3>
              </div>
            </div>

            <div className="fee-table-card">
              <div className="fee-table-heading">
                <h3>Fee Payment History</h3>
                <span>{searchedFee.length} Records</span>
              </div>

              <div className="fee-table-scroll">
                <Table responsive hover className="fee-data-table">
                  <thead>
                    <tr>
                      <th>Reg No</th>
                      <th>Fee Name</th>
                      <th>Payment Type</th>
                      <th>Paid Amount</th>
                      <th>Due Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {searchedFee.length > 0 ? (
                      searchedFee.map((f, index) => {
                        const amount = Number(f.Amount || 0);
                        const paid = Number(
                          f.PaidAmount ?? f.paidAmount ?? 0
                        );

                        return (
                          <tr key={f._id ?? index}>
                            <td>{f.RegNo}</td>
                            <td>{f.FeeType || '-'}</td>
                            <td>
                              {f.PaymentType || '-'}
                              {f.FeeMonth ? ` (${f.FeeMonth})` : ''}
                            </td>
                            <td className="fee-paid-amount">
                              ₹{paid.toLocaleString('en-IN')}
                            </td>
                            <td className="fee-due-amount">
                              ₹{(amount - paid).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="fee-empty">
                          No fee records found for this student.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Fee;
