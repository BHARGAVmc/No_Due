// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../src/Login/Login";
import Signup from '../src/Login/Signup';
import OtpPage from '../src/Login/Forgot/OtpPage';
import ResetPassword from '../src/Login/Forgot/ResetPassword';
// import { EmailProvider } from './Login/Forgot/EmailContext';
import FacultyDash from '../src/Faculty/FacultyDash';
import SubjectDash from '../src/Student/SubjectDash';
import CertificateView from '../src/Faculty/CertificateView';
import SDetailsDash from '../src/Student/SDetailsDash';
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/OtpPage" element={<OtpPage/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/FacultyDash" element={<FacultyDash/>}/>
        <Route path="/SubjectDash" element={<SubjectDash/>}/>
        <Route path="/SDetailsDash" element={<SDetailsDash/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/CertificateView" element={<CertificateView/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
