
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  document.getElementById('data').innerHTML = "Loading...";

  const location = document.querySelector('input').value;
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById('data').innerHTML = data.error;
      } else {
          document.getElementById('data').innerHTML = "Location: " + data.location + "<br><br>Description: " + data.description + "<br><br>Temprature: " + data.temprature + " &#8451<br><br>Feels like: " + data.feelslike + " &#8451<br><br>Wind speed: " + data.wind_speed + " km/h<br><br>Cloud cover: " + data.cloudcover + " %<br><br>Precipitation: " + data.precip + " mm<br><br>Humidity: " + data.humidity + " %<br><br>Visibility: " + data.visibility + " km";
      }
    })
  })

})
