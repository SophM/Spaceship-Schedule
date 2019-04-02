// ==================================
// Initialization/Configuration
// ==================================

// initialize Firebase Database
var config = {
    apiKey: "AIzaSyCJuE2POWFWmKYJpo6rnCnm3vgUhxuqTNM",
    authDomain: "spaceship-schedule.firebaseapp.com",
    databaseURL: "https://spaceship-schedule.firebaseio.com",
    projectId: "spaceship-schedule",
    storageBucket: "spaceship-schedule.appspot.com",
    messagingSenderId: "111161802045"
  };

  firebase.initializeApp(config);


// ==================================
// Variables
// ==================================

// variable to store the Firebase database to easily refer to it
var database = firebase.database();

// variable to store the minutes till the next spaceship
var minutesAway = 0;

// variable to store the time of the next spaceship
var nextSpaceshipArrival;


// ==================================
// Functions
// ==================================

// function to compute the "Next Arrival" and the "Minutes Away" arrival,
// based on the current time, the first spaceship time and the frequency
function nextArrivalMinutesAway(firstSpaceshipTime, frequency) {
    // convert the first spaceship time to make sure it comes before the current time
    var firstTimeConverted = moment(firstSpaceshipTime, "HH:mm").subtract(1, "years");
    // get the difference, in minutes, between the current time and the first spaceship time converted
    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    // get the remainder of the time difference divided by the frequency
    var timeRemaining = timeDifference % frequency;
    // compute the minutes away
    minutesAway = frequency - timeRemaining;
    // get the time of the next spaceship in AM/PM format
    var next = moment().add(minutesAway, "minutes");
    nextSpaceshipArrival = moment(next).format("hh:mm A");
    
}
// to test the  behavior of the function beforehand 
// nextArrivalMinutesAway("06:45", 30);
// console.log("minutes away: " + minutesAway);
// console.log("next spaceship: " + nextSpaceshipArrival);

// ==================================
// Main process
// ==================================

// store the user input data when the user clicks the "submit" button
// and back those data up in the Firebase database
$("#form-spaceship").on("submit", function(event) {
    // prevent the page from refreshing
    event.preventDefault();

    // store the user input data into variables
    var spaceshipName = $("#spaceship-name-input").val().trim();
    console.log(spaceshipName);
    var destination = $("#destination-input").val().trim();
    console.log(destination);
    // here, we get a time in military format
    var firstSpaceshipTime = moment($("#first-spaceship-input").val().trim(), "HH:mm").format("HH:mm");
    console.log(firstSpaceshipTime);
    var freq = $("#frequency-input").val().trim();
    console.log(freq);

    // create an object to store all the spaceship data
    var spaceshipData = {
        name: spaceshipName,
        dest: destination,
        first: firstSpaceshipTime,
        freq: freq,
    };

    // send the spaceship data to the Firebase database
    database.ref("/spaceshipInfo").push(spaceshipData);

    // empty the textbox area because it is nicer!
    $("#spaceship-name-input").val("");
    $("#destination-input").val("");
    $("#first-spaceship-input").val("");
    $("#frequency-input").val("");

});


// each time some data are added to the Firebase database, we get a hold on those data
// and we display them on the web page
database.ref("/spaceshipInfo").on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    // grab the data backed up in the Firebase database
    var spaceshipName = childSnapshot.val().name;
    console.log(spaceshipName);
    var destination = childSnapshot.val().dest;
    console.log(destination);
    var firstSpaceshipTime = childSnapshot.val().first;
    console.log(firstSpaceshipTime);
    var freq = childSnapshot.val().freq;
    console.log(freq);

    // compute "Next Arrival" and "Minutes Away" variables
    nextArrivalMinutesAway(firstSpaceshipTime, parseInt(freq));

    // create a row for the HTML table
    var row = $("<tr>").append(
        $("<td>").text(spaceshipName),
        $("<td>").text(destination),
        $("<td>").text(freq),
        $("<td>").text(nextSpaceshipArrival),
        $("<td>").text(minutesAway),
    );

    // append the new row to the HTML table to display the data
    $("#table-body").append(row);

// If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("Errors: " + errorObject.code);
});









