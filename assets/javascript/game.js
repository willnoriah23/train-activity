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
    var nextArrival = "";


    // Capture button click
    $(".add-train").on("click", function(event) {
      event.preventDefault();

      trainName = $("#name-input").val().trim();
      destination = $("#desti-input").val().trim();
      firstTrain = $("#first-input").val().trim();
      frequency = $("#freq-input").val().trim();

    var nextTrain = addInputs(firstTrain, frequency);

    var min = nextTrain.diff(moment(), "minutes") + 1;

      database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextTrain.format("HH:mm A"),
        minutesAway: min
      });
    });
// Listening to the database and adds to table on initial load
database.ref().on("child_added", function(snapshot) {

var data = "<tr class='rowStuff'><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>"+ snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway + "</td></tr>";

  $(".table").append(data);  

  }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });

// Converts standard to military time 
function addInputs(x, y) {
    var time = moment(x, "H:mm A");
    console.log(time.format("H:mm A"));
    console.log(+y);
 // while is checking the difference of the current time and the arrival time on record to ensure it's the most up to date arrival time   
    while(moment().diff(time, "minutes") > 0) {
        time.add(+y, 'm');
  }
    console.log(time.format("HH:mm"));
    return time;
  };