var widgets = document.getElementById("widgets");
var nameInput = document.getElementById("name");
var cityInput = document.getElementById("city");
var nameButton = document.getElementById("namebutton");
var horoscopeButton = document.getElementById("horoscopebutton");
var horoscopeSign = document.getElementById("horosign")
var horoColor = document.getElementById("horoColor")
var horoscopeModal = document.getElementById("horoscopeModal")
var horoComp = document.getElementById("horoComp")
var horoDate = document.getElementById("horoDate")
var horoDesc = document.getElementById("horoDesc")
var horoNumber = document.getElementById("horoNumber")
var horoTime = document.getElementById("horoTime")
var horoMood = document.getElementById("horoMood")
var dadModal = document.getElementById("dadModal")
var butttonYes = document.getElementById("buttonyes")
var welcomeBanner = document.getElementById("welcomeBanner")
var resetButton = document.getElementById("reset")
var cryptoTog = document.getElementById("toggler1")
var weatherTog = document.getElementById("toggler3")
var dadTog = document.getElementById("toggler4")
var horoTog = document.getElementById("toggler2")
var cryptoSection = document.getElementById("column-main")



var HoroscopeStuff = [];



// function to collect username and city and set it to local storage

var nameHandler = function() {

    var userCity = cityInput.value.trim()

    var userName = nameInput.value.trim()

    localStorage.setItem("userName", userName)
    localStorage.setItem("userCity", userCity)

    bannerCreation();
    weatherGet(userCity);

}

// function to collect horoscope data and set it to local storage

var horoscopeHandler = function(event) {
    event.preventDefault();

	var horoDataObj = {
		Sign: horoscopeSign.value,
		color: horoColor.checked,
		compatability: horoComp.checked,
		description: horoDesc.checked,
		lucky_number: horoNumber.checked,
		lucky_time: horoTime.checked,
		mood: horoMood.checked,
    };


	localStorage.setItem("HoroscopeStuff", JSON.stringify(horoDataObj));

    horoscopeWidget();
    
    
}

// function to say yes or no to dad jokes and set to local storage

var dadJokeHandler = function(event) {

    event.preventDefault();
    
    var dadJokeOption = event.target.dataset.value

    

    localStorage.setItem("dadJoke", dadJokeOption)

    jokeWidget();

}

//functions to toggle applications




// cryptoTog.addEventListener("click", cryptoToggler)
// weatherTog.addEventListener("click", weatherToggler)
// dadTog.addEventListener("click", dadToggler)

var horoToggler = function() {
    if (horoSection.className === "column") {
        horoSection.className = "column hide"
    }
    else {
        horoSection.className = "column"
    }
}

var cryptoToggler = function() {
    if (cryptoSection.className === "column") {
        cryptoSection.className = "column hide"
    }
    else {
        cryptoSection.className = "column"
    }
}

var weatherToggler = function() {
    if (weatherSection.className === "column") {
        weatherSection.className = "column hide"
    }
    else {
        weatherSection.className = "column"
    }
}

var dadToggler = function() {
    if (jokeCardSection.className === "column") {
        jokeCardSection.className = "column hide"
    }
    else {
        jokeCardSection.className = "column"
    }
}

// function to attach dad joke card

