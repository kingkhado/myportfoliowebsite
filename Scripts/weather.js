const apiKey = "447317dffe119612b4f68d3f62aafb60"; 
const locationInput = document.getElementById("location");
const getWeatherButton = document.getElementById("get-weather");
const weatherDataDiv = document.getElementById("weather-data");

getWeatherButton.addEventListener("click", async () => {
  const location = locationInput.value;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
  const data = await response.json();
  const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius
  let clothing;
  if (temperature < 15) {
    clothing = "jeans";
  } else {
    clothing = "shorts";
  }
  weatherDataDiv.innerHTML = `
    <p>Temperature: ${temperature.toFixed(2)}°C</p>
    <p>You should wear ${clothing} today!
    scroll to get jeans</p>
  `;
});