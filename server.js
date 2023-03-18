require('dotenv').config();
const express = require("express");
const colors = require("colors");
const app= express();

app.use(express.json());

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Serve static files from the public directory
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/login" , (req,res)=>{
    res.render("login.ejs");
});

app.get("/signup" ,(req,res)=>{
    res.render("signup.ejs");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
  });

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));