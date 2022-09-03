import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/main/Footer";
import Login from "./components/user/Login";
import RegisterHere from "./components/user/Register";
import Home from "./components/main/Home";
import Friends from "./components/friends/Friends"
import Jobs from "./components/jobs/Jobs";
import TechCompanies from "./components/techcompanies/Companies";
import Events from "./components/events/Events";
import TestAjax from "./components/main/TestAjax"
import UnknownUser from "./components/main/UnknownUser";
import { useState } from "react"
import { Link } from "react-router-dom"
import CreateFriend from "./components/friends/CreateFriend";
import Person from "./components/friends/Person";
import SingleCar from "./components/codeChallenge/SingleCar"
import Cars from "./components/codeChallenge/Cars"




function App() {




  const navStyle = {
    textColor: "#FFC0CB",
    backgroundColor: "#FFF0F5",
    padding: "15px",
    textDecoration: "none",
    borderRadius: "20px"
  }



  const [user, setUser] = useState(
    {
      firstName: "Unknown",
      lastName: "User",
      isLoggedIn: false,
      avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
    })



  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md "
        aria-label="Fourth navbar example"
      >
        <div className="container" style={navStyle} >
          <Link className="navbar-brand" to="/">
            <img
              src="https:///images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="bio"/>
          </Link>
          <Link
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
            to="/">
            <span className="navbar-toggler-icon"></span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0" >
              <li className="nav-item" >
                <Link to="/" className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Friends" className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Jobs"
                  className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Companies"
                  className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Events"
                  className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/testandajaxcall"
                  className="nav-link link-button" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>
                  Test and Ajax Call
                </Link>
              </li>
            </ul>


            <div className="text-end">
              <Link to="/UnknownUser"
                className="align-items-center mb-2 me-2 mb-lg-0" style={{ color: "rgb(252 68 161)", textDecoration: "none", }}>

                <img src={user.avatarURL} style={{ width: "55px", height: "55px", borderRadius: "8px" }} alt="" />
                <span>  {user.firstName} {user.lastName}</span>
              </Link>


              <Link to="/Login"
                className="btn btn-outline-light me-2" style={{ color: "rgb(246 96 172)", textDecoration: "none", border: "10px", backgroundColor: "white", fontWeight: "bold", borderRadius: "15px" }}>
                Login
              </Link>
              <Link to="/Register"
                className="btn btn-outline-light me-2" style={{ color: "rgb(246 96 172)", textDecoration: "none", backgroundColor: "white", fontWeight: "bold", borderRadius: "15px" }}>
                Register
              </Link>

              <Link to="/Cars"
                className="btn btn-outline-light me-2" style={{ color: "rgb(246 96 172)", textDecoration: "none", border: "10px", backgroundColor: "white", fontWeight: "bold", borderRadius: "15px" }}>
                Cars
              </Link>
            </div>
          </div>
        </div>
      </nav>



      <div className="container">

        <Routes>
          <Route path="/" element={<Home currentUser={user} />} ></Route>
          <Route path="/Friends/" element={<Friends />}>
            <Route path=":id" element={<Person />}></Route>
          </Route>
          <Route path="/CreateFriend" element={<CreateFriend />}></Route>
          <Route path="/Cars" element={<Cars />}>
            <Route path="/Cars/SingleCar" element={<SingleCar />}></Route>
          </Route>

          <Route path="/Login" element={<Login setUser={setUser} />}></Route>
          <Route path="/Register" element={<RegisterHere />}></Route>
          <Route path="/Jobs" element={<Jobs />}></Route>
          <Route path="/Companies" element={<TechCompanies />}></Route>
          <Route path="/Events" element={<Events />} ></Route>
          <Route path="/UnknownUser" element={<UnknownUser />}></Route>
          <Route path="/TestAjax" element={<TestAjax />}></Route>
        </Routes>

      </div>

      <Footer></Footer>



    </React.Fragment >
  );
}

export default App;
