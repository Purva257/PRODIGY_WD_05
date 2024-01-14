const apiKey = '538aa38efdca00a567e841a031c92ea6';
const weatherInfoContainer = document.getElementById('weatherInfo');

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;

    if (locationInput.trim() === '') {
        alert('Please enter a location.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationInput)}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;

    const weatherInfoHTML = `
        <h2>${name} Weather</h2>
        <p><strong>Temperature:</strong> ${main.temp} °C</p>
        <p><strong>Condition:</strong> ${weather[0].description}</p>
    `;

    weatherInfoContainer.innerHTML = weatherInfoHTML;
}
