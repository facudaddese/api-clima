const input = document.querySelector("input");
const btn = document.getElementById("search-btn");
const countryClimate = document.getElementById("country-climate");
const API_KEY = "6c6b7d8b991bcc6273c2040a877aca6b";

btn.addEventListener("click", async () => {
    if (input.value.trim() === "") {
        Toastify({
            text: "Ingrese país o ciudad",
            duration: 3000,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #ff512f, #f09819)",
                fontSize: "16px",
                borderRadius: "8px",
            },
        }).showToast();
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric&lang=es`);
        const data = await res.json();

        if (!res.ok) {
            Toastify({
                text: "País o ciudad no encontrado",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    fontSize: "16px",
                    borderRadius: "8px",
                },
            }).showToast();
            return;
        } else {
            document.getElementById("header").style.height = "60vh";
            document.getElementById("footer").style.color = "#000000";
            document.querySelector(".country-climate").style.padding = "40px 0";
            document.getElementById("footer").style.position = "static";
        }

        countryClimate.innerHTML =
            `
                <h2 class="title-country">${data.name}</h2>
                <div class="flex-container">
                    <div class="temp-container">
                        <h2>${data.main.temp.toFixed(1)}°C</h2> 
                    </div>
                    <div>
                        <div class="characteristics-container">
                            <h3>Viento</h3>
                            <p>${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
                        </div>
                        <div class="characteristics-container">
                            <h3>Ráfagas de viento</h3>
                            <p>${data.wind.gust ? (data.wind.gust * 3.6).toFixed(1) : '0'} km/h</p>
                        </div>
                        <div class="characteristics-container">
                            <h3>Sensación térmica</h3>
                            <p>${data.main.feels_like.toFixed(1)}°C</p>
                        </div>
                    </div>
                </div>
            `
    } catch (error) {
        console.log("Error al consumir la API " + error);
    }
});
