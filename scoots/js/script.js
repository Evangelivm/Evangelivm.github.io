const requestURL = 'https://run.mocky.io/v3/a88d2c94-46d8-4866-b90b-216e5778bc74';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);  // temporary checking for valid response and data parsing
        const model = jsonObject['models'];
//for (let i = 0; i < towns.length; i++) {
        for (let i = 0; i < model.length; i++) {
            let card = document.createElement('article');
            card.setAttribute('class', "art1" );
           

            let image = document.createElement('img');
            image.setAttribute('src', "images/" + model[i].photo);
            image.setAttribute('alt', "Picture of " + model[i].name);
            card.appendChild(image)


            let data = document.createElement('div');

            let h2 = document.createElement('h2');
            h2.textContent = model[i].name;
            data.appendChild(h2);

            let motto = document.createElement('p');
            motto.textContent = model[i].motto;
            motto.classList.add("motto");
            data.appendChild(motto);

            let max = document.createElement('p');
            max.textContent = "Max. Persons: " + model[i].max;
            data.appendChild(max);

            let half = document.createElement('p');
            half.textContent = "Reservation Half Day(3 hrs): " + model[i].reservhalf;
            data.appendChild(half);

            let full = document.createElement('p');
            full.textContent = "Reservation Full Day: " + model[i].reservfull;
            data.appendChild(full);

            let whalf = document.createElement('p');
            whalf.textContent = "Walk-In Half Day(3 hrs): " + model[i].walkhalf;
            data.appendChild(whalf);

            let wfull = document.createElement('p');
            wfull.textContent = "Walk-In Full Day: " + model[i].walkfull;
            data.appendChild(wfull);
            

            card.appendChild(data)

            document.querySelector('div.cards').appendChild(card);
        }
    });

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
