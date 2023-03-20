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
const auth = firebase.auth();
// app.use(express.json());

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

app.post('/login',(req, res) => {
    const {email,password}=req.body;
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Logged in successfully
      var user = userCredential.user;
      console.log("User " + user.uid + " logged in successfully.");
    })
    .catch((error) => {
      // Error handling
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error: " + errorMessage);
    });
  });

app.get("/education", (req, res) => {
    res.render("education.ejs");
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