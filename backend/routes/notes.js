const express = require("express");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
// Route 1: get all notes of the user using "api/notes/fetchallnotes" , login required (means it need auth token)
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
} catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}
});

// Route 2: to add a new notes of the user using "api/notes/addnote" , login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
        
    const {title,description,tag} = req.body    // destructuring from req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag, user: req.user.id  
    })
   const saveNote = await note.save();
    res.json(saveNote);
}catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}
  }
);
// Route 3: to update a note of the user using "api/notes/updatenote" , login required (means it need auth token)
// paasing an id to the api so that notes can be updated by the user only if he/she belongs to that notes   
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const {title,description,tag} = req.body     // destructing title,description,tag as we had these data in body while adding the notes 
    try {
        
    //create new note 
    const newNote ={}
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    // find the note to be updated and update it 
    let note = await Note.findById(req.params.id)    // this is id which we are passing in param in req "/updatenote/:id", to find the particular note from db 
    console.log("note data:",note)
    if(!note){return res.status(400).send("Not Found")}

    // check if correct user is trying to update the notes means someone is trying to access other's note 
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    } 
// if above two checks are passed means its a valid user and note axists so procceding with note update, {new : true} for any new field to be added
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.send({note});
} catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}
})

// Route 4: to delete a note of the user using "api/notes/deletenote" , login required (means it need auth token)
// paasing an id to the api so that notes can be updated by the user only if he/she belongs to that notes   
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    
  try {
    
    // find the note to be deleted and delete it 
    let note = await Note.findById(req.params.id)    // this is id which we are passing in param in req "/updatenote/:id", to find the particular note from db 
    console.log("note data to be deleted:",note)
    if(!note){return res.status(400).send("Not Found")}

    // check if correct user is trying to delete the notes means someone is trying to access other's note 
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    } 
// if above two checks are passed means its a valid user and note axists so procceding with note update, {new : true} for any new field to be added
    note = await Note.findByIdAndDelete(req.params.id)
    res.send({"success": "note has been deleted",note: note});
} catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}
})

module.exports = router;
