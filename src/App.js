import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/Alerts/AlertState";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useState } from "react";

function App() {
  const [alert,setAlert]= useState(null);
  const showAlert =(type,msg)=>{
    setAlert({
      type:type,
      msg:msg
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <NavBar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path='/login' element={<Login />}/>
              <Route path='/signup' element={<Signup />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
