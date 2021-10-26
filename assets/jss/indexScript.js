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

var nameHandler = function() {

    var userCity = cityInput.value.trim()

    var userName = nameInput.value.trim()

    console.log(userName)
    console.log(userCity)

    
}

var horoscopeHandler = function() {
    event.preventDefault();
    
    var userSign = horoscopeSign.value
    var userHoroColor = horoColor.checked
    var userHoroComp = horoComp.checked
    var userHoroDate = horoDate.checked
    var userHoroDesc = horoDesc.checked
    var userHoroNumber = horoNumber.checked
    var userHoroTime = horoTime.checked
    var userHoroMood = horoMood.checked

    console.log(userSign)
    console.log(userHoroColor)
    console.log(userHoroComp)
    console.log(userHoroDate)
    console.log(userHoroDesc)
    console.log(userHoroNumber)
    console.log(userHoroTime)
    console.log(userHoroMood)
}



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





var horoscopeWidget = function() {
    
    fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aquarius&day=today", {
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
    
    
    
};

horoscopeWidget();
jokeWidget();



$(document).ready(function() {
    $('#welcomeModal').foundation('open');
});

nameButton.addEventListener("click", nameHandler)
horoscopeButton.addEventListener("click", horoscopeHandler)