
import { Link } from "react-router-dom";
import './style.css';
export default function NavBar(){
    return (
      <div class="cont">
        <nav class="navbar navbar-expand-lg bg-body-tertiary nav-bar">
  <div class="container-fluid">
    <Link className="navbar-brand" to="/">DFS</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link className="nav-link active"  to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/adddemand">Demand</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/addmember">Member</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/valid">Assign</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
    );
}