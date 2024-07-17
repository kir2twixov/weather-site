
function Submit() {
    Forecast(document.getElementById('hidden-lat').value, document.getElementById('hidden-lon').value)
}

function Forecast(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=Europe%2FMoscow&forecast_days=1`)
    .then(response => response.json())
        .then(data => {
            console.log('Прогноз погоды:');
            const hourlyData = data.hourly || {};
            if (hourlyData.time && hourlyData.temperature_2m) {
                let forecastHTML = '<div id="forecast">';
                forecastHTML += '<h2>Прогноз погоды</h2>';
                forecastHTML += '<ul>';
                hourlyData.time.forEach((time, index) => {
                    const formattedTime = formatTime(time);
                    const temperature = hourlyData.temperature_2m[index];
                    forecastHTML += `<li>Время: ${formattedTime} | Температура: ${temperature}°C</li>`;
                });
                forecastHTML += '</ul>';
                forecastHTML += '</div>';
                document.getElementById('forecast-container').innerHTML = forecastHTML;
            } else {
                console.log('Прогноз недоступен');
            }
        })
        .catch(error => {
            console.error('Ошибка при получении прогноза', error);
        });
}

function formatTime(rawTime) {
    const [date, time] = rawTime.split('T');
    return `${date} ${time}`;
}