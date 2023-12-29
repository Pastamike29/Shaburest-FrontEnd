import React, { useEffect, useState ,useRef } from 'react'
import './Queue.css'
import resmap from '../Compo/Assets/restshabumap.PNG'
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
import Modal from '../Compo/Modal/Bookdetail'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function Queue({ isLoggedIn }) {
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser');
   const [Pdate,setPdate]= useState();
   const [Qtimes, setQtimes] = useState('รอบ/เวลา');
  const [tabletype, setTabletype] = useState('รูปแบบโต๊ะ');
  const [peoplenum, setPeoplenum] = useState('จำนวนคน');
  const [tablenum, setTablenum] = useState('หมายเลขโต๊ะ');
  const [peoplenums, setPeoplenums] = useState([]);
  const [tablenums, setTablenums] = useState([]);
  const [color, setcolor] = useState({
    A1 : '',
    A2 : '',
    A3 : '', 
    A4 : '',
    A5 : '',
  B1 : '',
  C1 : '', C2 :'', C3 : '', C4 : '',
  D1  : '', D2  : '', D3  : '', D4  : '', D5  : '', 
  D6  : '', D7  : '', D8  : '', D9  : '', D10 : '', 
  D11 :'', D12 :'', D13 : '', D14 : '', D15 : ''
  });
  const resetColors = () => {
    const updatedColors = { ...color }; // Copy the current color state
    if (updatedColors.A1 === 'yellow') {
      updatedColors.A1 = ''; 
    }
    if (updatedColors.A2 === 'yellow') {
      updatedColors.A2 = ''; 
    } 
    if (updatedColors.A3 === 'yellow') {
      updatedColors.A3 = ''; 
    }
    if (updatedColors.A4 === 'yellow') {
      updatedColors.A4 = ''; 
    }
    if (updatedColors.A5 === 'yellow') {
      updatedColors.A5 = ''; 
    }
    if (updatedColors.B1 === 'yellow') {
      updatedColors.B1 = ''; 
    }
    if (updatedColors.C1 === 'yellow') {
      updatedColors.C1 = ''; 
    }
    if (updatedColors.C2 === 'yellow') {
      updatedColors.C2 = ''; 
    }
    if (updatedColors.C3 === 'yellow') {
      updatedColors.C3 = ''; 
    }
    if (updatedColors.C4 === 'yellow') {
      updatedColors.C4 = ''; 
    }
    if (updatedColors.D1 === 'yellow') {
      updatedColors.D1 = ''; 
    }
    if (updatedColors.D2 === 'yellow') {
      updatedColors.D2 = ''; 
    }
    if (updatedColors.D3 === 'yellow') {
      updatedColors.D3 = ''; 
    }
    if (updatedColors.D4 === 'yellow') {
      updatedColors.D4 = ''; 
    }
    if (updatedColors.D5 === 'yellow') {
      updatedColors.D5 = ''; 
    }
    if (updatedColors.D6 === 'yellow') {
      updatedColors.D6 = ''; 
    }
    if (updatedColors.D7 === 'yellow') {
      updatedColors.D7 = ''; 
    }
    if (updatedColors.D8 === 'yellow') {
      updatedColors.D8 = ''; 
    }
    if (updatedColors.D9 === 'yellow') {
      updatedColors.D9 = ''; 
    }
    if (updatedColors.D10 === 'yellow') {
      updatedColors.D10 = ''; 
    }
    if (updatedColors.D11 === 'yellow') {
      updatedColors.D11 = ''; 
    }
    if (updatedColors.D12 === 'yellow') {
      updatedColors.D12 = ''; 
    }
    if (updatedColors.D13 === 'yellow') {
      updatedColors.D13 = ''; 
    }
    if (updatedColors.D14 === 'yellow') {
      updatedColors.D14 = ''; 
    }
if (updatedColors.D15 === 'yellow') {
      updatedColors.D15 = ''; 
    }
    setcolor(updatedColors); 
  };
  
  useEffect(() => {
    if (Pdate && Qtimes) {
      const fetchReservationData = async () => {
        try {
          const response = await axios.get('http://localhost:2929/0/reserveData');
          if (response.status === 200) {
            const reservationData = response.data;
            
            // Filter reservation data based on selected date and time
            const filteredData = reservationData.filter(
              reservation => reservation.reserveDate === Pdate && reservation.reserveTime === Qtimes
            );
            
            // Reset colors to default (green) for all tables
            const updatedColors = { ...color };
            Object.keys(updatedColors).forEach(key => {
              updatedColors[key] = 'chartreuse';
            });
  
            // Update colors based on filtered reservation data
            filteredData.forEach(reservation => {
              const tableKey = `${reservation.tableTypes}${reservation.tableNumberType}`;
              if (updatedColors[tableKey]) {
                updatedColors[tableKey] = 'red'; // Set to red for reserved tables
              }
            });
  
            setcolor(updatedColors); // Update the color state with modified colors
            setIsDateTimeSelected(true); // Set the selection status as true
          } else {
            console.error('Error fetching reservation data. Status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching reservation data:', error);
        }
      };
  
      fetchReservationData();
    }
  }, [Pdate, Qtimes]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2929/0/user');
        if (response.status === 200) {
          const userData = response.data;
          const foundUser = userData.find((user) => user.username === loggedInUser);
          setCurrentUser(foundUser);
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, [loggedInUser]);
  useEffect(() => {
    if (currentUser) {
      const fetchHistoryData = async () => {
        try {
          const response = await axios.get('http://localhost:2929/0/reserveData');
          if (response.status === 200) {
            const userData = response.data;
            console.log(userData)
            const foundUser = userData.filter((user) => user.userId === currentUser.userId);
            setHistoryData(foundUser);
            console.log('Fetched history data:', foundUser);
          } else {
            console.error('Error fetching data. Status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchHistoryData();
    }
  }, [currentUser]);
  let navigate = useNavigate();
  const getTableStatus = (tableType, tableNumber) => {
    const isTableBooked = true; 
    if (isTableBooked) {
      return 'yellow'; // Table is selected
    }
  };
  var today = new Date();
  var mindate = today.setDate(today.getDate());
  var minValue = new Date(mindate).toISOString().split("T")[0];
  const numberOfDaysToAdd = 7;
  const maxdate = today.setDate(today.getDate() + numberOfDaysToAdd); 
  const maxValue = new Date(maxdate).toISOString().split('T')[0] 
  const todaytime = parseFloat(today.getHours()+(today.getMinutes()/100)+(today.getSeconds()/10000));
  const[openModal, setOpenModal] = useState(false);
 
  // console.log(Pdate)
  //  /*console.log("Pdate",Pdate)
  //  console.log(mindate);
  //  console.log("minV",minValue);
  //  console.log(maxdate);
  //  console.log(maxValue);
   
  //  console.log(todaytime);
  //    <select className= 'box-book' value={Tnumber} onChange={()=>{setColor('yellow')}}>
  // </select>
  //  */
   const toggleModal =() => {
    setOpenModal(!openModal)
   }
  const tables = [
    {
      type : "A",
      numbers : [
        {peoplenumber : "1",tablenumber : ["1","2","3","4","5"]},
        {peoplenumber : "2",tablenumber : ["1","2","3","4","5"]},
        {peoplenumber : "3",tablenumber : ["1","2","3","4","5"]},
        {peoplenumber : "4",tablenumber : ["1","2","3","4","5"]},]},
    {
      type : "B",
      numbers : [
        {peoplenumber : "1",tablenumber : ["1"]},
        {peoplenumber : "2",tablenumber : ["1"]},
        {peoplenumber : "3",tablenumber : ["1"]},
        {peoplenumber : "4",tablenumber : ["1"]},
        {peoplenumber : "5",tablenumber : ["1"]},
        {peoplenumber : "6",tablenumber : ["1"]},
        {peoplenumber : "7",tablenumber : ["1"]},
        {peoplenumber : "8",tablenumber : ["1"]},
        {peoplenumber : "9",tablenumber : ["1"]},
        {peoplenumber : "10",tablenumber : ["1"]},]},
    {
      type : "C",
      numbers : [
        {peoplenumber : "1",tablenumber : ["1","2","3","4"]},
        {peoplenumber : "2",tablenumber : ["1","2","3","4"]},]},
    {
      type : "D",
      numbers : [
        {peoplenumber : "1",tablenumber : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]}]
    }];
  
    var queueTime = [
      {Qtime : "11:00-13:00"},
      {Qtime : "13:30-15:30"},
      {Qtime : "16:00-18:00"},
      {Qtime : "18:30-20:30"},
      {Qtime : "21:00-23:00"}];

    if((minValue === Pdate)&&(todaytime >= 11.0000))
  {
    queueTime = [
      {Qtime : "13:30-15:30"},
      {Qtime : "16:00-18:00"},
      {Qtime : "18:30-20:30"},
      {Qtime : "21:00-23:00"}];
  }
  if((minValue === Pdate)&&(todaytime >= 13.3000))
  {
    queueTime = [
      {Qtime : "16:00-18:00"},
      {Qtime : "18:30-20:30"},
      {Qtime : "21:00-23:00"}];
  }
  if((minValue === Pdate)&&(todaytime >= 16.0000))
  {
    queueTime = [
      {Qtime : "18:30-20:30"},
      {Qtime : "21:00-23:00"}];
  }
  if((minValue === Pdate)&&(todaytime >= 18.3000))
  {
    queueTime = [
      {Qtime : "21:00-23:00"}];
  }
  if((minValue === Pdate)&&(todaytime >= 21.0000))
  {
    queueTime = [];
  }
  
  const changedate = (date) => {
    setIsDateTimeSelected(false); 
    setPdate(date.target.value); // Update the Pdate state with the selected date
    setqueueData({  // Update queuedata with the selected date
      ...queuedata,
      reserveDate: date.target.value 
       // Assuming 'reserveDate' is the property to hold the date
    });
    resetColors();
  };
  const changeType = (event) => {
    const selectedTabletype = event.target.value;
    setTabletype(event.target.value);
    const selectedTable = tables.find((ctr) => ctr.type === event.target.value);
    if (selectedTable) {
      setPeoplenums(selectedTable.numbers);
      setTabletype(selectedTabletype); // Update the state with the selected queue time
      setqueueData({  // Update queuedata with the selected queue time
        ...queuedata,
       tableTypes: selectedTabletype
      });
    }
    setPeoplenum('จำนวนคน');
    setTablenum('หมายเลขโต๊ะ');
    resetColors();
  };

  // Function to handle changing number of people
  const changePeople = (event) => {
    setPeoplenum(event.target.value);
    const selecteduserquantity = event.target.value;
    const selectedPeople = peoplenums.find(
      (ppnum) => ppnum.peoplenumber === event.target.value
    );
    if (selectedPeople) {
      setTablenums(selectedPeople.tablenumber);
      setPeoplenum(selecteduserquantity); // Update the state with the selected queue time
      setqueueData({  // Update queuedata with the selected queue time
        ...queuedata,
        valueOfCustomer: selecteduserquantity
      });
    }
    setTablenum('หมายเลขโต๊ะ');
    resetColors();
  };

  // Function to handle changing table number
  const changeTablenumber = (event) => {
    const selectedTablenunber = event.target.value;
    setTablenum(selectedTablenunber); // Update the state with the selected queue time
    setqueueData({  // Update queuedata with the selected queue time
      ...queuedata,
      tableNumberType: selectedTablenunber
    });
    resetColors();
  };

  // Function to handle changing queue time
  const changQueuetime = (event) => {
    setIsDateTimeSelected(false); 
    const selectedQueueTime = event.target.value;
    setQtimes(selectedQueueTime); // Update the state with the selected queue time
    setqueueData({  // Update queuedata with the selected queue time
      ...queuedata,
      reserveTime: selectedQueueTime
    });
    resetColors();
  };
  
   const Tnumber = tablenum+tabletype ;
   switch (Tnumber) {
    case "1A": color.A1 = getTableStatus('A', '1'); break;
    case "2A": color.A2 = getTableStatus('A', '2'); break;
    case "3A": color.A3 = getTableStatus('A', '2'); break;
    case "4A": color.A4 = getTableStatus('A', '3'); break;
    case "5A": color.A5 = getTableStatus('A', '4'); break;
    case "1B": color.B1 = getTableStatus('B', '1'); break;
    case "1C": color.C1 = getTableStatus('C', '1'); break;
    case "2C": color.C2 = getTableStatus('C', '2'); break;
    case "3C": color.C3 = getTableStatus('C', '3'); break;
    case "4C": color.C4 = getTableStatus('C', '4'); break;
    case "1D": color.D1 = getTableStatus('D', '1'); break;
    case "2D": color.D2 = getTableStatus('D', '2'); break;
    case "3D": color.D3 = getTableStatus('D', '3'); break;
    case "4D": color.D4 = getTableStatus('D', '4'); break;
    case "5D": color.D5 = getTableStatus('D', '5'); break;
    case "6D": color.D6 = getTableStatus('D', '6'); break;
    case "7D": color.D7 = getTableStatus('D', '7'); break;
    case "8D": color.D8 = getTableStatus('D', '8'); break;
    case "9D": color.D9 = getTableStatus('D', '9'); break;
    case "10D": color.D10 = getTableStatus('D', '10'); break;
    case "11D": color.D11 = getTableStatus('D', '11'); break;
    case "12D": color.D12 = getTableStatus('D', '12'); break;
    case "13D": color.D13 = getTableStatus('D', '13'); break;
    case "14D": color.D14 = getTableStatus('D', '14'); break;
    case "15D": color.D15 = getTableStatus('D', '15'); break;
    default:break;
   }
   console.log(Tnumber)
   
  const [queuedata, setqueueData] = useState(
    {
      userId:'',
      tableNumberType:null,
      reserveTime:"",
      reserveDate:"",
      reserveStatus:"Wait to Check",
      tableTypes:" ",
      valueOfCustomer: null
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLoggedIn) {
      alert('Please log in before making a reservation.');
      navigate('/login');
      return;
    } else if (
      Qtimes === 'รอบ/เวลา' ||
      tabletype === 'รูปแบบโต๊ะ' ||
      peoplenum === 'จำนวนคน' ||
      tablenum === 'หมายเลขโต๊ะ' ||
      Pdate === ''
    ) {
      // If any field is in its initial state, prevent form submission
      alert('Please select all options before submitting.');
      return;
    }
  
    const updatedQueueData = {
      ...queuedata,
      userId: currentUser.userId, // Assuming userId is stored in currentUser
    };
  
    // Check if the new booking is unique
    const isUnique = isBookingUnique(updatedQueueData);
  
    if (!isUnique) {
      alert('This booking already exists. Please choose a different time or table.');
      return; // Prevent further execution
    }
  
    try {
      const response = await axios.post('http://localhost:2929/0/reserveData', updatedQueueData);
      console.log('Reserved successfully!', response.data);
      localStorage.setItem('reserveDataId', response.data.reserveDataId);
      toggleModal();
      // Further logic upon successful registration
    } catch (error) {
      console.error('Reservation failed!', error);
      // Handle error states, e.g., display an error message to the user
    }
  };
  
  const isBookingUnique = (newBooking) => {
    // Logic to check uniqueness based on specific criteria
    const exists = historyData.some((booking) => checkIfBookingExists(booking, newBooking));
    return !exists;
  };
  
  const checkIfBookingExists = (existingBooking, newBooking) => {
    // Comparison logic for determining if a booking already exists
    return (
      existingBooking.reserveDate === newBooking.reserveDate &&
      existingBooking.reserveTime === newBooking.reserveTime &&
      existingBooking.tableTypes === newBooking.tableTypes &&
      existingBooking.tableNumberType === newBooking.tableNumberType
    );
  };
  
  const resetSelection = () => {
   resetDate()
    setQtimes('รอบ/เวลา');
    setTabletype('รูปแบบโต๊ะ');
    setPeoplenum('จำนวนคน');
    setTablenum('หมายเลขโต๊ะ');
  };
  
  const dateInputRef = useRef(null);

  // Function to reset the selected date
  const resetDate = () => {
    dateInputRef.current.value = ''; // Resetting the input value to empty
    setPdate(''); // Resetting the state value for the date
  };
  return (<><Helmet>
    <title>
      Book table
    </title>
  </Helmet>
  <div className='book-menu'>
    <h1>BOOK TABLE <hr /></h1>
    <form className='form-booktable' onSubmit={handleFormSubmit}>
      <div className='booktable-contain'>
      <span>วันที่</span>
      <input
  type="date"
  ref={dateInputRef}
  onChange={changedate}
  min={minValue}
  max={maxValue}
/>
<select className="queuetime" value={Qtimes} onChange={changQueuetime} required>
  <option>--Select time--</option>
  {queueTime.map(QT => (
    <option key={QT.Qtime} value={QT.Qtime}>{QT.Qtime}</option>
  ))}
</select>


<span>รูปแบบโต๊ะ</span>
<select name="tableType" className="table_all" value={tabletype} onChange={changeType}>
  <option>--เลือกรูปแบบโต๊ะ--</option>
  {tables.map(ctr => (
    <option value={ctr.type}>{ctr.type}</option>
  ))}
</select></div>
<div className='booktable-contain'>
<span>จำนวนคน</span>
<select classname="table_all" value={peoplenum} onChange={changePeople}>
    <option>--จำนวนคน--</option>
    {peoplenums.map(ppnum => (
      <option value={ppnum.peoplenumber}>{ppnum.peoplenumber}</option>
    ))}
</select>
    <span>หมายเลขโต๊ะ</span>
    
<select className= "table_all" value={tablenum} onChange={changeTablenumber}>
<option>--เลือกหมายเลขโต๊ะ--</option>
  {tablenums.map(Tnum => (
    <option value={Tnum}>{Tnum}</option>
  ))}

</select> 
</div>


  </form>
  <div className='booktable-butt'>
  <button className='can-butt'onClick={resetSelection}>รีเซ็ตจอง</button>
  <button className='book-butt' onClick={handleFormSubmit}disabled={!isDateTimeSelected}>กดจอง</button></div></div> 
  {openModal && <Modal closeModal={setOpenModal}/>  }
  <div className='map-booktable'>
  <div className='map-content'>
<div className='left-map-book'>
  <h3 style={{backgroundColor:'#ea7521'}}>แผนผังร้าน</h3>
    <img src={resmap} alt="" className='resmap-img' />
    </div>
    <div className='right-map-book'>
    <h3 style={{backgroundColor:'#ea7521'}}>สถานะโต๊ะ</h3>
      <div style={{textAlign:'left'}}><Link to='/pdf' >คู่มือการจอง</Link></div>
      <div className='box-contain'>
      <div className='box-book' style={{backgroundColor:color.A1}}>1A</div>
      <div className='box-book' style={{backgroundColor:color.A2}}>2A</div>
      <div className='box-book' style={{backgroundColor:color.A3}}>3A</div>
      <div className='box-book' style={{backgroundColor:color.A4}}>4A</div>
      <div className='box-book' style={{backgroundColor:color.A5}}>5A</div></div>
      <div className='box-contain'>
      <div className='box-book' style={{backgroundColor:color.B1}}>1B</div>
      <div className='box-book' style={{backgroundColor:color.C1}}>1C</div>
      <div className='box-book' style={{backgroundColor:color.C2}}>2C</div>
      <div className='box-book' style={{backgroundColor:color.C3}}>3C</div>
      <div className='box-book' style={{backgroundColor:color.C4}}>4C</div></div>
      <div className='box-contain'>
      <div className='box-book' style={{backgroundColor:color.D1}}>1D</div>
      <div className='box-book' style={{backgroundColor:color.D2}}>2D</div>
      <div className='box-book' style={{backgroundColor:color.D3}}>3D</div>
      <div className='box-book' style={{backgroundColor:color.D4}}>4D</div>
      <div className='box-book' style={{backgroundColor:color.D5}}>5D</div></div>
      <div className='box-contain'>
      <div className='box-book' style={{backgroundColor:color.D6}}>6D</div>
      <div className='box-book' style={{backgroundColor:color.D7}}>7D</div>
      <div className='box-book' style={{backgroundColor:color.D8}}>8D</div>
      <div className='box-book' style={{backgroundColor:color.D9}}>9D</div>
      <div className='box-book' style={{backgroundColor:color.D10}}>10D</div></div>
      <div className='box-contain'>
      <div className='box-book' style={{backgroundColor:color.D11}}>11D</div>
      <div className='box-book' style={{backgroundColor:color.D12}}>12D</div>
      <div className='box-book' style={{backgroundColor:color.D13}}>13D</div>
      <div className='box-book' style={{backgroundColor:color.D14}}>14D</div>
      <div className='box-book' style={{backgroundColor:color.D15}}>15D</div></div>
      <div className='dot-state'>
        <span className='dot-green'></span>
        <p>โต๊ะว่าง</p>
        <span className='dot-red'></span>
        <p>โต๊ะจองแล้ว</p>
        <span className='dot-yellow'></span>
        <p>โต๊ะที่คุณเลือก</p>
      </div>
    </div></div>
  </div>
  <div>
  <h3> รายการประวัติการจอง </h3></div>
  <div class="info-book">
      <div class="grid-head">
        <span>ครั้งที่</span>
        <span>วันที่</span>
        <span>เวลา/รอบ</span>
        <span>รูปแบบโต๊ะ</span>
        <span>หมายเลขโต๊ะ</span>
        <span>สถานะการจอง</span>
      </div>
      {
  historyData.map((data, index) => (
    <div key={index} className="grid-data">
      {/* Display each piece of data */}
      <span>{index+1}</span>
      <span>{data.reserveDate}</span>
      <span>{data.reserveTime}</span>
      <span>{data.tableTypes}</span>
      <span>{data.tableNumberType}</span>
      <span>{data.reserveStatus}</span>
    </div>
  ))
}
    </div>
  </>
  
  )
}

export default Queue