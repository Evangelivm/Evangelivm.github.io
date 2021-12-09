let urla = "https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&appid=c571c11c2d65721afe5619a1164575c3";
let urlb = "https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&appid=c571c11c2d65721afe5619a1164575c3";
fetch(urla)
    .then((response) => response.json())
    .then((jsObject) => {
        document.getElementById('description').textContent = jsObject.weather[0].description;
        document.getElementById('current').textContent = jsObject.main.temp;
        document.getElementById('humid').textContent = jsObject.main.humidity;
        document.getElementById('wind').textContent = jsObject.wind.speed;

        let current = jsObject.main.temp;
        let wind = jsObject.wind.speed;

        if (current <= 50) {
            if (wind > 3) {
                document.getElementById("chill").textContent = parseInt(35.74 + 0.6215 * current - 35.75 * wind ** 0.16 + 0.4275 * current * wind ** 0.16);
            }
            else {
                document.getElementById("chill").textContent = "N/A"
            }
        }
        else {
            document.getElementById("chill").textContent = "N/A"
        }
    });
    

fetch(urlb)
    .then((response) => response.json())
    .then((jsObject) => {
        let forecasts = jsObject.list.filter(get1800);

        function get1800(data) {
            return data.dt_txt.includes("18:00:00");
        }

        console.log(forecasts)
        let test = new Date();
        let currDate = test.getDay();

        for (let i = 0; i < forecasts.length; i++) {
            let card = document.createElement('article');
 

            let date = document.createElement("h3");
            date.innerText = days[(currDate + i) % 7];
            card.appendChild(date)

            let imagesrc = 'https://openweathermap.org/img/w/' + forecasts[i].weather[0].icon + '.png';
            let image = document.createElement('img');
            image.setAttribute('src', imagesrc);
            image.setAttribute('class', "img1");
            image.setAttribute('alt', forecasts[i].weather[0].description);
            card.appendChild(image)

            let temp = document.createElement("p");
            temp.innerText = forecasts[i].main.temp + "°F";
            temp.setAttribute('class', "temperature");
            card.appendChild(temp)

            document.querySelector('div.forecasts').appendChild(card);
        }
    });
