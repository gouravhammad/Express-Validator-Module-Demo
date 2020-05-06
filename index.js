const { check, validationResult } = require('express-validator');
const bodyparser = require('body-parser')
const express = require("express")
const path = require('path')
const app = express()
 
var PORT = process.env.port || 3000

// View Engine Setup
app.set("views",path.join(__dirname))
app.set("view engine","ejs")

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
app.get("/",function(req,res){
    res.render("SampleForm");
})
 
// check() is a middleware used to validate the incomming data as per the fields
app.post('/saveData', [
    check('email','Email should be of minimum 10 and maximum 30 chars').isEmail().isLength({ min: 10 , max: 30}),
    check('name','Name should be of minimum 10 and maximum 20 chars').isLength({ min: 10 , max: 20}),
    check('mobile','Mobile should be of 10 digits').isLength({ min: 10 , max: 10}),
    check('password','Password should be of minimum 8 and maximum 10 chars').isLength({ min: 8 , max: 10})
  ], (req, res) => {
   
    // validationResult function checks whether any occurs or not and return an object
    const errors = validationResult(req);

    if(!errors.isEmpty()) // If some error occurs, then this block of code will run
    {
        res.json(errors)
    }
    else // If no error occurs, then this block of code will run
    {
        res.send("Successfully validated")
    }
  });
 
app.listen(PORT,function(error){
    if(error) throw error
    console.log("Server created Successfully on PORT ", PORT)
})