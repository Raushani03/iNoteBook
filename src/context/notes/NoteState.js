import noteContext from "../NoteContext";
import { useState } from "react";

const NoteState =(props)=>{
    const host = "http://localhost:3000"
    const initialState = []
    const [notes,setNotes]=useState(initialState)
    
    // fetch all notes 

    const getNotes =async ()=>{
        console.log("adding a new note")
         //API CALL 
        const url = `${host}/api/notes/fetchallnotes`;
        const  myHeaders = {
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')
         }
        const response = await fetch(url, {
            method: "GET",
            headers: myHeaders
          });
   const json = await response.json();
       console.log(json)
      setNotes(json)
    }


    //add a note
    const addNote =async (title,description,tag)=>{
        console.log("adding a new note")
         //API CALL 
        const url = `${host}/api/notes/addnote`;
        const  myHeaders = {
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')
         }
        const response = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({title,description,tag}),
            // …
          });

        //   const json = response.json()
       
        // const note =  {
        //     "_id": "6862d28d769c82d20b397a65",
        //     "user": "68619e8a10f725f8050c5ae0",
        //     "title": title,
        //     "description":description,
        //     "tag": tag,
        //     "date": "2025-06-30T18:08:13.651Z",
        //     "__v": 0
        // };
        const json = await response.json()
        setNotes(notes.concat(json))

    }
    // delete a note 
    const deleteNote= async (id)=>{
      
        const url = `${host}/api/notes/deletenote/${id}`;
        const  myHeaders = {
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')
         }
        const response = await fetch(url, {
            method: "DELETE",
            headers: myHeaders
          });
   const json = await response.json();
   console.log("json deleted ", json.note._id)

    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    }
    // edit a note 
    const editNote= async (id, title,description,tag)=>{
        //api call
        const url = `${host}/api/notes/updatenote/${id}`;
        const  myHeaders = {
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')
         }
        const response = await fetch(url, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({title,description,tag}),
            // …
          });

          const json = await  response.json()
      let newNotes = JSON.parse(JSON.stringify(notes))     // React state updates require that the state be treated as immutable. Directly mutating the notes array and then calling setNotes(notes) with the same reference will not trigger a re-render.
        //logic to edit in client 
        for (let i =0 ;i< newNotes.length;i++){
            const element = newNotes[i]
            if(element._id===id){
                newNotes[i].title=title;
                newNotes[i].description= description;
                newNotes[i].tag=tag
                break;
            }
            
        }
        setNotes(newNotes)
        
    }
return (
    <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </noteContext.Provider>
)
}

export default NoteState; 