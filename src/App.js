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
import DetailsDash from '../src/Faculty/DetailsDash';
function App() {
  return (
        <div className="app-wrapper">
      {/* ✅ Global blurred background */}
      <div className="global-bg"></div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/OtpPage" element={<OtpPage/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/FacultyDash" element={<FacultyDash/>}/>
        <Route path="/SDetailsDash" element={<SDetailsDash/>}/>
        <Route path="/SubjectDash" element={<SubjectDash/>}/>
        <Route path="/DetailsDash" element={<DetailsDash/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/CertificateView" element={<CertificateView/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
