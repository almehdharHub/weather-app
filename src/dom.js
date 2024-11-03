export function displayWeather(weatherData) {
  const weatherDiv = document.getElementById("weatherInfo");
  weatherDiv.innerHTML = ""; // Clear previous data

  // Display current conditions
  const currentDiv = document.createElement("div");
  currentDiv.innerHTML = `
        <h2>Current Weather</h2>
        <p>Location: ${weatherData.current.location}</p>
        <p>Day of the Week: ${weatherData.current.dayOfWeek}</p>
        <p>Description: ${weatherData.current.description}</p>
        <p>Average Temperature: ${weatherData.current.temperature}°C</p>
        <p>Min Temperature: ${weatherData.current.tempMin}°C</p>
        <p>Max Temperature: ${weatherData.current.tempMax}°C</p>
        <p>Conditions: ${weatherData.current.conditions}</p>
    `;
  weatherDiv.appendChild(currentDiv);

  // Display 7-day forecast
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Day of the Week</th>
            <th>description</th>
            <th>Average Temperature (°C)</th>
            <th>Min Temperature (°C)</th>
            <th>Max Temperature (°C)</th>
            <th>Conditions</th>
        </tr>
    `;

  weatherData.forecast.forEach((day) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${day.date}</td>
            <td>${day.dayOfWeek}</td>
            <td>${day.description}</td>
            <td>${day.tempCurrent}</td>
            <td>${day.tempMin}</td>
            <td>${day.tempMax}</td>
            <td>${day.conditions}</td>
        `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  weatherDiv.appendChild(table);
}
