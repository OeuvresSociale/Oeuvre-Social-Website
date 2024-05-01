const jwt= require('jsonwebtoken');
const dotenv =require("dotenv").config();

/** auth middleware 
 to test for this user
  {"idEmployee" : "13",
  "password" : "esi"
} in headers add:
 Authorization : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEVtcGxveWVlIjoiMTMiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzExMTA5Nzc4LCJleHAiOjE3MTExOTYxNzh9.jUSTpvbWjevQPVEoyfO9KsKXzQLvfLCHlI87qmCwwlQ

*/

async function Auth(req, res, next) {
    try {
        // Access the authorization header to validate the request
        const testToken = req.headers.authorization;
        console.log('Authorization header:', testToken); // Log the authorization header
        
        if (!testToken || !testToken.startsWith('bearer')) {
            console.log('Authentication failed: Token missing or invalid');
            return res.status(401).json({ error: 'Authentication failed: Token missing or invalid' });
        }
        
        // Extract the token
        const token = testToken.split(' ')[1];
        console.log('Extracted token:', token); // Log the extracted token
        
        // Validate the token
       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Authentication error:', err.message);
            return res.status(401).json({ error: 'Authentication failed: Invalid token' });
        }
            req.user = user;
            console.log(user);
            next();
        });
        // Proceed to the next middleware or route handler
       
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ error: 'Authentication failed: Invalid token' });
    }
} 


 function localVariables(req, res, next){
     req.app.locals = {
         OTP : null,
         resetSession : false
     }
    next()
 }





module.exports = {Auth};