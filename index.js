const express = require('express');
const bodyparser = require('body-parser');
const student = require('./schema');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyparser.json());

const users =[];
const Tokens = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user : 'your-email@gmail.com',
        pass: 'your-email-password',
    }
})
app.post('/singup' ,async(req,res)=>{
    try{ 
    const{ FirstName , LastName , email , password}= req.body;

    if(!FirstName || !LastName || !email || !password){
        return res.status(400).json({message:"you need to field all coloum"})
    }
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if(!emailPattern.test(email)){
        return res.status(400).json({ message:"email must be right"})
    }

    const userExists = users.some(user => user.email === email);
    if(userExists){
        return res.status(400).json({message:"user already exists"})
    }
    users.push({FirstName,LastName,email,password})
      res.status(200).json({message:"user signed up succesfully"});
}
 catch(err){
    console.log(err);
 }
})

app.post('/login',async(req,res)=>{
    try{ 
        const{ email,password}= req.body;

        if(!email || !password){
            return res.status(400).json({message:"email and passoword are required"})
        }

        const user =users.find(users => user.email === email && user.password === password)
        if(!users){
            return res.status(400).json({message:"invalid email or passoword"})
        }
        res.status(200).json({ message: "login successful"})
    }
    catch(err){
        console.log(err);
    }

})

app.post('/resetpassword/:token',(req,res)=>{
    const {token} = req.params;
    const {newPassword} =req.body;

    if(!newPassword){
        return res.status(400).json({message: " new passoword required"})
    }
    const email = object.keys(resetTokens).find(email =>resetTokens[email]=== token);
    if(!email){
        return res.status(400).json({message : "Invalid token"}) 
       }
    const user = users.find( user => user.email === email)
    if(user){
        user.password = newPassword;
        delete resetTokens[email];
        res.status(200).json({ message:"password reset succesfull"})
    }
    else{
        res.status(400).json({message:"user not found"})
    }
})

app.get('/usersdetails', async(req,res)=>{
   try{ 
       const{email} = req.query;
       
       if(!email){
        return res.status(400).json({message:"email is required"})
       }
       const user = users.find(user => user.email === email);
       if(!user){
        return res.status(400).json({message:"user not found"})
       }
       res.status(200).json({user});
   }

   catch(err){
    res.status(400).send("error");
    console.log(err);
   }
})




app.listen(8000,(err)=>{
    if(err){
        console.log("server is connected to port no 8000");
    }
    else{
        console.log("server is not connected to port no 8000");
    }
})