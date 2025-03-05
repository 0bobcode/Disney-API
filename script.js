const apiUrl = "https://api.disneyapi.dev/character"
const charName = document.getElementById("charecter-name")
const charFilms = document.getElementById("charecter-films")
const charShows = document.getElementById("charecter-shows")

function processResponse(response){
    console.log("processing response with status:", response.status)

    if(response.ok){
        return response.json()
    }

    else{
        throw new Error("http error:", response.status)
    }
}

function displayData(data){
    // console.log(data.data)
    //the API returns a JSON object that includes a data array with characters
    const characters =  data.data
    //if we have any charecters in the array 
    if(characters&&characters.length>0){
        //pick a random charecter from the list
        const randomIndex = Math.floor(Math.random()*characters.length);
        const character = characters[randomIndex]
        charName.textContent = character.name
    }
    //log the selected charecters the name and films if avalible to the console
    
}


function handleError(error){
    console.error("error fetching data:", error)
}

fetch(apiUrl)
 .then(processResponse)
 .then(displayData)
 .catch(handleError)
