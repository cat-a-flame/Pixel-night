import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const date = document.getElementById("date");
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const stepNum = document.getElementById("steps");
const elevationNum = document.getElementById("elevation");
const distanceNum = document.getElementById("distance");
const heartRate = document.getElementById("heartRate");

const fieldMap = {
   distance: {name: "distance", unit: "m" },
   calories: {name: "calories", unit: "Cal" },
   steps: {name: "steps", unit: "" },
   elevationGain: {name: "elevation", unit: "floors"},
   activeMinutes: {name: "active minutes", unit: "" }
};

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let hours = evt.date.getHours();

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(evt.date.getMinutes());
  
  
  
  
  // Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

hrm.onreading = function() {
  // Peek the current sensor values
  heartRate.text = hrm.heartRate;
}
  
function updateHeartRateSensor() {
  // Begin monitoring the sensor
  hrm.start();
}

function stopHearRateSensor() {
  // Stop monitoring the sensor
  hrm.stop();
}
  

function showHeartrate() {
  hideAndShow('heartRateContainer');
}
    
  
function hideAndShow(elementToHide, elementToShow) {
  let elementToHide = document.getElementById(elementToHide);
  let elementToShow = document.getElementById(elementToShow);
  
  elementToHide.style.visibility = 'hidden';
  elementToShow.style.visibility = 'visible';
}

updateHeartRateSensor();
  
  
  
  hour.text = `${hours}`;
  minute.text = `${mins}`;
  date.text = `${monthNames[evt.date.getMonth()]} ${evt.date.getDate()}`;
  stepNum.text = `${today.adjusted.steps}`;
  elevationNum.text = `${today.adjusted.elevationGain}`;
  distanceNum.text = `${today.adjusted.distance}`;
}
