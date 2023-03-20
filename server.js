//require('dotenv').config();
const express = require("express");
const colors = require("colors");
const app = express();
const bodyParser = require('body-parser');

const admin = require('firebase-admin');
const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/firestore');
app.use(bodyParser.urlencoded({ extended: true }));
const serviceAccount = require('./hackathon-c3b03-firebase-adminsdk-vxv9h-c3285e1205.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://hackathon-c3b03-default-rtdb.firebaseio.com',

});
// app.use(express.json());
const arr = require("./views/data.json");
const education = arr.filter(ele => ele.category==='education');
const health = arr.filter(ele => ele.category==='health');
const electricity = arr.filter(ele => ele.category==='electricity');
const buisness = arr.filter(ele => ele.category==='buisness');
const water = arr.filter(ele => ele.category==='water');
const money = arr.filter(ele => ele.category==='money');
const jobs = arr.filter(ele => ele.category==='jobs');
const justice = arr.filter(ele => ele.category==='justice');
const entrepreneurship = arr.filter(ele => ele.category==='entrepreneurship');
const pension = arr.filter(ele => ele.category==='pension');
const agriculture = arr.filter(ele => ele.category==='agriculture');
const rural = arr.filter(ele => ele.category==='rural');
const law = arr.filter(ele => ele.category==='law');



// Set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');   //for deployment
// Serve static files from the public directory
app.use(express.static(__dirname + "/public/"));    // add this to make sure public folder is read on deployment

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    // alert("Hello Its popup");
    // const user = firebase.auth.currentUser; 
    // // // console.log(user);
    // if (user) {
    // //     // // User is signed in, so display their details
    //      console.log(typeof(user));
    //      const name = user.name;
    // //     // // const  = user.uid;
    //      res.render("index.ejs", { currUserName:name });
    //  } else {
    // //     // // User is not signed in
    //     res.render("index.ejs");
    //  }
     res.render("index.ejs");
})
app.post("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
    const { name, password, confirmpassword, phoneno, aadharno, gender, age, state, income } = req.body;
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
            console.log("User Registered");
            // console.log(userData);
            res.redirect('/');
        })

        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get("/education", (req, res) => {
    res.render("education.ejs" , {education: education});
});
app.get("/electricity", (req, res) => {
    res.render("electricity.ejs",{electricity:electricity});
});
app.get("/health", (req, res) => {
    res.render("health.ejs",{health:health});
});
app.get("/water", (req, res) => {
    res.render("water.ejs",{water:water});
});
app.get("/money", (req, res) => {
    res.render("money.ejs",{money:money});
});
app.get("/jobs", (req, res) => {
    res.render("jobs.ejs",{jobs:jobs});
});
app.get("/justice", (req, res) => {
    res.render("justice.ejs",{justice:justice});
});
app.get("/law", (req, res) => {
    res.render("law.ejs",{law:law});
});
app.get("/buisness", (req, res) => {
    res.render("buisness.ejs",{buisness:buisness});
});
app.get("/pension", (req, res) => {
    res.render("pension.ejs",{pension:pension});
});
app.get("/agriculture", (req, res) => {
    res.render("agriculture.ejs",{agriculture:agriculture});
});
app.get("/agriculture", (req, res) => {
    res.render("generic.ejs");
});
app.get("/rural", (req, res) => {
    res.render("rural.ejs",{rural:rural});
});


app.get("/search",(req,res)=>{
    res.render("search.ejs");
})

// const serviceAccount = require('./hackathon-c3b03-firebase-adminsdk-vxv9h-c3285e1205.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://hackathon-c3b03-default-rtdb.firebaseio.com',

// });

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));