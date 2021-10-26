var widgets = document.getElementById("widgets");


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

jokeWidget();
horoscopeWidget();