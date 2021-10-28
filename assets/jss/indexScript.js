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


    localStorage.setItem("userName", userName)
    localStorage.setItem("userCity", userCity)
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
		} else {
			var dadLimit = document.createElement("p");
			dadLimit.textContent = "You have hit your daily limit of 50 Dad Jokes, go outside.";
			widgets.appendChild(dadLimit);
		}

    })
    .catch(err => {
        console.error(err);
    });
}



// function to add horoscope card

var horoscopeWidget = function(horoDataObj) {

    // var userSign = localStorage.getItem("HoroscopeStuff")
	// var userInfo = JSON.parse(userSign);

    var userInfo = localStorage.getItem("HoroscopeStuff")

    console.log(userInfo)
    var userInfo2 = JSON.parse(userInfo)
   
    console.log(userInfo2.Sign)


	if (localStorage.HoroscopeStuff === undefined) {
		console.log("NO HOROSCOPE INFORMATION!");
	} else {
		fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userInfo2.Sign + "&day=today", {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
            "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
             }
        })
        .then(response => response.json())
        .then(function(data) {

            console.log(data)
                
                var horoscopeCard = document.createElement("div");
                horoscopeCard.classList = "card"
                horoscopeCard.setAttribute("style", "width: 300px")

               

                    if (userInfo2.color) {

                        var horoColor = data.color
                        console.log(horoColor)

                           var horoEl = document.createElement("span");
                           horoEl.textContent = horoColor;
                        
                           
                        }
                        
                        
                        
                        widgets.appendChild(horoscopeCard)
                        horoscopeCard.appendChild(horoEl)

            
        })
        .catch(err => {
            console.error(err);
        });
    }
}


if (localStorage.userName === undefined) {
    $(document).ready(function() {
        $('#welcomeModal').foundation('open');
    });
} else {
    horoscopeWidget();
    jokeWidget();
    console.log('You have info. Enjoy.')
}


nameButton.addEventListener("click", nameHandler)
horoscopeButton.addEventListener("click", horoscopeHandler)
dadModal.addEventListener("click", dadJokeHandler)