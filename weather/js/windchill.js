let current = parseInt(document.getElementById("current").textContent)
let wind = parseInt(document.getElementById("wind").textContent)
if (current<= 50){
    if(wind > 3){

        document.querySelector("#sum").textContent = Math.round(35.74 + 0.6215 * current - 35.75 * wind ** 0.16 + 0.4275 * current * wind ** 0.16);
    }
    else{
        document.querySelector("#sum").textContent = "N/A";
    }
}
else{
    document.querySelector("#sum").textContent = "N/A";
}
