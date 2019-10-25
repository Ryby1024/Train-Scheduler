// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBeA6x-f3h7dx9v2r1kaRkwNx4YonGRwII",
    authDomain: "train-6ce24.firebaseapp.com",
    databaseURL: "https://train-6ce24.firebaseio.com",
    projectId: "train-6ce24",
    storageBucket: "train-6ce24.appspot.com",
    messagingSenderId: "290488740027",
    appId: "1:290488740027:web:dd0a93e0832bc12f12619e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

console.log(hour, min)
$("#add-train").on("click", function (event) {

    event.preventDefault();


    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = parseInt($("#first-train-time").val().trim());
    var trainFreq = parseInt($("#train-freq").val().trim());

    database.ref().set({
        name: "train-name",
        destination: "destination",
        firstTime: "train-first-time",
        trainFreq: "train-freq"
    })
  });

  database.ref().on("value", function(snapshot){
      
  })