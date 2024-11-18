function handleEnter(event) {
    // Prüfen, ob die Enter-Taste (Keycode 13) gedrückt wurde
    if (event.key === 'Enter') {
        fetchWeather();
    }s
}

function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'bab281d79e5f1e9755a68d754cc313e7'; // API-Schlüssel hier einfügen
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
        })
        .catch(function(error) {
            console.error('Fehler:', error);

            document.body.style.backgroundImage = "url('./Bilder/falsch.png')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            
            var weatherOutput = document.getElementById('weather-output');
            weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
            weatherOutput.style.display = 'block';
        });
}

function displayWeather(data) {
    const weatherOutput = document.getElementById('weather-output');
    if (data && data.weather && data.main) {
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>Beschreibung: ${data.weather[0].description}</p>
        `;
        weatherOutput.style.display = 'block'; // Ausgabe anzeigen
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block'; // Ausgabe anzeigen
    }
}

function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var appMain = document.querySelector('.app-main');

    if (data && data.weather && data.main) {
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>Höchsttemperatur: ${data.main.temp_max} °C</p>
            <p>Tiefsttemperatur: ${data.main.temp_min} °C</p>
            <p>Beschreibung: ${data.weather[0].description}</p>
            <p>Windgeschwindigkeit: ${data.wind.speed}</p>
            <p>Luftfeuchtigkeit: ${data.main.humidity}</p>
        `;
        weatherOutput.style.display = 'block';
 
        var weatherBackgrounds = {
            clear: "url('./Bilder/Klar.jpg')",
            clouds: "url('./Bilder/Bewölkt.jpg')",
            rain: "url('./Bilder/Regen.jpg')",
            drizzle: "url('./Bilder/Regen.jpg')",
            snow: "url('./Bilder/Schnee.jpg')",
            thunderstorm: "url('./Bilder/Sturm.png')",
            sun: "url('./Bilder/Sonne.jpg')",
            mist: "url('./Bilder/Nebel.jpg')",
            fog: "url('./Bilder/Nebel.jpg')"
        };

        var weatherType = data.weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || "";

        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "url('./falsch.png')";
    }
}