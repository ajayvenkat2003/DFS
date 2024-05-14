import React, { useState } from "react";
import ApiService from "./Services/ApiService";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import HomePage from "./components/Home/Home";
import Demand from "./components/AddDemand/AddDemand";
import Member from "./components/AddMember/AddMember";
import ValidMembers from "./components/Assignment/memberassign";
import Login from "./components/login/login";
export default function App(){
  
  return <div>
      
      <Router>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/adddemand" element={<Demand />} />
            <Route exact path="/addmember" element={<Member />} />
            <Route exact path="/valid" element={<ValidMembers />} />
            <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
  </div>
}