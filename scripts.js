$(document).ready(function() {

var infoData;
var temoStudent;
var studentCounter = 0;
var tempCounter = 0;

  $(function() {

    $.ajax({
      url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
      dataType: 'json',
      success: function(data){
        console.log('AJAX loaded');
        studentInfo(data, studentCounter); // loads page with starting info from 0
        infoData = data;
        }, // end success
      statusCode: {
        404: function(){
          alert('error connecting to server');
        } // end 404
      } // end statusCode
    }); // end ajax  object
  });

  var studentInfo = function(info, num){
    var stuInfo = info.students;
    var first = stuInfo[num].first_name;
    var last = stuInfo[num].last_name;
    var location = stuInfo[num].city;
    var sO = stuInfo[num].shoutout;
    var stuNum = studentCounter + 1;
    var display = "Student: " + first + " " + last + ". Lives in: " + location + ". Shoutout: " + sO;
    var countDisplay = "#" + stuNum + "/20";

    var newDiv = document.createElement("div");
    newDiv.className = "studentDiv";

    var countDiv = document.createElement("p");
    countDiv.className = "countDiv";
    countDiv.textContent = countDisplay;
    newDiv.appendChild(countDiv);
    $("body").append(newDiv);

    var student = document.createElement("p");
    student.className = "newStudent";
    student.textContent = display;
    newDiv.appendChild(student);
    $("body").append(newDiv);
    tempCounter = countDiv;
    tempStudent = student;
    };

  $("#prevBtn").click(function(){
    studentCounter--;
    tempStudent.remove();
    tempCounter.remove();
      if(studentCounter < 0){
        studentCounter = 19;
        studentInfo(infoData, studentCounter);
      }
      else {
        studentInfo(infoData, studentCounter);
        }
  }); // end PREV

  $("#nextBtn").click(function(){
    studentCounter++;
    tempStudent.remove();
    tempCounter.remove();
      if(studentCounter > 19){
        studentCounter = 0;
        studentInfo(infoData, studentCounter);
      }
      else {
        studentInfo(infoData, studentCounter);
        }
  }); // end NEXT
}); // document ready
