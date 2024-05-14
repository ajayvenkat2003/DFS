
import { useState } from "react";
import NavBar from "../Navbar/Navbar";
import axios from "axios";
import { Modal } from "react-bootstrap";
import './style.css';
import { useNavigate } from "react-router-dom";
export default function ValidMembers(){
    const [id,setId]=useState(null);
    const [level,setLevel]=useState(null);
    const [city,setCity]=useState(false);
    const [skill,setSkills]=useState(null);
    const [exp,setExp]=useState(null);
    const [validMems,setValidMembers] = useState([]);
    const [show,setShow]=useState(false);
    const navigate=useNavigate();
    const [dCity,setDCity]=useState(null);
    const [dManager,setDManager]=useState(null);
    const [dName,setDName]=useState(null);
    const [Dshow,setDShow]=useState(false);
    const [validDems,setValidDems]=useState([]);
    axios.defaults.withCredentials=true;
    
    
    async function validMembers(){
      try{
      let p=await axios.post("http://localhost:8080/project/validmembers",{projectId:id,level:level,city:city,skills:skill,exp:exp,status:null});
     setValidMembers([...p.data]);
     console.log(p.data);
      }
      catch(exception){
        setValidMembers([]);}
    }
    async function assignMembers(){
      try{
      let p=await axios.post("http://localhost:8080/project/assign",{projectId:id,level:level,city:city,skills:skill,exp:exp,status:null});
        
      }
      catch(exception){
        if(exception.status===403)
          navigate('/login');
        alert('assigned already!!!');
        }
    }

    async function validDemands(){
      try{
        let p=await axios.post("http://localhost:8080/project/getdemand",{city:dCity,manager:dManager,name:dName});
          setValidDems([...p.data]);
        }
        catch(exception){
          setValidDems([]);
          if(exception.status===403)
            navigate('/login');
          alert('assigned already!!!');
          }
    }
    return(
        <div >
          <NavBar/>
          <div class="container">
            <div class="card">
            <form class="container form-own ">
  <div class="form-group">
    
    <input type="text" class="form-control "  placeholder="Project Id" value={id} onChange={(e)=>setId(e.target.value)}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Level</label>
    <input type="checkbox"class="form-check-label" placeholder="Level" onClick={(e)=>{setLevel(e.target.checked?true:null);}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">City</label>
    <input type="checkbox" class="form-check-label"  placeholder="City"onChange={(e)=>{setCity(e.target.checked?true:null)}}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Skills</label>
    <input type="checkbox" class="form-check-label "  placeholder="Skills" value={skill} onChange={(e)=>setSkills(e.target.checked?true:null)}/>
  </div>
  <div class="form-group">
    
    <input type="number" class="form-control"  placeholder="Experience" value={exp} onChange={(e)=>setExp(e.target.value)}/>
  </div>
  <button class="btn btn-success find-btn"  onClick={(e)=>{e.preventDefault();validMembers();setShow(true);}}>Find</button>
  </form>

  <form class="container form-own  ">
  
  <div class="form-group">
    
    <input type="text" class="form-check-label"  placeholder="City"onChange={(e)=>{setDCity(e.target.value)}}/>
  </div>
  <div class="form-group">
    
    <input type="text" class="form-check-label "  placeholder="Manager" value={skill} onChange={(e)=>setDManager(e.target.value)}/>
  </div>
  <div class="form-group">
    
    <input type="text" class="form-control"  placeholder="Name" value={exp} onChange={(e)=>setDName(e.target.value)}/>
  </div>
  <button class="btn btn-success find-btn"  onClick={(e)=>{e.preventDefault();validDemands();setDShow(true);}}>Find</button>
  </form>
  </div>
  </div>
  <Modal show={show} onHide={()=>setShow(false)}  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
 
  <Modal.Header closeButton>
        <Modal.Title  id="exampleModalLongTitle">Valid Members</Modal.Title>
       
      </Modal.Header>
      <Modal.Body >
            <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Location</th>
                    <th scope="col">status</th>
                    <th scope="col">Experience</th>
                    <th scope="col">level</th>
                    <th scope="col">skills</th>
                </tr>
            </thead>
            <tbody>
            {
                validMems.map((member,index)=>{
                    return <tr>
            <td >{member.employeeId}</td>
            <td >{member.firstName}</td>
            <td >{member.lastName}</td>
            <td >{member.location}</td>
            <td >{member.status?"Not Available":"Available"}</td>
            <td >{member.experience}</td>
            <td >{member.level}</td>
            <td>{Object.keys(member.skills).map((element)=><span>{element},</span>)}</td>
            </tr>
                })}
                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
          
            {validMems.length>0?<button class="btn btn-primary" onClick={()=>{assignMembers();setShow(false);}}>Assign</button>:null}
                
            </Modal.Footer>
            </Modal>

<Modal show={Dshow} onHide={()=>setDShow(false)}  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
 
  <Modal.Header closeButton>
        <Modal.Title  id="exampleModalLongTitle">Valid Members</Modal.Title>
       
      </Modal.Header>
      <Modal.Body >
            <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Level</th>
                    <th scope="col">City</th>
                    <th scope="col">Manager</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                validDems.map((member,index)=>{
                    return <tr>
            <td >{member.pid}</td>
            <td >{member.pname}</td>
            <td >{member.level}</td>
            <td >{member.city}</td>
           
            <td >{member.managerName}</td>
            
            </tr>
                })}
                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
          
            
                
            </Modal.Footer>
            </Modal>



           


        </div>



      
    );
}