import NavBar from "../Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import './style.css';
import { useNavigate } from "react-router-dom";

const today=new Date();
export default function Member(){
    const [firstname,setFirstName]=useState('');
    const [id,setId]=useState('');
    const [lastname,setLastName]=useState('');
    const [level,setLevel]=useState('');
    const [city,setCity]=useState('');
    const [exp,setExp]=useState(0);
    const [date,setDate]=useState(today.getFullYear()+"-"+((today.getMonth()<9)?"0"+(today.getMonth()+1):(today.getMonth()+1))+"-"+((today.getDate()<10)?"0"+today.getDate():today.getDate()));
    const [skill,setSkill]=useState('');
    const navigate = useNavigate();
    let formSubmit=async(e)=>{
        e.preventDefault();
        let skills={};
        let sarray=skill.split(",");
        sarray.forEach(element => {
          skills[element.split("-")[0]]=parseInt(element.split("-")[1])
        });
        try{
        let p=await axios.post("http://localhost:8080/project/addmember",{firstName:firstname,level:level,location:city,lastName:lastname,experience:exp,employeeId:id,dob:date,skills:skills});
        alert("successfully added");}
        catch(exception){
          console.log(exception.response.status);
          if(exception.response.status===403)
              navigate('/login');
        }
        
    }
    return (
        <div >
            <NavBar />
            <form class="container container-own" >
            <div style={{overflowY:"scroll",height:"80vh"}}>
  <div class="form-group ">
    <label for="exampleInputEmail1">First Name</label>
    <input type="text" class="form-control"  placeholder="Fisrt Name" value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Last Name</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last Name" value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">city</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Id</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="id" value={id} onChange={(e)=>setId(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">level</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="level" value={level} onChange={(e)=>setLevel(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">experience</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="experience" value={exp} onChange={(e)=>setExp(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">skills</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="skills" value={skill} onChange={(e)=>setSkill(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">date of joining</label>
    <input type="date" class="form-control"  value={date} onChange={(e)=>setDate(e.target.value)}/>
  </div>
  </div>
  <button onClick={(e)=>formSubmit(e)} class="btn btn-primary submit-btn">Add</button>
</form>

        </div>
    );
}