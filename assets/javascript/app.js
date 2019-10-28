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



$("#submitBtn").on("click", function (event) {

    event.preventDefault();

    // Gathering the users input values.
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFirstTime = $("#first-train-time").val().trim();
    var trainFreq = $("#train-freq").val().trim();

    console.log(name);
    console.log(destination);
    console.log(trainFirstTime);
    console.log(trainFreq);

    // Pushing the info gathered from the user to Firebase.
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        trainFreq: trainFreq,

    })
    // Clearing the input fields after a submission.
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#train-freq").val("");
});

database.ref().on("child_added", function (snapshot) {

    let sv = snapshot.val();
    // Using moment js to convert the train times to 1 year ago.
    let convertedTime = moment(sv.trainFirstTime, "HH:mm").subtract(1, "years");
    console.log(convertedTime);
    let currentTime = moment();

    // Setting the difference between now and the converted time to a variable.
    let timeDiff = moment().diff(convertedTime, "minutes");

    // Finding out the time remaining for the train to arrive.
    let timeRemaind = timeDiff % sv.trainFreq;

    let minAway = sv.trainFreq - timeRemaind;
    console.log(minAway);

    let nxtArrive = moment().add(minAway, "minutes");

    // Converting the military time to standard time to display on the page
    let newTrainTimeForm = moment(nxtArrive).format("hh:mm A");

    console.log(moment(currentTime).format("HH:mm"));

    // Using JQuery to create the table with the info gathered.

    let tRow = $("<tr>");
    let train = $("<td>").text(sv.name);
    let trainDest = $("<td>").text(sv.destination);
    let freq = $("<td>").text(sv.trainFreq);
    let minutesAway = $("<td>").text(minAway);
    let nextArrive = $("<td>").text(newTrainTimeForm);


    
    tRow.append(train);
    tRow.append(trainDest);
    tRow.append(freq);
    tRow.append(nextArrive);
    tRow.append(minutesAway);

    // Appending the table with the Train info to the HTML
    tRow.appendTo(".tbody")

})