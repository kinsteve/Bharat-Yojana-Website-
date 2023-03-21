//require('dotenv').config();
const express = require("express");
const colors = require("colors");
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const serviceAccount = require('./hackathon-c3b03-firebase-adminsdk-vxv9h-c3285e1205.json');
//console.log(serviceAccount);
const firebaseConfig = {
    apiKey: "AIzaSyApbRlARLIexQLyxVNLcDiNz1aQ_gSgsXE",
    authDomain: "hackathon-c3b03.firebaseapp.com",
    databaseURL: "https://hackathon-c3b03-default-rtdb.firebaseio.com",
    projectId: "hackathon-c3b03",
    storageBucket: "hackathon-c3b03.appspot.com",
    messagingSenderId: "260423164058",
    appId: "1:260423164058:web:7f7b2a59de7a57c8dd3f23",
    measurementId: "G-5DSY8BHTYY"
  };
  
  // Initialize Firebase
  
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');   //for deployment
  // Serve static files from the public directory
  app.use(express.static(__dirname + "/public/"));    // add this to make sure public folder is read on deployment
  app.use(bodyParser.urlencoded({ extended: true }));
  
  const PORT = process.env.PORT || 3000;
  
  
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



// Set the view engine

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

app.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
       // console.log(user);
        console.log('User logged in successfully!');
        res.redirect('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        res.send('Error logging in user!');
      });
  });

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});


app.post("/signup", (req, res) => {
    const { name,email, password, confirmpassword, phoneno, aadharno, gender, age, state, income } = req.body;
    if (password !== confirmpassword) {
        return res.status(400).send('Passwords do not match');
    }
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://hackathon-c3b03-default-rtdb.firebaseio.com',
    });
    
    admin.auth().createUser({
        name: name,
        email: email,
        password: password,
        phoneno:phoneno,
        aadharno:aadharno,
        gender:gender,
        age:age,
        state:state,
        income:income,
        
    })
        .then((userRecord) => {
            // Store additional user data in Firebase Realtime Database
            const userData = {
                name,
                email,
                phoneno,
                aadharno,
                gender,
                age: parseInt(age),
                state,
                income: parseInt(income)
            };
             console.log(userData);
            admin.database().ref(`users/${userRecord.uid}`).set(userData)
            .then(() => {
                console.log("Successfully stored user data in database");
                // console.log(userData);
                res.redirect('/');
            })
    
            .catch((error) => {
                console.error('Error storing user data in database:',error);
                res.redirect('/signup');

            });
        })
        .catch((error) => {
            console.error('Error creating new user:', error);
            res.redirect('/signup');
          });      
});



app.get("/education", (req, res) => {
    res.render("education.ejs" , {education: education});
});
app.get("/electricity", (req, res) => {
    res.render("electricity.ejs");
});
app.get("/health", (req, res) => {
    res.render("health.ejs");
});
app.get("/water", (req, res) => {
    res.render("water.ejs");
});
app.get("/money", (req, res) => {
    res.render("money.ejs");
});
app.get("/jobs", (req, res) => {
    res.render("generic.ejs");
});
app.get("/justice", (req, res) => {
    res.render("generic.ejs");
});
app.get("/law", (req, res) => {
    res.render("generic.ejs");
});
app.get("/buisness", (req, res) => {
    res.render("generic.ejs");
});
app.get("/pension", (req, res) => {
    res.render("generic.ejs");
});
app.get("/agriculture", (req, res) => {
    res.render("generic.ejs");
});
app.get("/rural", (req, res) => {
    res.render("generic.ejs");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));