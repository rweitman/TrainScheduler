// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5V2S27k1DWeK_ADrsyuoSV-F9ozFvxoE",
    authDomain: "train-scheduler-6c64c.firebaseapp.com",
    databaseURL: "https://train-scheduler-6c64c.firebaseio.com",
    projectId: "train-scheduler-6c64c",
    storageBucket: "train-scheduler-6c64c.appspot.com",
    messagingSenderId: "716006005256"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();


    // Initial Values
    var name = "";
    var destination = "";
    var firstTime = "";
    var tFrequency = 0;


    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#time-input").val().trim();
      tFrequency = $("#frequency-input").val().trim();


      // Code for handling the push
      dataRef.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        tFrequency: tFrequency
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });
    // Firebase watcher + initial loader HINT: .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
   

      var tname = childSnapshot.val().name;
      var tdest = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().firstTime;
      var timeFreq = childSnapshot.val().tFrequency;
      var nextTrain = 0;

      tFrequency = parseInt(tFrequency);

     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(10, "years").format("X");
     console.log(firstTimeConverted);


    var differenceTimes = moment().diff(moment.unix(firstTimeConverted), "minutes");
    console.log(differenceTimes);
      var tRemainder = moment().diff(moment.unix(firstTimeConverted), "minutes") % timeFreq;
      var tMinutes = timeFreq - tRemainder;


      // To calculate the arrival time, add the tMinutes to the currrent time
      var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  

        //Add rows with new train data
        $("#train-table").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().tFrequency + "</td><td>" +
          tArrival + "</td><td>" + tMinutes + "</td></tr>");

        }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
