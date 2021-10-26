
var jokeWidget = function(){

var widgets = document.getElementById("#widgets");


    fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "dad-jokes.p.rapidapi.com",
		"x-rapidapi-key": "5b4f00da92mshdc043b28ff0d6c7p1cab71jsn744cc19d64cb"
	}
})
.then(response => {
	response.json().then(function(data) {
        console.log(data)
    });
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
        console.log(data.color)
        console.log(data)
    })
})
.catch(err => {
	console.error(err);
});


var horoscopeColor = document.createElement("div");

horoscopeColor.textContent = data.color

widgets.appendchild(horoscopeColor)
}

// horoscopeWidget();
// jokeWidget();

// $(document).ready(function() {
//     $('#welcomeModal').foundation('open');
// });