var jokeWidget = function() {
    
    
    fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
            "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
        }
    })
    .then(response => {
        response.json().then(function(data) {
            
            
            var joke = data.body[0].setup;
            var punchLine = data.body[0].punchline
            var jokeChoice = localStorage.getItem("dadJoke")
        
            console.log(jokeChoice)
        
            if (jokeChoice === "true") {

            var jokeCardContainer = document.createElement("div")
            jokeCardContainer.classList = "column"
            jokeCardContainer.id = "jokeCardSection" 
            
            var jokeCard = document.createElement("div");
            jokeCard.classList = "card";
            jokeCard.setAttribute("style", "width: 300px")

            var jokeImg = document.createElement("img")
            jokeImg.setAttribute("src", "assets/images/Dad-jokes.jpg")
            
            var jokeSetup = document.createElement("h5");
            jokeSetup.classList = "card-divider"
            jokeSetup.textContent = joke;
            
            var jokeLine = document.createElement("p");
            jokeLine.classList = "card-section"
            jokeLine.textContent = punchLine
            
            // var newJokeButton = document.createElement("button")
            // newJokeButton.textContent = "Get a New Joke";
            
            
            jokeCard.appendChild(jokeImg)
            jokeCard.appendChild(jokeSetup);
            jokeCard.appendChild(jokeLine)
            jokeCardContainer.appendChild(jokeCard)
            widgets.appendChild(jokeCardContainer);
            // jokeCard.appendChild(newJokeButton)
            }
        })
    })

    .catch(err => {
        console.error(err);
    });
}



// function to add horoscope card

var horoscopeWidget = function(horoDataObj) {


    var userInfo = localStorage.getItem("HoroscopeStuff")

    
    var userInfo2 = JSON.parse(userInfo)
   
    var userSign = userInfo2.Sign

console.log(userSign)

	if (localStorage.HoroscopeStuff === undefined) {
		console.log("NO HOROSCOPE INFORMATION!");
	} else {
		fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userSign + "&day=today", {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
            "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
             }
        })
        .then(response => response.json())
        .then(function(data) {

            console.log(data)
                
                var horoCardContainer = document.createElement("div")
                horoCardContainer.classList = "column"
                horoCardContainer.id = "horoSection"

                var horoscopeCard = document.createElement("div");
                
                
                horoscopeCard.classList = "card"
                horoscopeCard.setAttribute("style", "width: 300px")
                
                var horoSign = document.createElement("img")
                horoSign.setAttribute("src", "assets/images/" + userSign + ".jpg")
                horoscopeCard.appendChild(horoSign)
                
                if (userInfo2.description) {
                    
                    var horodescription = data.description
                    
                    
                    var horodescriptionEl = document.createElement("h5");
                    horodescriptionEl.classList = "card-divider"
                    horodescriptionEl.textContent = horodescription;
                    
                    horoscopeCard.appendChild(horodescriptionEl)

                }

                // card section for the rest of the horoscope options

                    var horoDataSection = document.createElement("div")
                    horoDataSection.classList = "card-section"
                
                if (userInfo2.color) {
                    
                    var horoColor = data.color

                    var horoColorEl = document.createElement("p");
                    horoColorEl.textContent = "Lucky Color: " + horoColor;
                    horoColorEl.setAttribute("style", "background-color: " + horoColor )
                    
                    
                    horoDataSection.appendChild(horoColorEl)
                }
                
                        if (userInfo2.compatability) {
                            
                            
                            var horoCompatibility = data.compatibility
                            
                            
                            
                            var horoCompatibilityEl = document.createElement("p");
                            horoCompatibilityEl.textContent = "Compatible with: " + horoCompatibility;
                            
                            
                            horoDataSection.appendChild(horoCompatibilityEl)                        
                        }
                        
                        
                        if (userInfo2.lucky_number) {
                            
                            var horolucky_number = data.lucky_number
                            
                            
    
                               var horolucky_numberEl = document.createElement("p");
                               horolucky_numberEl.textContent = "Lucky Number: " + horolucky_number;
                               
                               horoDataSection.appendChild(horolucky_numberEl)
                        }

                        if (userInfo2.lucky_time) {

                            var horolucky_time = data.lucky_time
                           
        
                            var horolucky_timeEl = document.createElement("p");
                            horolucky_timeEl.textContent = "Lucky Time: " + horolucky_time;
                                   
                            horoDataSection.appendChild(horolucky_timeEl)
                        }

                        if (userInfo2.mood) {

                            var horomood = data.mood
                           
        
                            var horomoodEl = document.createElement("p");
                            horomoodEl.textContent = "Today's Mood: " + horomood;
                                   
                            horoDataSection.appendChild(horomoodEl)
                        }
                        
                        horoscopeCard.appendChild(horoDataSection)
                        horoCardContainer.appendChild(horoscopeCard)
                        widgets.appendChild(horoCardContainer)

            
        })
        .catch(err => {
            console.error(err);
        });
    }
}

