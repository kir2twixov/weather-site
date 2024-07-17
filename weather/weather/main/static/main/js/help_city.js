
const input = document.getElementById('my-city');
const datalist = document.getElementById('cities');

input.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const response = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1&language=ru&format=json`)
        .then(response => response.json())
        .then(data => {
            datalist.innerHTML = "";

            data.results.forEach(result => {
                const cityName = result.name;
                document.getElementById('hidden-lat').value = result.latitude;
                document.getElementById('hidden-lon').value = result.longitude;
                const option = document.createElement('option');
                option.value = cityName;
                datalist.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});