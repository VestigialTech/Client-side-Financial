"use strict"

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

function checkCityState() {
    let cityName = document.getElementById('Query').value;
    let state = document.getElementById('state').value;
    console.log(cityName, state);
    if (cityName.length !== 0 && state.length !== 0) {
        document.getElementById('preview-search').innerHTML = '';
    } else {
        alert("Enter city and state")
    }
}


document.getElementById("query-listings").addEventListener("click", function (event) {
    event.preventDefault()

    let state = document.getElementById('state').value;
    let city = document.getElementById('Query').value || null;
    let saleOrRent = document.getElementById('rent-sale').value || 'for-sale?';

    if (!state || !city) {
        alert('Kindly complete the form!');
        return;
    }

    console.log(state, city, saleOrRent);
    fetch(`https://us-real-estate.p.rapidapi.com/v2/${saleOrRent}offset=0&limit=10&state_code=${state} &city=${city}&sort=newest`, options)
        .then(response => response.json())
        .then(response => {
            let states = response.data.home_search.results;
            states.map(state => {
                document.getElementById('preview-search').innerHTML += `

		<div class="preview-item">
            <div class="images/home-img" id="preview-img">
                <img src="${state?.primary_photo?.href}" id="image" alt="home images">
            </div>
		<div class="preview-home-descriptions">
		    <h5 class="description of the home"> $ ${state?.list_price}</h5>

			<h5 class="brand">Company Name: ${state?.branding[0].name}</h5>
		</div>
       </div>
		`;
            })
        })
        .catch(err => console.error(alert("Please try your search again")));

});