// weather card
var weatherGet = function(userCity) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=c76096fafe8cde85ece92131d9372eb5';
    fetch(weatherUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                var weatherDataObj = {
                    name: userCity,
                    temp: data.main.temp,
                    desc: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                };
                localStorage.setItem("WeatherInfo", JSON.stringify(weatherDataObj));
                weatherWidget(weatherDataObj);
            }) 
        }
    })
};

var weatherWidget = function(weatherDataObj) {

    var weatherDataObj = JSON.parse(localStorage.getItem('WeatherInfo'));

    var cityTemp = parseInt(weatherDataObj.temp);

    weatherCardContainer = document.createElement('div');
    weatherCardContainer.classList = "column";
    weatherCardContainer.id = "weatherSection";

    var weatherCardMain = document.createElement('div');
    weatherCardMain.classList = "card"
    weatherCardMain.setAttribute("style", "width: 300px");

    var weatherCardHead = document.createElement('div');
    weatherCardHead.classList = "card-divider";
    weatherCardHead.textContent = 'Current Weather';

    var weatherCardSection = document.createElement('div');
    weatherCardSection.classList = "card-section";
    
    var weatherCardContent = document.createElement('ul');
    weatherCardContent.setAttribute("style", "list-style: none")
    weatherCardContent.textContent = weatherDataObj.name;
    
    var weatherCardTemp = document.createElement('li');
    weatherCardTemp.textContent = cityTemp + '°F';
    weatherCardContent.appendChild(weatherCardTemp);

    var weatherCardDesc = document.createElement('li');
    weatherCardDesc.textContent = weatherDataObj.desc;
    weatherCardContent.appendChild(weatherCardDesc);

    var weatherCardHumid = document.createElement('li');
    weatherCardHumid.textContent = 'Humidity: ' + weatherDataObj.humidity + "%";
    weatherCardContent.appendChild(weatherCardHumid);

    var weatherCardWind = document.createElement('li');
    weatherCardWind.textContent = 'Wind Speed: ' + weatherDataObj.wind + ' mph';
    weatherCardContent.appendChild(weatherCardWind);

    weatherCardSection.appendChild(weatherCardContent);
    weatherCardMain.appendChild(weatherCardHead);
    weatherCardMain.appendChild(weatherCardSection);
    weatherCardContainer.appendChild(weatherCardMain);
    widgets.appendChild(weatherCardContainer);

};

var bannerCreation = function() {

    var name = localStorage.getItem("userName")
    console.log(name)

    var welcomeBox = document.createElement("div")
    welcomeBox.classList = "columns small-8 grid-x align-middle"

    var welcomeHeader = document.createElement("h2")
    
    welcomeHeader.textContent = "Welcome to EarlyBird, " + name + "!"

    welcomeBox.appendChild(welcomeHeader)

    welcomeBanner.appendChild(welcomeBox)


}

var firstLoad = function(){

if (localStorage.userName === undefined) {
    $(document).ready(function() {
        $('#welcomeModal').foundation('open');
    });
} else {
    horoscopeWidget();
    bannerCreation();
    jokeWidget();
    weatherWidget();
}
};

var resetSettings = function () {

    welcomeBanner = ""
    widgets = ""
    
    console.log("hello")
    
    localStorage.clear();

    firstLoad();

    location.reload();

    
}
resetButton.addEventListener("click", resetSettings)
horoTog.addEventListener("click", horoToggler)
dadTog.addEventListener("click", dadToggler)
weatherTog.addEventListener("click", weatherToggler)
cryptoTog.addEventListener("click", cryptoToggler)

nameButton.addEventListener("click", nameHandler)
horoscopeButton.addEventListener("click", horoscopeHandler)
dadModal.addEventListener("click", dadJokeHandler)

firstLoad();