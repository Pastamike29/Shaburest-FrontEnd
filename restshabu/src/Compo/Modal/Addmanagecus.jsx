import axios from 'axios';
import './Addmodal.css';
import React, { useState } from 'react';
function Addmanagecus({ closeModal, onSubmit, defaultValue }) {
    const [formState, setFormState] = useState(
        defaultValue || {
            username: '',
            firstLastName: '',
            email: '',
            phonenumber: '',
            dob: '',
        }
    );
    const [errors, setErrors] = useState('');

    const validateForm = () => {
        if (
            formState.username &&
            formState.firstLastName &&
            formState.email &&
            formState.phonenumber &&
            formState.dob
        ) {
            setErrors('');
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(', '));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:2929/0/user', formState);
            // Handle successful response
            console.log('Data sent:', response.data);
            onSubmit(formState);
            closeModal();
        } catch (error) {
            // Handle errors
            console.error('Error sending data:', error);
        }
    };
    
  return (
    <div className='admin-modal-contain'>
        <div className='admin-modal'>
            <form>
            <div className='form-group-add'>
                    <label htmlFor="username">ชื่อผู้ใช้งาน</label>
                    <input name='username' type="text" value={formState.username} onChange={handleChange} /></div>
            <div className='form-group-add'>
                    <label htmlFor="fnamelname">ชื่อ-สกุลลูกค้า</label>
                    <input name='firstLastName' type="text" value={formState.firstLastName} onChange={handleChange} /></div>
                    <div className='form-group-add'>
                    <label htmlFor="email">อีเมลลูกค้า</label>
                    <input name='email' type='email'  value={formState.email} onChange={handleChange} /></div>
                    <div className='form-group-add'>
                    <label htmlFor="phonenumber">เบอร์โทรศัพท์</label>
                    <input name ='phonenumber' type='tel' placeholder="Phone Number *(xxx-xxx-xxxx)"  value={formState.phonenumber} 
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChange}/></div>
                    <div className='form-group-add'>
                    <label htmlFor="dob">วันเกิด</label>
                    <input name ='dob' type='date' value={formState.dob} onChange={handleChange}/></div>
                    {errors&&<div className='error'>{`Please include: ${errors}`}
                        </div>}
                  
                        <div className="align-btn-submit">
                        <button
                            className="btn-cancel-admin"
                            onClick={() => closeModal(false)}
                            style={{ color: 'black', backgroundColor: '#EFEFEF' }}
                        >
                            ยกเลิก
                        </button>
                        <button className="btn-submit" onClick={handleSubmit}>
                            ยืนยันส่งข้อมูล
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addmanagecus;