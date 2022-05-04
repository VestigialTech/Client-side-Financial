const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};
var favdict = JSON.parse(localStorage.getItem('FavDict'));
//Loading in the variables for getting user information post-login
var username = localStorage.getItem('username');

//Logic to add the username on the login page
username = username.replace(/['"]+/g, '');
document.getElementById("user").innerHTML = username;


var favArr = favdict[username];

fullPropertyDetails(favArr);

async function fullPropertyDetails(arr) {
    arr.forEach(prop => {
        if(prop!= null || prop!= ""){
            fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${prop}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let price = data.data.list_price;
                let bedrooms = data.data.description.beds;
                let baths = data.data.description.baths;
                let brand = "hi"
                let address = data.data.location.address.line;
                let propertyId = prop;
                let primaryPhoto = `${data.data.photos[0]?.href}`;
                console.log(price,bedrooms,baths,brand,address,propertyId);
                document.getElementById('home').innerHTML += `
		<div style="border-color: white" class="home-item">
            <div class="images/home-img" >
                <img src="${primaryPhoto}" style="border-radius: 50px;
        border-color: rgb(90, 50, 168);
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 400px;" id="home-picture" alt="home images">
            </div>
		<div class="home-descriptions"><ul class =" preview-home-descriptions"><li>
		    <p class="description-of-home" id="listing-price"> Price: $${price} </p>
		    <p class="description-of-home" id="bed-count">Bedroom/s: ${bedrooms}</p>
		    <p class="description-of-home" id="bath-count">Bath/s: ${baths}</p>
			<p class="description-of-home" id="branding">Company: ${brand}</p>
			<p class="description-of-home" id="address">Address: ${address}</p></li></lu>
			<button type="button" class="view-home-button" id=${propertyId} onclick="fullPropertyDetails(event)"> View Listing
                        <i class="fas fa-search"></i>
            </button>
            <button type="button" class="remove-as-favorites" id=${prop} onclick="removeFromFavs(event)"> Remove Favorite
                        <i class="fas fa-heart"></i>
            </button>
		</div>
       </div>
		`;
            })
        }


    });
}

function removeFromFavs(event){

    favArr.pop(event.target.id);
    favdict[username] = favArr;
    localStorage.setItem('FavDict',JSON.stringify(favdict));
}

function signoutTasks(){
  localStorage.removeItem('username');
}
