const baseurl = 'https://open-weather13.p.rapidapi.com/city';
function main() {
    function edit_city() {
        document.getElementById("search").addEventListener("click", function () {
            fetchtemp();
        });

        document.getElementById("city_name").addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                fetchtemp();
            }
        });
    }

    async function fetchtemp() {
        console.log("button is clicked");

        // Show loading animation 
        const searchButton = document.getElementById("search");
        const originalIcon = searchButton.innerHTML; //original button icon
        searchButton.innerHTML = '<img src="https://i.gifer.com/ZZ5H.gif" alt="loading" style="width: 20px;">'; // Add loading gif
        document.querySelector(".box").style.display = "none"; // Hide the weather box initially

        let userInput = document.getElementById("city_name").value.trim();

        if (!userInput) {
            alert("Please enter a valid city name.");
            searchButton.innerHTML = originalIcon;  // Reset the button
            return;
        }

        // Construct the new URL properly by adding the city name directly into the path
        let newurl = `${baseurl}/${userInput}/EN`;

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '58e2093b51mshd59d06d9dc729b8p177302jsnddc7cc3c6cbc',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(newurl, options);

            if (!response.ok) {
                throw new Error("City not found or API error.");
            }

            const result = await response.json();
            console.log(result);

            // Hide loading and show weather info
            searchButton.innerHTML = originalIcon;  
            document.querySelector(".box").style.display = "block"; 

            // Fetching data from API response
            let actual_temp = result.main.temp;
            let city = result.name;
            let speed = result.wind.speed;
            let humid = result.main.humidity;

            //convereting the temp from fehrenhite to celcius
            let tempins = `${((actual_temp - 32) / 1.8).toFixed(2)}°C`;

            // Assigning values from API to HTML elements
            let readtemp = document.getElementById("temp");
            let windspeed = document.getElementById("wind");
            let humidity = document.getElementById("humid");

            // Inserting values with icons
            readtemp.innerHTML = ` ${city}: ${tempins}`;
            windspeed.innerHTML = `${speed} m/sec`;
            humidity.innerHTML = `${humid}%`;

            // Styling
            readtemp.style.fontSize = "30px";
            windspeed.style.fontSize = "20px";
            humidity.style.fontSize = "20px";

        } catch (error) {
            console.error(error);
            searchButton.innerHTML = originalIcon;  // Reset the button even on error
            alert("Failed to fetch weather data. Please try again later.");
        }
    }

    edit_city();
}

main();
