import './App.css'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Room from './components/pages/Room';
import Admin from './components/pages/Admin';
import AddRoom from './components/pages/AddRoom';
import EditRoom from './components/pages/EditRoom';
import BookingRoom from './components/pages/BookingRoom';
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';
import LoginAdmin from './components/pages/admin/LoginAdmin';
import Booked from './components/pages/Booked';
import RoomBooked from './components/pages/room/RoomBooked';
import BookedAdmin from './components/pages/booked-admin/BookedAdmin';
import ReceiptAdmin from './components/pages/recept/ReceiptAdmin';
import ReceiptCompleteAdmin from './components/pages/recept/ReceiptCompleteAdmin';
import Report from './components/pages/booked-admin/Report';

function App() {

  return (
    <main>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<Room/>}/>

          {/* Booking */}
          <Route path='/bookeds' element={<Booked/>}/>
          <Route path='/booking/:roomId' element={<BookingRoom/>}/>
          <Route path='/booked/room/:roomId' element={<RoomBooked/>}/>

          {/* user */}
          <Route path='/login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/> 

          {/* admin */}
          <Route path='/admin/room' element={<Admin/>}/>
          <Route path='/add/room' element={<AddRoom/>}/>
          <Route path='/edit/:roomId' element={<EditRoom/>}/>
          <Route path='/login/admin' element={<LoginAdmin/>}/> 
          <Route path='/admin/booked' element={<BookedAdmin/>}/> 
          <Route path='/admin/receipt' element={<ReceiptAdmin/>}/> 
          <Route path='/admin/receipt-completed' element={<ReceiptCompleteAdmin/>}/> 
          <Route path='/admin/report' element={<Report/>}/> 


        </Routes>
        <Footer/>
      </Router>
    </main>
  )
}

export default App
