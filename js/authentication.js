import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";



// app.get('/js/firebase.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(__dirname + '/public/js/firebase.js');
// });

const firebaseConfig = {
    apiKey: "AIzaSyApbRlARLIexQLyxVNLcDiNz1aQ_gSgsXE",
    authDomain: "hackathon-c3b03.firebaseapp.com",
    projectId: "hackathon-c3b03",
    storageBucket: "hackathon-c3b03.appspot.com",
    messagingSenderId: "260423164058",
    appId: "1:260423164058:web:7f7b2a59de7a57c8dd3f23",
    measurementId: "G-5DSY8BHTYY"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const name = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const phoneno = document.getElementById("phoneno");
const aadharno = document.getElementById("aadharno");
const genderRadios = document.getElementByName("gender");
const age = document.getElementById("age");
const state = document.getElementById("state");
const income = document.getElementById("income");


let gender = null;

// Loop through each radio button
for (let i = 0; i < genderRadios.length; i++) {
  // Check if the radio button is checked
  if (genderRadios[i].checked) {
    // Store the value of the checked radio button in the selectedGender variable
    gender = genderRadios[i].value;
    break; // exit loop once a radio button is checked
  }
}

window.signUp()=function(event){
      event.preventDefault();
      var obj={
        name:name.value,
        password: password.value,
        confirmpassword: confirmpassword.value,
        phoneno : phoneno.value,
        aadharno: aadharno.value,
        gender: gender,
        age: age.value,
        state: state.value,
        income: income.value,
      }
      console.log("Hi");
}
console.log("Hi out");
