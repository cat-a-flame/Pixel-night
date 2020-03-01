import clock from "clock";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { battery } from "power";
import { FitFont } from 'fitfont'
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//const heartRate = document.getElementById("heartRate");

const dayLbl  = new FitFont({ id:'dayLbl',  font:'pixelmix_20',  halign: 'start'});
const hourLbl = new FitFont({ id:'hourLbl', font:'pixelmix_60', halign: 'start'});
const steps  = new FitFont({ id:'steps',  font:'pixelmix_20',  halign: 'end'});
const batteryLevel  = new FitFont({ id:'batteryLevel',  font:'pixelmix_20',  halign: 'end'});

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

  hourLbl.text = hours + ':' + mins;
  dayLbl.text = `${monthNames[evt.date.getMonth()]}`+ ' ' + `${evt.date.getDate()}`;
  batteryLevel.text = `${battery.chargeLevel}` + '%';
  steps.text = `${today.adjusted.steps}`;
}
