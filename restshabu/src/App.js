import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Queue from './Pages/Queue';
import Question from './Pages/Question';
import Ingredients from './Pages/Ingredients';
import Signup from './Pages/Signup';
import Shopcategory from './Pages/Shopcategory';
import Payment from './Pages/Payment';
import Admin from './Pages/Admin';
import Adminmanagebook from './Pages/Adminmanagebook';
import Adminmanagetable from './Pages/Adminmanagetable';
import Adminmanagecustomer from './Pages/Adminmanagecustomer';
import Adminmanagepayment from './Pages/Adminmanagepayment';
import Error from './Pages/Error';
import Navbar from './Compo/Navbar/Navbar';
import Footer from './Compo/Footer/Footer';
import Userdetail from './Pages/Userdetail';
import PdfViewer from './Pages/PdfViewer';
import pdffile from './Compo/Assets/userdocument.pdf'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Store logout status in localStorage
  };

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
      <Route path= '/shabuingredient' element ={<Shopcategory desthai='วัตถุดิบชาบู' deseng = 'Shabu Ingredient' category='shabumenu'/>}/>
      <Route path= '/soup' element ={<Shopcategory desthai='น้ำซุป' deseng = 'Soup' category='soup'/>}/>
      <Route path= '/snack&dessert' element ={<Shopcategory desthai='อาหารว่าง และของหวาน' deseng = 'Appetizer & sweet' category='emptity'/>}/>
      <Route path= '/sauce' element ={<Shopcategory desthai='เมนูน้ำจิ้ม' deseng = 'Sauce' category='sauce'/>}/>
      <Route path= '/drink' element ={<Shopcategory desthai='เครื่องดื่ม' deseng ='Drink' category='drink'/>}/>
     <Route path='/' element={<Home/>}/>
     <Route path='/ingredient' element={<Ingredients/>}/>
     <Route path='/payment' element={<Payment/>}/>
     <Route path='/question' element={<Question/>}/>
     <Route path='/queue' element={<Queue isLoggedIn={isLoggedIn}/>}/>
     <Route path='/login' element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
     <Route path='/signup' element={<Signup/>}/>
     {/* <Route path='/admin' element={<Admin/>}/> */}
     <Route path='/adminmanagebook' element={<Adminmanagebook/>}/>
     <Route path='/adminmanagetable' element={<Adminmanagetable/>}/>
     <Route path='/adminmanagepayment' element={<Adminmanagepayment/>}/>
     <Route path='/adminmanagecustomer' element={<Adminmanagecustomer/>}/>
     <Route path='/userdetail' element={<Userdetail/>}/>
     <Route path='*' element={<Error/>}/>
     <Route path="/pdf" element={<PdfViewer pdfPath={pdffile} />} />
     </Routes>
     <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
