var config = {
    apiKey: "AIzaSyDR7s1Wj7LKfZi1kZsEgrU0kr4DFsgDae8",
    authDomain: "original-project-bd8d1.firebaseapp.com",
    databaseURL: "https://original-project-bd8d1.firebaseio.com",
    projectId: "original-project-bd8d1",
    storageBucket: "original-project-bd8d1.appspot.com",
    messagingSenderId: "1084030885291"
  };
firebase.initializeApp(config);

var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainName = $("#name-input").val().trim();
      destination = $("#desti-input").val().trim();
      firstTrain = $("#first-input").val().trim();
      frequency = $("#freq-input").val().trim();

      // Code for the push
      database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });
    });


 database.ref().on("child_added", function(snapshot) {

      // Log everything that's coming out of snapshot

      console.log(snapshot.val());

      console.log(snapshot.val().trainName);

      console.log(snapshot.val().destination);

      console.log(snapshot.val().firstTrain);

      console.log(snapshot.val().frequency);

      // Change the HTML to reflect

      $("#name-input").text(snapshot.val().name);

      $("#desti-input").text(snapshot.val().email);

      $("#first-input").text(snapshot.val().age);

      $("#freq-input").text(snapshot.val().comment);


  function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    };