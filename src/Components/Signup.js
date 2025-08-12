import React, { useRef,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/AlertContext';

const Signup = (props) => {
    const context = useContext(alertContext);
    const {showAlert} = context
    let navigate = useNavigate();
    const host = "http://localhost:3000"
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const cpasswordRef= useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(cpasswordRef.current.value !== passwordRef.current.value){
            return alert("password is not matching")
        }
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value })

        })
        const json = await response.json()
        console.log("json from login", json)
        if (json.success) {
            // save the auth token to lcal storage and redirect 
            localStorage.setItem('token', json.authToken)
            showAlert("success","Account Created Successfully")
            navigate("/login");
        }
        else {
            showAlert("danger","Invalid Credential")
        }
    }
    return (
        <div className="container mt-3">
        <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" ref={nameRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" ref={emailRef} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" ref={passwordRef} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" ref={cpasswordRef} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
