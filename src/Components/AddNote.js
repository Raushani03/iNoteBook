import React, { useContext , useState} from 'react';
import noteContext from "../context/NoteContext"
import alertContext from '../context/AlertContext';

const AddNote = (props) => {
    const contextalert = useContext(alertContext);
    const {showAlert} = contextalert
    const context=useContext(noteContext)
    const {addNote}=context
    const [note,setNote]= useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault() ; // to avoid page reload 
    addNote(note.title, note.description,note.tag)
    setNote({title:"",description:"",tag:""})
    showAlert("success","Added successfully")
    }
    const onChange =(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div classname="container ">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange} minLength={3}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onChange} minLength={5}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} />
                    </div>
                    <button disabled= {note.title.length<5 || note.description.length<3}type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
    );
};

export default AddNote ;