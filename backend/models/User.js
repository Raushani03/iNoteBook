const mongoose= require( "mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type:String,
        ref: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User =  mongoose.model('user', userSchema); // 'User' is the model // // This maps to the 'users' collection in MongoDB
// User.createIndexes(); // MongoDB automatically creates a unique index on this field because of: unique: true


module.exports = User;