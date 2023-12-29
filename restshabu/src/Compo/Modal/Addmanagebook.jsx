import React, { useState } from 'react';
import axios from 'axios';
import './Addmodal.css';

function Addmanagebook({ closeModal, onSubmit, defaultValue }) {
    
    const [formState, setFormState] = useState(
        defaultValue || {
            tableNumberType: '',
            tableType: '',
            quantityOfChair: '',
            tableStatus: '',
        }
    );
    const [errors, setErrors] = useState('');

    const validateForm = () => {
        if (
            formState.quantityOfChair &&
            formState.tableStatus &&
            formState.tableNumberType &&
            formState.tableType
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Perform Axios POST request
        axios.post('http://localhost:2929/0/table', formState)
            .then((response) => {
                // Handle successful response here if needed
                console.log('POST request successful:', response.data);
                onSubmit(formState); // Assuming onSubmit needs the formState
                closeModal();
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error while making POST request:', error);
            });
    };
  return (
    <div className='admin-modal-contain'>
        <div className='admin-modal'>
            <form>
                  <div  className='form-group-add'>
                    <label htmlFor="tableNumberType">หมายเลขโต๊ะ</label>
                    <select name='tableNumberType' value={formState.tableNumberType} onChange={handleChange}>
                        <option>เลือกหมายเลขโต๊ะ</option> 
                        <option>1</option>
                        <option >2</option>
                        <option >3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        </select></div> 
                        <div className='form-group-add'> 
                    <label htmlFor="tableType">รูปแบบโต๊ะ</label>
                    <select name="tableType"  value={formState.tableType} onChange={handleChange}>
                        <option>เลือกรหัสโต๊ะ</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        </select></div>
                    <div className='form-group-add'>
                    <label htmlFor="quantityOfChair">จำนวนที่นั่ง</label>
                        <select name='quantityOfChair'  value={formState.quantityOfChair} onChange={handleChange}>
                        <option>เลือกจำนวนที่นั่ง</option>
                        <option >1</option>
                        <option >2</option>
                        <option >3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        </select></div>
                    <div className='form-group-add'>
                    <label htmlFor="tableStatus">สถานะโต๊ะ</label>
                   <select name='tableStatus'  value={formState.tableStatus} onChange={handleChange}> 
                    <option value="Empty">Empty </option>
                    <option value="Reserved">Reserved</option>
                    </select></div>
                    {errors&&<div className='error'>{`Please include: ${errors}`}
                        </div>}
                  
                        <div className='align-btn-submit'>
                        <button
                            className='btn-cancel-admin'
                            onClick={() => closeModal(false)}
                            style={{ color: 'black', backgroundColor: '#EFEFEF' }}
                        >
                            ยกเลิก
                        </button>
                        <button className='btn-submit' onClick={handleSubmit}>
                            ยืนยันส่งข้อมูล
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addmanagebook;