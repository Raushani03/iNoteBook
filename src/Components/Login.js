import React, { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/AlertContext';

const Login = (props) => {
  const context = useContext(alertContext);
  const {showAlert} = context
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();
  const host = "http://localhost:3000"
  const handleSubmit = async (e) => {
    const myHeaders = {
      'Content-Type': 'application/json',
    }
    const url = `${host}/api/auth/login`
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value }),
    });
    const json = await response.json()
    console.log("json from login", json)
    if (json.success) {
      // save the auth token to lcal storage and redirect 
      localStorage.setItem('token', json.authToken)
      showAlert("success","Logged In Successfully")
      navigate("/");
    }
    else {
      showAlert("danger","Invalid Details")
    }
  }
  return (
    <div className="mt-3">
      <h2>Login to Continue to iNotebook</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" ref={emailRef} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" ref={passwordRef} />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
  );
};

export default Login;