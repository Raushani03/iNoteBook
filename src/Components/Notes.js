import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/NoteContext"
import Noteitem from "./Noteitem"
import AddNote from './AddNote';
import alertContext from '../context/AlertContext';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    let navigate = useNavigate();
    const contextalert = useContext(alertContext);
    const {showAlert} = contextalert
    const context = useContext(noteContext)
    const { notes, getNotes,editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token'))  // check if token is already present then show the notes otherwise redirect to login page 
        {
            getNotes(); 
        }
        else {
            navigate("/login");

        }
        
    }, [])
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        showAlert("success","Updated successfully")
    }
    const ref = useRef(null)
    const refclose = useRef(null)
    console.log("ref from note", ref.current)

    const handleClick = (e) => {
        console.log("updating the note...", note)
        e.preventDefault(); // to avoid page reload 
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        showAlert("success","Updated successfully")
        console.log("ref close ", refclose.current);
        // addNote(note.title, note.description,note.tag)

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange}  minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary" data-bs-dismiss="modal" >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length===0 && <p>No Notes to display</p>}
                {notes.map(note => ( <Noteitem updateNote={updateNote} key={note._id} note={note} /> ))}
            </div>
        </>

    );
};

export default Notes;