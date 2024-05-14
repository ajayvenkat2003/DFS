import { useState } from "react";
import NavBar from "../Navbar/Navbar";
import axios from "axios";
import './style.css';
import { useNavigate } from "react-router-dom";
export default function Demand(){
    const [name,setName]=useState('');
    const [level,setLevel]=useState('');
    const [city,setCity]=useState('');
    const [manager,setManager]=useState('');
    const [duration,setDuration]=useState(0);
    const [date,setDate]=useState(null);
    const navigate=useNavigate();
    let formSubmit=async()=>{
        console.log("called");
        try{
        let p=await axios.post("http://localhost:8080/project/adddemand",{date:date,pname:name,level:level,city:city,managerName:manager,duration:duration});
        alert("successfully added");}
        catch(exception){
          if(exception.response.status===403)
              navigate('/login');
        }
    }
    return (
        <div>
            <NavBar />
            <form class="container container-own">
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control"  placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">level</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="level" value={level} onChange={(e)=>setLevel(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">city</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Manager</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="manager" value={manager} onChange={(e)=>setManager(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">duraion</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="duration" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">date</label>
    <input type="date" class="form-control" id="exampleInputPassword1"  value={date} onChange={(e)=>setDate(e.target.value)}/>
  </div>
  
  <button onClick={()=>formSubmit()} class="btn btn-primary submit-btn">Add</button>
</form>

        </div>
    );
}