import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../src/Login/Login";
import Signup from '../src/Login/Signup';
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
