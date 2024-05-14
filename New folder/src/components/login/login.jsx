import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login(){
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    axios.defaults.withCredentials=true;
    async function login(){
     
      try{
        
      const res= await axios.get("http://localhost:8080/project/login?name="+name+"&password="+password );
      
      console.log("logged in...");
      navigate('/');
      }
      catch(exception){
        console.log(exception);
        alert("enter the valid credentials...");
        navigate("/login");
      }
    }
    const navigate=useNavigate();
    
    return(
        <div class="container-login container">
  <div class="card-login">
    <h2>Login</h2>
    <form>
      <input type="text" id="username" name="username" placeholder="Username" required  value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="password" id="password" name="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={(e)=>{e.preventDefault();login();}} >Login</button>
    </form>
  
</div>
</div>
    );
}