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

var HoroscopeStuff = [];



// function to collect username and city and set it to local storage

var nameHandler = function() {

    var userCity = cityInput.value.trim()

    var userName = nameInput.value.trim()

    console.log(userName)
    console.log(userCity)

    localStorage.setItem("userName", userName)
    localStorage.setItem("userCity", userCity)
}

// function to collect horoscope data and set it to local storage

var horoscopeHandler = function(event) {
    event.preventDefault();

	var horoDataObj = {
		sign: horoscopeSign.value,
		color: horoColor.checked,
		compatability: horoComp.checked,
		description: horoDesc.checked,
		number: horoNumber.checked,
		time: horoTime.checked,
		mood: horoMood.checked,
	};
    
    // var userSign = horoscopeSign.value
    // var userHoroColor = horoColor.checked
    // var userHoroComp = horoComp.checked
    // var userHoroDate = horoDate.checked
    // var userHoroDesc = horoDesc.checked
    // var userHoroNumber = horoNumber.checked
    // var userHoroTime = horoTime.checked
    // var userHoroMood = horoMood.checked

    // localStorage.setItem("userSign", userSign)
    // localStorage.setItem("userHoroColor", userHoroColor)
    // localStorage.setItem("userHoroComp", userHoroComp)
    // localStorage.setItem("userHoroDate", userHoroDate)
    // localStorage.setItem("userHoroDesc", userHoroDesc)
    // localStorage.setItem("userHoroNumber", userHoroNumber)
    // localStorage.setItem("userHoroTime", userHoroTime)
    // localStorage.setItem("userHoroMood", userHoroMood)

	localStorage.setItem("HoroscopeStuff", JSON.stringify(horoDataObj));
    
    
}

// function to say yes or no to dad jokes and set to local storage

var dadJokeHandler = function(event) {

    event.preventDefault();

    console.dir(event)
    var dadJokeOption = event.target.textContent



    console.log(dadJokeOption)
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
            
            var jokeCard = document.createElement("div");
            jokeCard.classList = "card";
            jokeCard.setAttribute("style", "width: 300px")
            
            var jokeSetup = document.createElement("p");
            jokeSetup.textContent = joke;
            
            var jokeLine = document.createElement("p");
            jokeLine.textContent = punchLine
            
            var newJokeButton = document.createElement("button")
            newJokeButton.textContent = "Get a New Joke";
            
            
            widgets.appendChild(jokeCard);
            jokeCard.appendChild(jokeSetup);
            jokeCard.appendChild(jokeLine)
            jokeCard.appendChild(newJokeButton)
        })
    })
    .catch(err => {
        console.error(err);
    });
}



// function to add horoscope card

var horoscopeWidget = function(horoDataObj) {

    var userSign = localStorage.getItem("HoroscopeStuff")
	var userInfo = JSON.parse(userSign);

	if (localStorage.HoroscopeStuff === undefined) {
		console.log("NO HOROSCOPE INFORMATION!");
	} else {
		fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userInfo.sign + "&day=today", {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
            "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
        }
    })
    .then(response => {
        response.json().then(function(data) {

            var color = data.color 
            
            var horoscopeCard = document.createElement("div");
            horoscopeCard.classList = "card"
            horoscopeCard.setAttribute("style", "width: 300px")
            
            var horoscopeColor = document.createElement("span");
            horoscopeColor.textContent = color;
            
            widgets.appendChild(horoscopeCard)
            horoscopeCard.appendChild(horoscopeColor)
            
            console.log(data)
        })
    })
    .catch(err => {
        console.error(err);
    });
	}

    // fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userInfo.sign + "&day=today", {
    //     "method": "POST",
    //     "headers": {
    //         "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
    //     }
    // })
    // .then(response => {
    //     response.json().then(function(data) {

    //         var color = data.color 
            
    //         var horoscopeCard = document.createElement("div");
    //         horoscopeCard.classList = "card"
    //         horoscopeCard.setAttribute("style", "width: 300px")
            
    //         var horoscopeColor = document.createElement("span");
    //         horoscopeColor.textContent = color;
            
            
            
    //         widgets.appendChild(horoscopeCard)
    //         horoscopeCard.appendChild(horoscopeColor)
            
    //         console.log(data)
    //     })
    // })
    // .catch(err => {
    //     console.error(err);
    // });
    
    
    
};




// if else statement to check for local storage values and either run modals or display cards using previously stored data
horoscopeWidget();
jokeWidget();


$(document).ready(function() {
    $('#welcomeModal').foundation('open');
});


nameButton.addEventListener("click", nameHandler)
horoscopeButton.addEventListener("click", horoscopeHandler)
dadModal.addEventListener("click", dadJokeHandler)