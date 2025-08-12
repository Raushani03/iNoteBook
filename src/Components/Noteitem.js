import React, {useContext} from 'react';
import noteContext from "../context/NoteContext"
import alertContext from '../context/AlertContext';

const Noteitem = (props) => {
    const contextalert  = useContext(alertContext);
    const {showAlert} = contextalert
    const context=useContext(noteContext)
    const {deleteNote}=context
    const { note ,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body" >
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <p className="card-text">{note.tag} </p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);  showAlert("success","Deleted successfully")}}></i>      {/* delete button */}
                    <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>    {/*edit button */}
                 </div>
            </div>
        </div>
    );
};

export default Noteitem;