import './App.css'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Room from './components/pages/Room';
import Admin from './components/pages/Admin';
import Booking from './components/pages/Booking';
import AddRoom from './components/pages/AddRoom';
import EditRoom from './components/pages/EditRoom';

function App() {

  return (
    <main>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/rooms' element={<Room/>}/>
          <Route path='/add/room' element={<AddRoom/>}/>
          <Route path='/edit/:roomId' element={<EditRoom/>}/>
          <Route path='/bookings' element={<Booking/>}/>
        </Routes>
        <Footer/>
      </Router>
    </main>
  )
}

export default App
