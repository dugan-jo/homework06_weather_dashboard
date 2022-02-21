var submitBtnEl = document.querySelector('.btn');
var inputValueEl = document.querySelector(".inputValue");
var tbodyEl = document.querySelector("#tbody");
var currentDate = document.querySelector('#currentDate');
currentDate = (moment().format("dddd, MMMM Do YYYY"));
var forecastCard = document.querySelector('#forcastCard')
var searchCityBtnEl = document.querySelector('#searchedCity');

var cityId = document.querySelector("#cityId");
var tempId = document.querySelector("#tempId");
var windId = document.querySelector("#windId");
var humidityId = document.querySelector("#humidityId");
var uviId = document.querySelector("#uvId");
var descriptionId = document.querySelector("#descriptionId");
var weatherIcon = document.querySelector("#icon");
var iconEl = document.querySelector('#weatherIcon');



searchHistory = [];
newArray = JSON.parse(localStorage.getItem('searchHistory'))
if (newArray) {
    searchHistory = newArray
    for (var i = 0; i < newArray.length; i++) {
        tbodyEl.innerHTML += `
        <tr>
            <button id="submit" class="btn my-1 text-uppercase btn-block btn-warning">${newArray[i]}</button>
        </tr>`;
    }
} else {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}

function init() {
    var onOpen = searchHistory.slice(-1)
    console.log(onOpen);
    var city_name = onOpen
    console.log(city_name)


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
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

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

                        var forecastTempMaxEl = data['daily'][i + 1]['temp']['max']
                        var forecastTempMinEl = data['daily'][i + 1]['temp']['min']
                        var forecasthumidityEl = data['daily'][i + 1]['humidity']
                        var forecastwindEl = data['daily'][i + 1]['wind_speed']
                        var forecastIconCodeEl = data['daily'][i]['weather'][0]['icon']
                        forecastWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + forecastIconCodeEl + "@2x.png");
                        
                        var new_date = data['daily'][i + 1]['dt'];
                        var date = new Date(new_date * 1000);
                        console.log(date)
                        var date = (moment(date).format("dddd, MMM Do"));

                        $(forecastListEl).append(date + '<br>HIGH: ' + forecastTempMaxEl + '°F <br>LOW: ' + forecastTempMinEl + ' <br>WIND: ' + forecastwindEl + ' mph <br>HUMIDITY: ' + forecasthumidityEl + '%');
                    }
                })
        });
}

init()

submitBtnEl.addEventListener('click', function (event) {
    event.preventDefault()
    addToList()
    clearforecastListEl()
    

    var city_name = (inputValueEl).value
    console.log(city_name);

    array = JSON.parse(localStorage.getItem('searchHistory'))
    console.log(array);

    array.push(city_name);
    localStorage.setItem('searchHistory', JSON.stringify(array))


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
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

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
                        

                        var forecastTempMaxEl = data['daily'][i + 1]['temp']['max']
                        var forecastTempMinEl = data['daily'][i + 1]['temp']['min']
                        var forecasthumidityEl = data['daily'][i + 1]['humidity']
                        var forecastwindEl = data['daily'][i + 1]['wind_speed']
                        var forecastIconCodeEl = data['daily'][i]['weather'][0]['icon']
                        // $(".iconImg").attr("src", "http://openweathermap.org/img/wn/" + forecastIconCodeEl + "@2x.png");

                        forecastWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + forecastIconCodeEl + "@2x.png");

                        var new_date = data['daily'][i + 1]['dt'];
                        var date = new Date(new_date * 1000);
                        console.log(date)
                        var date = (moment(date).format("dddd, MMM Do"));

                        $(forecastListEl).append(date + '<br>HIGH: ' + forecastTempMaxEl + '°F <br>LOW: ' + forecastTempMinEl + ' <br>WIND: ' + forecastwindEl + ' mph <br>HUMIDITY: ' + forecasthumidityEl + '%');
                    }
                });
      
        })
    .catch(e); {
        alert('ERROR: City not found.  Please check the spelling and try again')
    } 

    function clearforecastListEl() {
        $("#forecastCard").empty();
    }
});




function addToList() {
    var city_name = document.querySelector(".inputValue").value;

    tbodyEl.innerHTML += `
        <tr>
            <button id="searchedCity" class="btn my-1 text-uppercase btn-block btn-warning">${city_name}</button>
        </tr>`;
}
        




// OPEN WEATHER INFORMATION - - START - - - - - - - - - - - - - - - - - - - - - - - - -
//
// API CALL - - - - - - - - -
// api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
//
// API KEY - - - - - - - - - -
// a3090942edb39407441508d8acbfb8bd
//
// OPEN WEATHER INFORMATION - - END - - - - - - - - - - - - - - - - - - - - - - - - -