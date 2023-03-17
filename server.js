require('dotenv').config();
const express = require("express");
const colors = require("colors");
const app= express();

app.use(express.json());

// Set the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;


app.get("/login" , (req,res)=>{
    res.render("login");
});

app.get("/signup" ,(req,res)=>{
    res.render("signup");
});


app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));