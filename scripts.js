$(document).ready( function() {

var timer;
var totalTime = 10000;
var infoData;
var dataLength;
var studentCounter = 0;

  $(function() {

    $.ajax({
      url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
      dataType: 'json',
      success: function(data){
        console.log('AJAX loaded'); // confirms info has been loaded
        // loads page with starting info from element 0
        studentInfo(data, studentCounter);
        infoData = data; // stores the data globally
        dataLength = data.students.length - 1; // sets a dynamic number for later use should the array size change
        startTime();
        }, // end success
      statusCode: {
        404: function(){
          alert('error connecting to server');
        } // end 404
      } // end statusCode
    }); // end ajax  object
  });

  // First time call sets page with first student in array and creates starting divs.
  // Subsequent calls cycle through student array and displays changes.
  var studentInfo = function(info, num){
    // series of var's to clean up info. Serves no other purpose than readability
    var stuInfo = info.students;
    var first = stuInfo[num].first_name;
    var last = stuInfo[num].last_name;
    var location = stuInfo[num].city;
    var sO = stuInfo[num].shoutout;
    var stuNum = studentCounter + 1;
    var display = "Student: " + first + " " + last + ". Lives in: " + location + ". Shoutout: " + sO;
    var countDisplay = "#" + stuNum + "/20";

    var newDiv = document.createElement("div");
    newDiv.className = "newDiv";

    // creates new student to display on page and appends to div named "newDiv"
    var student = document.createElement("div");
    student.className = "newStudent";
    student.textContent = display;
    newDiv.appendChild(student);
    $("body").append(newDiv);

    // creates updated counter to display on page and appends to the div "student"
    var countDiv = document.createElement("div");
    countDiv.className = "countDiv";
    countDiv.textContent = countDisplay;
    student.appendChild(countDiv);
    $("body").append(newDiv);
    };

  // creates a function that cycles through all students in a 10 second interval
  function startTime(){
    timer = setInterval(function() {
      studentCounter++;
      $(".newDiv").remove();
      // checks end of array and wraps down to bottom of array if at top
        if(studentCounter > dataLength){
          studentCounter = 0;
          studentInfo(infoData, studentCounter);
        } // end if
          else {
          studentInfo(infoData, studentCounter);
        } // end else
    }, totalTime);
  }

  // creates a function to stop the time interval
  function stopTimer(){
      clearInterval(timer);
  } // end stopTimer

  $("#prevBtn").click( function(){
    stopTimer(); // stops timer to display previous student
    studentCounter--;
    $(".newDiv").remove(); // removes previous element to be replaced by new student and counter
      // checks beginning of array and wraps to top of array if at bottom
      if(studentCounter < 0){
        studentCounter = dataLength;
        studentInfo(infoData, studentCounter);
      }
      else {
        studentInfo(infoData, studentCounter);
        }
    startTime(); // restarts timer at 10 seconds
  }); // end PREV

  $("#nextBtn").click( function(){
    stopTimer();
    studentCounter++;
    $(".newDiv").remove();
      // checks end of array and wraps down to bottom of array if at top
      if(studentCounter > dataLength){
        studentCounter = 0;
        studentInfo(infoData, studentCounter);
      }
      else {
        studentInfo(infoData, studentCounter);
        }
    startTime();
  }); // end NEXT

  // Gets option selected then changes display to output selected student and adjusts counter.
  $("#selectBtn").on("change", function(){
    stopTimer();
    studentCounter = parseInt($(this).val()) - 1; // parses option into a number
    $(".newDiv").remove();
    studentInfo(infoData, studentCounter);
    $("#selectBtn").val(0); // sets select to beginning
    startTime();
  }); // end select button
}); // document ready
