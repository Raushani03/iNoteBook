const jwt = require('jsonwebtoken')
const JWT_SECRET = "thisisjwtsecret"

// Extracts a JWT token from the request header.
// Verifies the token using a secret key.
// Decodes the payload to get the user's ID.
// Attaches the user info to req.user so that the next function can access it.



const fetchUser = (req, res, next )=>{           // here "next arg is used to call whatever  the next funtion is after fetchUser (whereever we are calling it) for example "async(req,res)=>" in auth file, this fetchUser funtion brings user into req so we can use it anywhere using req "
// get the user from the jwt token and add id to the request obj
const token = req.header('auth-token')
if(!token){
    res.status(401).send({error: "please authenticate using a valid token"})
}
try {
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
        next(); 
} catch (error) {
    res.status(401).send({error: "please authenticate using a valid token"})
}


}

module.exports = fetchUser