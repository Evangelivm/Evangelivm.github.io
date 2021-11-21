const date = new Date();
const year = date.getFullYear();
const days = new Array(7);
days[0] = "Sunday";
days[1] = "Monday";
days[2] = "Tuesday";
days[3] = "Wednesday";
days[4] = "Thursday";
days[5] = "Friday";
days[6] = "Saturday";
const months = new Array(12);
months[0] = "January"
months[1] = "February"
months[2] = "March"
months[3] = "April"
months[4] = "May"
months[5] = "June"
months[6] = "July"
months[7] = "August"
months[8] = "September"
months[9] = "October"
months[10] = "November" 
months[11] = "December"

document.querySelector('#year').innerHTML = year;
document.querySelector('#date').innerHTML = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + year;

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("hide");
}
if (date.getDay() != 5) {
    document.getElementById("banner-fridays").style.display = "none"
}