import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import './CSS/Registration.css'
import axios from 'axios'

const Registration = () => {
  const [classDetails, setclassDetails] = useState([]);
  const [selectedClass, setselectedClass] = useState('');

  const selectedFee = classDetails.find((t) =>
    t.Class === selectedClass
  );

  const totalFee = selectedFee?.fee?.reduce((acc, f) =>
    acc + Number(f.Amount), 0);


  const fetchclassDeatils = async () => {
    try {
      const res = await axios.get('/Data/Classdetails.json');
      setclassDetails(res.data)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchclassDeatils();
  }, [])
  return (
    <>
      <DashboardLayout>
        <div className="registration-page">
          <div className="registration-top">
            <div>
              <h2>Add New Student</h2>
              <p>Fill in the details below to register a new student.</p>
            </div>
          </div> <div className="registration-info">
            <div className="info-item">
              <span>Registration Date</span>
              <strong>{new Date().toLocaleDateString('en-IN')}</strong>
            </div>
            <div className="info-item">
              <span>Registration Number</span>
              <strong>Auto Generated</strong>
            </div>
            <div className="info-item">
              <span>Academic Session</span>
              <strong>2026–2027</strong>
            </div>
          </div>
          <form className="registration-form">
            <section className="registration-section">
              <div className="section-heading">
                <div className="section-number">01</div>
                <div> <h3>Personal Information</h3>
                  <p>Enter the student's basic personal details.</p>
                </div> </div> <div className="registration-grid">
                <div className="form-field">
                  <label htmlFor="studentName">Student Name *</label>
                  <input id="studentName" name="name" type="text" placeholder="Enter full name" required />
                </div> <div className="form-field">
                  <label htmlFor="studentPhoto">Student Photo</label>
                  <input id="studentPhoto" name="photo" type="file" accept="image/*" />
                </div> <div className="form-field"> <label htmlFor="studentPhone">Phone Number *</label>
                  <input id="studentPhone" name="phone" type="tel" placeholder="Enter phone number" required />
                </div> <div className="form-field">
                  <label htmlFor="studentEmail">Email Address</label>
                  <input id="studentEmail" name="email" type="email" placeholder="Enter email address" />
                </div> <div className="form-field"> <label htmlFor="studentDob">Date of Birth *</label>
                  <input id="studentDob" name="dob" type="date" required />
                </div> <div className="form-field"> <label>Gender *</label>
                  <div className="gender-options"> <label className="gender-option">
                    <input type="radio" name="gender" value="Male" required />
                    <span>Male</span>
                  </label>
                    <label className="gender-option">
                      <input type="radio" name="gender" value="Female" />
                      <span>Female</span>
                    </label>
                    <label className="gender-option">
                      <input type="radio" name="gender" value="Other" />
                      <span>Other</span>
                    </label>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="adharNumber">Aadhaar Number</label>
                  <input id="adharNumber" name="adharNumber" type="text" inputMode="numeric" maxLength={12} placeholder="Enter Aadhaar number" />
                </div>
                <div className="form-field">
                  <label htmlFor="fatherName">Father's Name *</label>
                  <input id="fatherName" name="fatherName" type="text" placeholder="Enter father's name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="motherName">Mother's Name *</label>
                  <input id="motherName" name="motherName" type="text" placeholder="Enter mother's name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="category">Category *</label>
                  <select id="category" name="category" defaultValue="" required>
                    <option value="" disabled>Select category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-field full-width">
                  <label htmlFor="studentAddress">Full Address *</label>
                  <textarea id="studentAddress" name="address" rows="3" placeholder="Enter complete residential address" required />
                </div>
              </div>
            </section>
            <section className="registration-section">
              <div className="section-heading">
                <div className="section-number">02</div>
                <div>
                  <h3>Last School Information</h3>
                  <p>Provide details about the student's previous school.</p>
                </div>
              </div>
              <div className="registration-grid">
                <div className="form-field">
                  <label htmlFor="lastSchoolName">Last School Name</label>
                  <input id="lastSchoolName" name="lastSchoolName" type="text" placeholder="Enter school name" />
                </div>
                <div className="form-field">
                  <label htmlFor="lastSchoolClass">Last Class Attended</label>
                  <input id="lastSchoolClass" name="lastSchoolClass" type="text" placeholder="e.g. Class 5" />
                </div>
                <div className="form-field">
                  <label htmlFor="lastSchoolCode">Last School Code</label>
                  <input id="lastSchoolCode" name="lastSchoolCode" type="text" placeholder="Enter school code" />
                </div>
                <div className="form-field">
                  <label htmlFor="lastSchoolMarks">Marks Obtained</label>
                  <input id="lastSchoolMarks" name="lastSchoolGainedNumber" type="number" min="0" placeholder="Enter marks obtained" />
                </div>
              </div>
            </section>
            <section className="registration-section">
              <div className="section-heading">
                <div className="section-number">03</div>
                <div>
                  <h3>Other Information</h3>
                  <p>Select the class and academic session for admission.</p>
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="class">Admission Class *</label>
                <select id="class" name="class" onChange={(e) => setselectedClass(e.target.value)} value={selectedClass} required>
                  <option value="">Select Class</option>
                  {classDetails.map((c) => (
                    <option key={c._id} value={c.Class}>{c.Class}</option>
                  ))}
                </select>
              </div>


              <div className="registration-grid">
                <div className="form-field">
                   <div className="fee-information">
                <h4>Fee Information</h4>
                {selectedFee?.fee?.map((f) => (
                  <div key={f._id}>
                    <label>{f.FeeType}</label>
                    <span>₹{f.Amount}</span>
                    <span>{f.PaymentType}</span>
                  </div>
                ))}
                <h4>Total Fee: ₹{totalFee || 0}</h4>
              </div>
                </div>
                <div className="form-field">
                  <label htmlFor="session">Academic Session</label>
                  <input id="session" name="session" type="text" value="2026-2027" readOnly />
                </div>
              </div>
            </section>
            <div className="registration-actions">
              <button type="reset" className="reset-btn">Reset Form</button>
              <button type="submit" className="submit-btn">Register Student <span>→</span></button>
            </div>
          </form>
        </div>



      </DashboardLayout>
    </>
  )
}

export default Registration