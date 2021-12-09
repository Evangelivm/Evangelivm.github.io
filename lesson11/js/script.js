const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);  // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];
//for (let i = 0; i < towns.length; i++) {
        for (let i = 0; i < towns.length; i++) {
            let card = document.createElement('article');
            card.setAttribute('class', "art1" );
           

            let image = document.createElement('img');
            image.setAttribute('src', "images/" + towns[i].photo);
            image.setAttribute('alt', "Picture of " + towns[i].name);
            card.appendChild(image)


            let data = document.createElement('div');

            let h2 = document.createElement('h2');
            h2.textContent = towns[i].name;
            data.appendChild(h2);

            let motto = document.createElement('p');
            motto.textContent = towns[i].motto;
            motto.classList.add("motto");
            data.appendChild(motto);

            let year = document.createElement('p');
            year.textContent = "Year Founded: " + towns[i].yearFounded;
            data.appendChild(year);

            let pop = document.createElement('p');
            pop.textContent = "Current Population: " + towns[i].currentPopulation;
            data.appendChild(pop);

            let rain = document.createElement('p');
            rain.textContent = "Average Rainfall: " + towns[i].averageRainfall;
            data.appendChild(rain);
            
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
