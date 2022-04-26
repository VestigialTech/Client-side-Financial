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
		<div style="border-color: white 2px" class="home-item">
            <div class="images/home-img" >
                <img src="${primaryPhoto}" style="border-radius: 50px;
border-color: rgb(90, 50, 168);
padding: 20px;
diplay:flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
height: 400px;" id="home-picture" alt="home images">
            </div>
		<div class="home-descriptions">
		    <h5 class="description-of-home" id="listing-price"> $ ${price} </h5>
		    <h5 class="description-of-home" id="bed-count">Bedroom/s: ${bedrooms}</h5>
		    <h5 class="description-of-home" id="bath-count">Bath/s: ${baths}</h5>
			<h5 class="description-of-home" id="branding">Company: ${brand}</h5>
			<h5 class="description-of-home" id="address">Address: ${address}</h5>
			<button type="button" class="view-home-button" id=${propertyId} onclick="fullPropertyDetails(event)"> View Listing
                        <i class="fas fa-search"></i>
            </button> 
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

async function fullPropertyDetails(event) {
    console.log(event.target.id);
    try {
        fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${event.target.id}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    } catch(err) {
        alert("No property details available")

    }}
