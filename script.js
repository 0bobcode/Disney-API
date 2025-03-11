
const apiUrl = "https://api.disneyapi.dev/character";


//get dom elements
const charName = document.getElementById("charecter-name")
const charFilms = document.getElementById("charecter-films")
const charShows = document.getElementById("charecter-shows")
const charImg = document.getElementById("charecter-img")
const parkAttractions = document.getElementById("park-attractions")
const charUrl = document.getElementById("charecter-url")
const randomCharBtn = document.getElementById("random-char")

//function update element 

function processResponse(response) {
    console.log("processing response with status:", response.status)

    if (response.ok) {
        return response.json()
    }

    else {
        throw new Error("http error:", response.status)
    }
}

//fetch charecter data from the API
function fetchCharecterData(){//#D
    
    return fetch(apiUrl)
        .then(processResponse)
        .catch(handleError)
}
function displayData(data) {
    console.log(data.data)
    //the API returns a JSON object that includes a data array with characters
    const characters = data.data
    //if we have any charecters in the array kill them or send them to jail
    if (characters && characters.length > 0) {
        //pick a random charecter from the list
        const randomIndex = Math.floor(Math.random() * characters.length);
        const character = characters[randomIndex];

        charName.textContent = character.name
        
        charFilms.textContent = `🎬 :${character.films}` || "no films avalible"

        //update tv shows first clear the list
        charShows.innerHTML = ""
        if(character.tvShows && character.tvShows.length > 0){
            character.tvShows.forEach(show=>{
                const li = document.createElement("li")
                li.textContent = `📺: ${show}`//#D
                charShows.appendChild(li)
            })
        }

        else{
            charShows.innerHTML = "🚫no tvshows found";
        }
        charImg.src = character.imageUrl || "";
        charImg.alt = character.name || "charImg";

 
        parkAttractions.textContent = character.parkAttractions || "Im sorry but theres no park attractions avalible";
        charUrl.href = character.sourceUrl || "#";
        // charUrl.textContent = "READ A LITTLE BIT More" CED
    }
    else{
        console.log("no character FOUND In a billion years")
    }
    //log the selected charecters the name and films if avalible to the console

}



//write a function to handle the error
function handleError(error) {

    console.error("error fetching data:", error)//#d
}

//function to load a random charecter
function getRandomCharacter(){
    fetchCharecterData().then(displayData)
    
}

getRandomCharacter()

randomCharBtn.addEventListener("click" ,getRandomCharacter)