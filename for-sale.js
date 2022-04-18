var URL = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=42&state_code=MI&city=Detroit'
const searchBtn = document.getElementById("search-btn");
const city = document.getElementById("search-input");
const homeDetails = document.querySelector('.home-descriptions');
const closeBtn = document.getElementById("home-close-btn");
///const URL = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=1&state_code='
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

function getPropertyDetails(search) {
    fetch(URL , options)
        .then(response => {
            var value = (response.json())
            console.log(value)
            const match = findNestedObject(Object, "baths", "2");
            console.log(match)
        }).catch(err =>
        console.error(err));
};

getPropertyDetails(Object.data);

//Checks if it's an Object and not an Array
const isObject = (value) => {
    return !!(value && typeof value === "object" && !Array.isArray(value));
};


//Takes an object with a key and value to find for recursive purposes
const findNestedObject = (object = {}, keyToMatch = "", valueToMatch = "") => {
    if (isObject(object)) {
        const entries = Object.entries(object);

        for (let i = 0; i < entries.length; i += 1) {
            const [objectKey, objectValue] = entries[i];

            if (objectKey === keyToMatch && objectValue === valueToMatch) {
                return object;
            }

            if (isObject(objectValue)) {
                const child = findNestedObject(objectValue, keyToMatch, valueToMatch);

                if (child !== null) {
                    return child;
                }
            }
        }
    }

    return null;
};

///Event Listeners on enter and on click

//searchBtn.addEventListener('click', getCityData);
/*document.querySelector('state').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCityData();
    }
});*/

/*function getCityData(){
    let searchInputCity = document.getElementById('Query').value.trim();
    let searchInputState = document.getElementById("state").value.trim();
    fetch(URL + '${searchInputState}' + '&city=' + '${searchInputCity}', options)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
}*/

////////////////////////////
function iterateData(obj){
    for (property in obj){
        if(typeof(obj[property]) == 'object') {
            iterateData(obj[property]);
        } else {
            if(property == 'results' || property == 'data'){
                console.log(obj[property])
            }
        }
    }
};

/*create a switch case for each example of a search, initial page must have a state and city input*/


