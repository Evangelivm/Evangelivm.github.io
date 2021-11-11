const date = new Date();
const year = date.getFullYear();

document.querySelector('#year').innerHTML = year;
document.querySelector('#date').innerHTML = document.lastModified;