const mongoose= require( "mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema({
    user :{                                        // adding user field to link user with the notes , like a foreign key 
      type : mongoose.Schema.Types.ObjectId,
      ref : "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Note', noteSchema);    