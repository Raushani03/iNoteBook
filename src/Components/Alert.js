import React, {useContext} from 'react';
import alertContext from '../context/AlertContext';

const Alert = () => {
    const context = useContext(alertContext);
    const {alert} = context
    // const {alert} =props
//     if (!alert) return <div style={{ height: '30px' }}></div>;
//     const{type,msg} =alert
//  const alertType = type==="danger"?"error":type 
    return (
        <div >
           {alert && <div class={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type}</strong> : {alert.msg}
        </div>}
        </div>
    );
};

export default Alert;