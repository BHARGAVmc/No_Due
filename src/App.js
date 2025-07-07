import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDetailsForm from "./StudentDetailsForm";
import SDetailsDash from "./SDetailsDash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDetailsForm />} />
        <Route path="/sdetailsdash" element={<SDetailsDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

