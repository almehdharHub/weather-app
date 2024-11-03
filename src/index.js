import "./styles.css";
import { displayWeather } from "./dom.js";

async function fetchWeather(location) {
  const apiKey = "UDHB3GVSMCDWR3YZD5NVVG2S5";
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=${apiKey}`
  );
  const data = await response.json();
  console.log("Raw Data:", data); // Log the raw data
  return data;
}
function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}
function processWeatherData(data) {
  const currentDay = data.days[0];
  const currentConditions = {
    description: currentDay.description,
    location: data.address,
    temperature: currentDay.temp,
    tempMin: currentDay.tempmin,
    tempMax: currentDay.tempmax,
    conditions: currentDay.conditions,
    dayOfWeek: getDayOfWeek(currentDay.datetime), // Add day of the week
  };
  const dailyData = data.days.map((day) => ({
    description: day.description,
    date: day.datetime,
    tempCurrent: day.temp,
    tempMin: day.tempmin,
    tempMax: day.tempmax,
    conditions: day.conditions,
    dayOfWeek: getDayOfWeek(day.datetime), // Add day of the week
  }));
  return { current: currentConditions, forecast: dailyData };
}

document
  .getElementById("locationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const weatherDiv = document.getElementById("weatherInfo");
    weatherDiv.innerHTML = "<p>Loading...</p>"; // Show loading message

    const location = document.getElementById("location").value;
    const weatherData = await fetchWeather(location);
    const processedData = processWeatherData(weatherData);
    console.log(processedData);
    displayWeather(processedData); // Display the data
  });
