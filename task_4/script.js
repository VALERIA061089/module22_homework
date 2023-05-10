const apiURL = "https://api.ipgeolocation.io/timezone?";
const apiKey = "32bcd4a6e4b548968e7afcdb682ac679";

function pageLoaded() {
    const btn = document.querySelector('.timezone');
    const output = document.querySelector('.output');
  
  btn.addEventListener("click", getLocation);
  
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      writeOutput("В вашем браузере недоступна возможность определения местоположения");
    }
  }
  
  function locationSuccess(data) {
    let coords = [data.coords.longitude, data.coords.latitude];
    let url = formatURL(coords);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let outputText = formatOutput(data);
        writeOutput(outputText);
      })
  }
  
  function locationError() {
    writeOutput("При определении местоположения произошла ошибка");
  }
  
  function formatURL(coords) {
    let url = new URL(apiURL);
    url.searchParams.set('lat', coords[1]);
    url.searchParams.set('long', coords[0]);
    url.searchParams.set('apiKey', apiKey);
    url.searchParams.set('lang', "ru");
    return url;
  }
  
  function formatOutput(data) {
    console.log(data);
    let html = `
    <p>Временная зона: ${data.timezone}</p>
    <p>Дата и время: ${data.date_time_txt}</p>
    `;
    return html;
  }
  
  function writeOutput(message) {
    output.innerHTML = message;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);