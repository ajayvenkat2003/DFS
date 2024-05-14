import axios from "axios";
import NavBar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage (){
    const navigate=useNavigate();
    const [demands,setDemands]=useState([]);
    const [members,setMembers]=useState([]);
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        getAllDemands();
        getAllMembers();
    },[]);
    let getAllDemands=async ()=>{
        try{
        let demans=await axios.get("http://localhost:8080/project/alldemands");
        console.log(demans.status);
        
        setDemands([...demans.data]);}
        catch(exception){
            navigate('/login');
            console.log("server error...");
        }
        console.log(demands);
    }
    let getAllMembers=async ()=>{
        try{
        let mems=await axios.get("http://localhost:8080/project/allmembers");
        
        setMembers([...mems.data]);}
        catch(exception){
            navigate('/login');
            console.log(exception);
        }
        console.log(members);
    }

    function getSkills(skills){
        let skill="";
        if(skills)
        Object.keys(skills).forEach((element)=>{skill=skill+element+","});
        return skill;
    }
    return (
        <div>
            <NavBar />
            <div class="container">
            <div class="h1">Demands</div>
            <table class="table table-striped container shadow">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">level</th>
                    <th scope="col">city</th>
                    <th scope="col">status</th>
                    <th scope="col">duration</th>
                    <th scope="col">Manager</th>
                    <th scope="col">skills</th>
                </tr>
            </thead>
            <tbody>
            {
                demands.map((demand,index)=>{
                    return <tr>
            <td >{demand.pid}</td>
            <td >{demand.pname}</td>
            <td >{demand.level}</td>
            <td >{demand.city}</td>
            <td >{demand.status}</td>
            <td >{demand.duration}</td>
            <td >{demand.managerName}</td>
            <td >{demand.skills}</td>
            </tr>
                })}
                </tbody>
            </table>



            <div class="h1">Members</div>
            <table class="table table-striped container shadow">
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
                members.map((member,index)=>{
                    return <tr>
            <td >{member.employeeId}</td>
            <td >{member.firstName}</td>
            <td >{member.lastName}</td>
            <td >{member.location}</td>
            <td >{member.status?"Not Available":"Available"}</td>
            <td >{member.experience}</td>
            <td >{member.level}</td>
            <td >{getSkills(member.skills)}</td>
            </tr>
                })}
                </tbody>
            </table>
            </div>
        </div>
    );
}