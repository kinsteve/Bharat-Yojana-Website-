//require('dotenv').config();
const express = require("express");
const colors = require("colors");
const app= express();
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
const arr = require("./views/data.json");
const education = arr.filter(ele => ele.category==='education');
const health = arr.filter(ele => ele.category==='health');
const electricity = arr.filter(ele => ele.category==='electricity');
const water = arr.filter(ele => ele.category==='water');
const money = arr.filter(ele => ele.category==='money');
const jobs = arr.filter(ele => ele.category==='jobs');
const justice = arr.filter(ele => ele.category==='justice');
const entrepreneurship = arr.filter(ele => ele.category==='entrepreneurship');
const pension = arr.filter(ele => ele.category==='pension');
const agriculture = arr.filter(ele => ele.category==='agriculture');
const rural = arr.filter(ele => ele.category==='rural');
const law = arr.filter(ele => ele.category==='law');
// const education = arr.filter(ele => ele.category==='education');


// Set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');   //for deployment
// Serve static files from the public directory
app.use(express.static(__dirname+"/public/"));    // add this to make sure public folder is read on deployment

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    console.log(agriculture);   
    res.render("index.ejs");
    
})
app.post("/" , (req,res)=>{
   res.render("index.ejs");

});

app.get("/login" , (req,res)=>{
    res.render("login.ejs");
});

app.get("/signup" ,(req,res)=>{
    res.render("signup.ejs");
});


app.post("/signup", (req,res)=>{
    console.log(req);
    const { name, password,confirmpassword, phoneno, aadharno, gender, age, state, income } = req.body;
    console.log("HI my name is " , name);
    if (password !== confirmpassword) {
        return res.status(400).send('Passwords do not match');
      }
      admin.auth().createUser({
        displayName: name,
        password: password
      })
      .then((userRecord) => {
        // Store additional user data in Firebase Realtime Database
        const userData = {
          name,
          phoneno,
          aadharno,
          gender,
          age: parseInt(age),
          state,
          income: parseInt(income)
        };
        console.log(userData);
        return admin.database().ref(`users/${userRecord.uid}`).set(userData);
      })

      .then(() => {
        res.status(200).send("User Registered");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred');
      });
    });
    
// app.get("/education" ,(req,res)=>{
//     res.render("education.ejs");
// });
app.get("/electricity" ,(req,res)=>{
    res.render("electricity.ejs");
});
app.get("/health" ,(req,res)=>{
    res.render("health.ejs");
});
app.get("/water" ,(req,res)=>{
    res.render("water.ejs");
});
app.get("/money" ,(req,res)=>{
    res.render("money.ejs");
});
app.get("/jobs" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/justice" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/law" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/buisness" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/pension" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/agriculture" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/rural" ,(req,res)=>{
    res.render("generic.ejs");
});
app.get("/education", (req, res) => {
    res.render("education.ejs", { education: education });
});

const serviceAccount = require('./hackathon-c3b03-firebase-adminsdk-vxv9h-c3285e1205.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hackathon-c3b03-default-rtdb.firebaseio.com',

});
app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));