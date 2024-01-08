import './App.css'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Room from './components/pages/Room';

function App() {

  return (
    <main>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<Room/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </Router>
    </main>
  )
}

export default App
