"use strict"
const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');


openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-110%';
}
"use strict"

const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

//Checks city and state input to conduct a search, returns a message if missing parameters
function checkCityState() {
    let cityName = document.getElementById('Query').value;
    let state = document.getElementById('state').value;

    if (cityName.length !== 0 && state.length !== 0) {
        document.getElementById('preview-search').innerHTML = '';
    } else {
        alert("Enter city and state")
    }
}

//Event listener that grabs user's input value
document.getElementById("query-listings").addEventListener("click", function (event) {
    event.preventDefault()

    let state = document.getElementById('state').value;
    let city = document.getElementById('Query').value;
    let saleOrRent = document.getElementById('rent-sale').value || 'for-sale?';

    if (!state || !city) { //Checks for empty parameters
        alert('Kindly complete the form!');
        return;
    }
//Makes an API call with fetch using the user's input
    fetch(`https://us-real-estate.p.rapidapi.com/v2/${saleOrRent}offset=0&limit=10&state_code=${state} &city=${city}&sort=newest`, options)
        .then(response => response.json())
        .then(response => {
            let counter = 0;
            let states = response.data.home_search.results;  //This grabs the json object and to later map and retrieve properties
            states.map(state => {
                let baths, propertyId, address, bedrooms;
                for(let i = 0; i < 1; i++){
                    baths = states[counter].description.baths;
                    bedrooms = states[counter].description.beds;
                    propertyId = states[counter].property_id;
                    address = states[counter].location.address.line;
                }
                counter++; //Counter iterates through each listing to retrieve listing details, properties are then placed into html
                document.getElementById('preview-search').innerHTML += ` 

		<div class="preview-item">
            <div class="images/home-img" id="preview-img">
                <img src="${state?.primary_photo?.href}" id="image" alt="primary home image">
            </div>
		<div class="preview-home-descriptions">
		    <h5 class="description-of-home" id="price-listed"> $ ${state?.list_price.toLocaleString()} </h5>
		    <h5 class="description-of-home" id="bed-counts">Bedroom/s: ${bedrooms}</h5>
		    <h5 class="description-of-home" id="bath-counts">Bath/s: ${baths}</h5>
			<h5 class="description-of-home" id="brand">Company: ${state?.branding[0].name}</h5>
			<h5 class="description-of-home" id="addresses">Address: ${address}</h5>
		</div>
       </div>
		`;
            }).catch(err => console.error("Please try your search again"));
        })})

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

//Checks input to conduct a search, returns a message if missing parameters
function checkCity() {
    let cityName = document.getElementById('search-content').value;
    if (cityName.length !== 0) {
        document.getElementById('home').innerHTML = '';
    } else {
        alert("Please enter a city")
    }
}

//Event listener that grabs user's input values
document.getElementById("search-btn").addEventListener("click", function (event) {
    event.preventDefault()

    let city = document.getElementById('search-content').value;
    let state = document.getElementById('search-content').value;
    let maxBeds = document.getElementById('max-bedroom').value || '';
    let maxBathrooms = document.getElementById('max-bathroom').value || '';
    let maxPrice = document.getElementById('max-price').value || '';
    let saleOrRent = document.getElementById('sale-rent').value || 'for-sale?';

    try {
        fetch(`https://us-real-estate.p.rapidapi.com/v2/${saleOrRent}offset=0&limit=200&state_code=${state}&city=${city}&sort=newest&price_max=${maxPrice}&beds_max=${maxBeds}&baths_max=${maxBathrooms}`, options)
            .then(response => response.json())
            .then(response => {
                let counter = 0;
                let cities = response.data.home_search.results //This grabs the json object and to later map and retrieve properties
                 cities.map(city => {
                     let baths, propertyId, address, bedrooms;
                     let price = `${city.list_price}`.toLocaleString();
                     let brand = city.branding[0].name;
                     let primaryPhoto = `${city.primary_photo?.href}`;

                     if(isNull(primaryPhoto || price)){
                        ///find a way to skip to next object
                     }

                     for(let i = 0; i < 1; i++){
                         baths = cities[counter].description.baths;
                         bedrooms = cities[counter].description.beds;
                         propertyId = cities[counter].property_id;
                         address = cities[counter].location.address.line;
                     }
                     counter++; //Counter iterates through each listing to retrieve property details, properties are then placed into html
                    document.getElementById('home').innerHTML += `
		<div class="home-item">
            <div class="images/home-img" >
                <img src="${primaryPhoto}" id="image" alt="home images">
            </div>
		<div class="home-descriptions">
		    <h5 class="description-of-home" id="listing-price"> $ ${price} </h5>
		    <h5 class="description-of-home" id="bed-count">Bedroom/s: ${bedrooms}</h5>
		    <h5 class="description-of-home" id="bath-count">Bath/s: ${baths}</h5>
			<h5 class="description-of-home" id="branding">Company: ${brand}</h5>
			<h5 class="description-of-home" id="address">Address: ${address}</h5>
			<a href="#" class="view-home-button">View Listing</a>
		</div>
       </div>
		`;
                })
            })
    } catch {
        alert("Enter another city for listings")
    }

});

function isNull(obj){
    if(obj === null || obj === 'undefined' ){
       return true;
    }
}
