"use strict"

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};


//Event listener for
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
                let cities = response.data.home_search.results
                 cities.filter(Boolean).map(city => {
                     let baths = '', propertyId = '', address ='';
                     for(let i = 0; i < 1; i++){
                         baths = cities[counter].description.baths;
                         propertyId = cities[counter].property_id;
                         address = cities[counter].location.address.line;
                     }
                     console.log(address)
                     counter++;
                    document.getElementById('home').innerHTML += `
		<div class="home-item">
            <div class="images/home-img" >
                <img src="${city.primary_photo?.href}" id="image" alt="home images">
            </div>
		<div class="home-descriptions">
		    <h5 class="description-of-home" id="listing-price"> $ ${city?.list_price} </h5>
		    <h5 class="description-of-home" id="bath-count">Baths: ${baths}</h5>
			<h5 class="description-of-home" id="branding">Company Name: ${city?.branding[0].name}</h5>
			<h5 class="description-of-home" id="bath-count">Address: ${address}</h5>
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

function checkCity() {
    let cityName = document.getElementById('search-content').value;
    if (cityName.length !== 0) {
        document.getElementById('home').innerHTML = '';
    } else {
        alert("Please enter a city")
    }
}
///try using getData function to get deeper into the nesting