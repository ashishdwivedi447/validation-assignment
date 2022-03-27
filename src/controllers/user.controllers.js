const express=require("express");

const User=require("../models/user.model");

const { body, validationResult } = require('express-validator');

const router=express.Router();

router.post("/",
body("firstName")
.trim()
.not()
.isEmpty()
.bail()
.withMessage("First Name cannot be empty"),

body("lasttName")
.trim()
.not()
.isEmpty()
.bail()
.withMessage("Last Name cannot be empty"),

body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email is required")
    .custom((value) => {
      const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value.match(email)) {
        throw new Error("email must be valid");
      }
      return true;
    }),

    body("pincode")
    .trim()
    .not()
    .isEmpty()
    .withMessage("pin code cannot be empty")
    .isNumeric()
    .withMessage("pin code must be a number")
    .isLength({min:6,max:6}),

    body("age")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),

    body("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("gender is required"),
    
    
    

   
    






async(req,res)=>{
try{
console.log(body("firstName"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const user= await User.create(req.body);
    return res.status(201).send(user);
}
catch(err){
    return res.status(500).send({message:err.message});
}
})

module.exports=router;