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

let eventsAPI = "https://byui-cit230.github.io/weather/data/towndata.json"

    fetch(eventsAPI).then((response) => response.json())
        .then((jsObject) => {
            console.log(jsObject.towns)
            jsObject.towns.forEach((town) => {

                if (town.name == document.title) {
                    console.log(town.events)
                    town.events.forEach((value) => {
                        console.log(value)
                        paragraph = document.createElement("p")
                        paragraph.setAttribute('class', "events");
                        paragraph.innerHTML = value
                        box = document.querySelector("#events")
                        box.appendChild(paragraph)
                    })
                }

            })
        });