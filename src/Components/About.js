import React, { useContext, useEffect } from 'react';
import noteContext from '../context/NoteContext';
import { useLocation } from 'react-router-dom';


const About = () => {
    const { pathname } = useLocation();
    // const a = useContext(noteContext)
    // useEffect(()=>{
    //     a.update()
    // },[])
    console.log("pathname ",pathname)
    return (
        <div>this is about </div>
    );
};

export default About;