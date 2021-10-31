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
    
    
}

// function to say yes or no to dad jokes and set to local storage

var dadJokeHandler = function(event) {

    event.preventDefault();
    
    var dadJokeOption = event.target.dataset.value

    localStorage.setItem("dadJoke", dadJokeOption)

}



// // function to attach dad joke card

// var jokeWidget = function() {
    
//     fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
//             "x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
//         }
//     })
//     .then(response => {
//         response.json().then(function(data) {
            
//             var joke = data.body[0].setup;
//             var punchLine = data.body[0].punchline

//             var jokeCardContainer = document.createElement("div")
//             jokeCardContainer.classList = "column"
            
//             var jokeCard = document.createElement("div");
//             jokeCard.classList = "card";
//             jokeCard.setAttribute("style", "width: 300px")

//             var jokeImg = document.createElement("img")
//             jokeImg.setAttribute("src", "assets/images/Dad-jokes.jpg")
            
//             var jokeSetup = document.createElement("p");
//             jokeSetup.textContent = joke;
            
//             var jokeLine = document.createElement("p");
//             jokeLine.textContent = punchLine
            
//             // var newJokeButton = document.createElement("button")
//             // newJokeButton.textContent = "Get a New Joke";
            
            
//             jokeCard.appendChild(jokeImg)
//             jokeCard.appendChild(jokeSetup);
//             jokeCard.appendChild(jokeLine)
//             jokeCardContainer.appendChild(jokeCard)
//             widgets.appendChild(jokeCardContainer);
//             // jokeCard.appendChild(newJokeButton)
//         })
//     })
//     .catch(err => {
//         console.error(err);
//     });
// }



// function to add horoscope card

var horoscopeWidget = function(horoDataObj) {


    var userInfo = localStorage.getItem("HoroscopeStuff")

    console.log(userInfo)
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
                    horodescriptionEl.textContent = "Horoscope: " + horodescription;
                    
                    horoscopeCard.appendChild(horodescriptionEl)

                }


                // card section for the rest of the horoscope options

                    var horoDataSection = document.createElement("div")
                    horoDataSection.classList = "card-section"
                
                if (userInfo2.color) {
                    
                    var horoColor = data.color
                    
                    var horoColorEl = document.createElement("p");
                    horoColorEl.textContent = "Lucky Color: " + horoColor;
                    
                    
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