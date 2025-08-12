import alertContext from "../AlertContext";

import React,{useState} from 'react';

const AlertState = (props) => {
    const [alert,setAlert]= useState(null);
  const showAlert =(type,msg)=>{
    setAlert({
      type:type,
      msg:msg
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }

//   const   alert = {
//         type:"info",
//         msg:"context test"
//     }
    return (
        <alertContext.Provider value={{alert,setAlert,showAlert}}>
           {props.children}  
        </alertContext.Provider>
    );
};

export default AlertState;