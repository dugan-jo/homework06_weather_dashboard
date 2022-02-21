var submitBtnEl = document.querySelector('.btn'); 
var inputValueEl = document.querySelector(".inputValue"); 
var tbodyEl = document.querySelector("#tbody"); 
var forecastCard = document.querySelector('#orcastCard');
var currentDate = document.querySelector('#currentDate');
currentDate = (moment().format("dddd, MMMM Do YYYY")); 

//moment().add(1, 'days').calendar()  < moment.js to get five days out.

var forecastCard = document.querySelector('#forcastCard')

var cityId = document.querySelector("#cityId");
var tempId = document.querySelector("#tempId");
var windId = document.querySelector("#windId");
var humidityId = document.querySelector("#humidityId");
var uviId = document.querySelector("#uvId");
var descriptionId = document.querySelector("#descriptionId");
var weatherIcon = document.querySelector("#icon");
var iconEl = document.querySelector('#weatherIcon');



// var localStoreEl = localStorage
// for (var i = 0; i < localStorage.length; i++) {
//     if (localStorage[i]) {
//         localStoreEl = localStorage[i]
//     }
// }




submitBtnEl.addEventListener('click', function () {
    addToList()
    clearforecastListEl()
    setLocalStorage()
    var city_name = (inputValueEl).value
    console.log(city_name);
    var URLrequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&units=imperial&include=current&appid=be572520864e1db4aa70fb4266c17cf8"
    fetch(URLrequest)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var nameEl = data['name'];
            var countryEl = data['sys']['country']
            var tempEl = data['main']['temp']
            var windEl = data['wind']['speed']
            var humidityEl = data['main']['humidity']
            var lat = data['coord']['lat']
            var lon = data['coord']['lon']
            var iconCode = data['weather'][0]['icon']
            $("#weatherIcon").attr("src","http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

            var descriptionEl = data['weather'][0]['description']
            

            cityId.innerHTML = nameEl + ',    ' + countryEl + ' <br> ' + currentDate  
            tempId.innerHTML = 'CURRENT TEMP: ' + tempEl + '°F'
            windId.innerHTML = 'WIND SPEED: ' + windEl + ' mph'
            humidityId.innerHTML = 'HUMIDITY: ' + humidityEl + '%'
            descriptionId.innerHTML = descriptionEl

        
            var URLrequestTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=be572520864e1db4aa70fb4266c17cf8"
            fetch(URLrequestTwo)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    var uviEl = data['daily'][0]['uvi'];

                    uviId.innerHTML = 'UV index: ' + uviEl;
                    

                    if (uviEl < 2) {
                        $(uviId).addClass('p-1 mb-2 bg-success rounded text-white')
                    } else if (uviEl > 2 && uviEl < 5) {
                        $(uviId).addClass('p-1 bg-warning rounded text-dark')
                    } else if (uviEl > 5 && uviEl < 7) {
                        $(uviId).addClass('p-1 mb-2 orange rounded text-dark')
                    } else {
                        $(uviId).addClass('p-1 mb-2 bg-danger rounded text-dark')
                    }
                })
        });

    function setLocalStorage () {
        localStorage.setItem(city_name, city_name)
        
    }

    function clearforecastListEl() {
        $("#forecastCard").empty();
    }

    var URLrequestThree = "https://api.openweathermap.org/data/2.5/forecast?q=" + city_name + "&units=imperial&cnt=5&appid=be572520864e1db4aa70fb4266c17cf8"
    fetch(URLrequestThree)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            forecast = data['list']
            // console.log(forecast);

            for (var i = 0; i < 5; i++) {
                newCard = $('<div>')
                newCard.addClass('card text-white m-1 p-1 bg-dark')
                newCard.appendTo('#forecastCard')

                var forecastListEl = $('<p>');
                forecastWeatherIcon = $('<img>')

                forecastListEl.addClass('card-text m-1')
                forecastWeatherIcon.addClass('iconImg')

                forecastListEl.appendTo(newCard)
                forecastWeatherIcon.appendTo(newCard)

                var forecastTempEl = data['list'][i]['main']['temp']
                var forecasthumidityEl = data['list'][i]['main']['humidity']
                var forecastwindEl= data['list'][i]['wind']['speed']
                var forecastIconCodeEl = data['list'][i]['weather'][0]['icon']
                $(".iconImg").attr("src","http://openweathermap.org/img/wn/" + forecastIconCodeEl + "@2x.png");

                var new_date = moment(currentDate, "DD-MM-YYYY").add(1, 'days');
                  
                $(forecastListEl).append(new_date + '<br>TEMP: ' + forecastTempEl + '°F <br>WIND: ' + forecastwindEl + ' mph <br>HUMIDITY: ' + forecasthumidityEl + '%');
            }
        });
            
    function addToList() {
        var city_name = document.querySelector(".inputValue").value;
        // alert("you searched for: " + city_name);
        tbodyEl.innerHTML += `
            <tr>
                <button id="submit" class="btn my-1 text-uppercase btn-block btn-warning">${city_name}</button>
            </tr>`;
    }
});
        
        // OPEN WEATHER INFORMATION - - START - - - - - - - - - - - - - - - - - - - - - - - - -
        //
        // API CALL - - - - - - - - -
        // api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
        //
        // API KEY - - - - - - - - - -
        // a3090942edb39407441508d8acbfb8bd
        //
        // OPEN WEATHER INFORMATION - - END - - - - - - - - - - - - - - - - - - - - - - - - -
