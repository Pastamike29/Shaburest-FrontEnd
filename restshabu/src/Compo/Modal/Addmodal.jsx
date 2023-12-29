import React,{useState} from 'react'
import './Addmodal.css'

function Addmodal({closeModal,onSubmit,defaultValue}) {
    var today = new Date();
    var mindate = today.setDate(today.getDate());
    var minValue = new Date(mindate).toISOString().split("T")[0];
    const numberOfDaysToAdd = 7;
    const maxdate = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const maxValue = new Date(maxdate).toISOString().split('T')[0] 
    const [formState,setFormState] = useState (
        defaultValue ||{
            reserveDataId:"",paymentId:"",username:"",
            reserveDate:{minValue},reserveTime:"",tableTypes: "" 
        ,tableNumberType:"",valueOfCustomer:"",reserveStatus:"Wait to check"});
        const [errors,setErrors] = useState("")
     const validateForm = () => {
        if(formState.reserveDate&&formState.username&&formState.reserveDataId&&formState.valueOfCustomer&&formState.reserveStatus&&formState.tableNumberType&&formState.tableTypes&&formState.reserveTime&&formState.paymentId)
        {   setErrors("")
            return true;
     }else{
        let errorFields = [];
        for(const [key,value] of Object.entries(formState)){
            if(!value){
                errorFields.push(key);
            }
        }
        setErrors(errorFields.join(", "));
        return false;
     }
    };
    const handleChange = (e) =>{
        setFormState({ ...formState,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!validateForm()) return;
        onSubmit(formState)
        closeModal();
    };
    
  return (
    <div className='admin-modal-contain'>
        <div className='admin-modal'>
            <form>
                 <div className='form-group-add'>
                    <label htmlFor="reserveDataId">รหัสการจอง</label>
                    <input placeholder='รหัสการจอง' name='reserveDataId' type='text'  value={formState.reserveDataId} onChange={handleChange} /></div>
                    <div className='form-group-add'>
                    <label htmlFor="PayID">รหัสชำระเงิน</label>
                    <input placeholder='รหัสการจอง' name='paymentId' type='text'  value={formState.paymentId} onChange={handleChange} /></div>
                <div className='form-group-add'>
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <input  placeholder="ชื่อผู้ใช้"name='username' type="text" value={formState.username} onChange={handleChange} /></div>
                   
                    <div className='form-group-add'>
                    <label htmlFor="reserveDate">วันที่</label>
                    <input name ='reserveDate' type='date' value={formState.reserveDate} onChange={handleChange}  min={minValue} max={maxValue}/></div>
                    <div className='form-group-add'>
                    <label htmlFor="reserveTime">เวลา/รอบ</label>
                    <select name="reserveTime"  value={formState.reserveTime} onChange={handleChange}>
                        <option>เลือกรอบ/เวลา</option>
                        <option >11:00-13:00</option>
                        <option >13:30-15:30</option>
                        <option >16:00-18:00</option>
                        <option>18:30-20:30</option>
                        <option>21:00-23:00</option>
                        </select></div>
                    <div className='form-group-add'>
                    <label htmlFor="tableTypes">รูปแบบโต๊ะ</label>
                    <select name="tableTypes"  value={formState.tableTypes} onChange={handleChange}>
                        <option>เลือกรูปแบบโต๊ะ</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        </select></div>
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
                    <label htmlFor="people">จำนวนคน</label>
                        <select name='valueOfCustomer'  value={formState.valueOfCustomer} onChange={handleChange}>
                        <option>เลือกจำนวนคน</option>
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
                    <label htmlFor="reserveStatus">สถานะการจอง</label>
                   <select name='reserveStatus'  value={formState.reserveStatus} onChange={handleChange}>
                    <option value="Complete">Complete</option>
                    <option value="Wait to check">Wait to check </option>
                    <option value="Cancel">Cancel </option>
                    </select></div>
                    {errors&&<div className='error'>{`Please include: ${errors}`}
                        </div>}
                    <div className='align-btn-submit'>  
                    <button  className='btn-cancel-admin' onClick={()=>closeModal(false)} style={{color:'black',backgroundColor:'#EFEFEF'}}>ยกเลิก</button>
                    <button className='btn-submit' onClick={handleSubmit}>ยืนยันส่งข้อมูล</button> </div>
            </form>
        </div>
        </div>
  )
}

export default Addmodal