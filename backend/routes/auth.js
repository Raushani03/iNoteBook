const express=require('express');
const User =require("../models/User")
const router=express.Router();
const { query,body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "thisisjwtsecret"
// Route 1: create a user using "api/auth/createuser" ,no login required 
router.post('/createuser',[body('name','enter a valid name').isLength({min:3}),
body('email','enter a valid email id').isEmail(),
body('password','Password must be atleast 5 characters').isLength({min:5})], async(req,res)=>{
    // if there are errors, return 400 bad request and error 
    const errors = validationResult(req);
    let success= false;
    console.log("errors are",errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
      }
      // check if user with this email exist already 
      try{
      let user = await User.findOne({email:req.body.email})
      console.log("user ==",user)
      if(user){
        return res.status(400).send({success,error : "sorry user with this email already exist"})
      }
      const salt = await bcrypt.genSalt(10); // creating a salt 
      const secPassWord = await bcrypt.hash( req.body.password, salt); // to generate the hash instead for storing the plain password
      //create a new user 
    user = await  User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPassWord,
      })
    // creating a data to pass into jwt.sign to create authtoken, so when ever user enter correct auth token it will find the user in db based on use id .
    const data = {
        user : {
            id : user.id
        }
    }
    // to create a auth token , when ever user sign in we send them this authtoken in response , if user is returning correct auth token then we will convert that into correct data (in this case its user id as we are passing it) and find it user in our db  
    const authToken = jwt.sign(data,JWT_SECRET );
     success = true 
    res.json({success, authToken})
    }
   
    // catch errors
    catch(err){
        console.error(err.message)
        res.status(500).send("some error occured")
    }
})
// Route 2: login "api/auth/login" ,no login required 
router.post('/login',[
body('email','enter a valid email id').isEmail(),
body('password','password can not be blank').isEmail()],
 async(req,res)=>{

    // if there are errors, return 400 bad request and error 
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

   // incse of no error 
   const {email, password}  = req.body 
   try {
    let user = await User.findOne({email}) // get user doc from db with entered email id 
    if(!user){
        return res.status(400).json({error : "Please try to login with correct credentials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error : "Please try to login with correct credentials"})
    }
    // if user enters correct credentials , send the user id 
    const data = {
        user : {
            id : user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET );
    success = true;
    res.json({success, authToken})

   }  catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}

})
// Route 3: Get a user details using "api/auth/getuser" ,login required (means it need auth token)
router.post('/getuser', fetchUser ,
     async(req,res)=>{
try {
   const userId = req.user.id 
   const user = await User.findById(userId).select("-password")
   res.send(user)
}catch(err){
    console.error(err.message)
    res.status(500).send("internal server Error")
}
})

module.exports=router;  