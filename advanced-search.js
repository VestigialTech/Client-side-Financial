"use strict"
const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

//Loading in the variables for getting user information post-login
var table = JSON.parse(localStorage.getItem('table'));
var username = localStorage.getItem('username');
if(username !== null){
    //Logic to add the username on the login page
    username = username.replace(/['"]+/g, '');
    document.getElementById("user").innerHTML = username;
}

var cityinput = localStorage.getItem('cityinp');
console.log(cityinput);

if(cityinput!== null || cityinput !== ""){
    let title = document.getElementById("title");
    title.style.display = "block";//displays "Your Search Results" when search is button is clicked
    let city = cityinput;
    let state = document.getElementById('search-content').value;
    let maxBeds = document.getElementById('max-bedroom').value || '';
    let minBeds = document.getElementById('min-bedroom').value || '';
    let maxBathrooms = document.getElementById('max-bathroom').value || '';
    let minBathrooms = document.getElementById('min-bathroom').value || '';
    let maxPrice = document.getElementById('max-price').value || '';
    let minPrice = document.getElementById('min-price').value || '';
    let saleOrRent = document.getElementById('sale-rent').value || 'for-sale?';
    let propType = document.getElementById('prop-type').value || '';

    try {
        fetch(`https://us-real-estate.p.rapidapi.com/v2/${saleOrRent}offset=0&limit=200&state_code=${state}&city=${city}&sort=newest&price_min=${minPrice}&price_max=${maxPrice}beds_min=${minBeds}&beds_max=${maxBeds}&baths_min=${minBathrooms}&baths_max=${maxBathrooms}&property_type=${propType}`, options)
            .then(response => response.json())
            .then(response => {
                localStorage.removeItem('cityinp');
                let counter = 0;
                let cities = response.data.home_search.results //This grabs the json object and to later map and retrieve properties
                 cities.map(city => {
                     let baths, propertyId, address, bedrooms,propertyId_dup;
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
                         propertyId_dup = cities[counter].property_id;
                         address = cities[counter].location.address.line;
                     }
                     counter++; //Counter iterates through each listing to retrieve property details, properties are then placed into html
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
            <button type="button" class="add-as-favorites" id=${propertyId_dup} onclick="addToFavs(event)"> Favorite
                        <i class="fas fa-heart"></i>
            </button>
		</div>
       </div>
		`;
                })
            })
    } catch {
        alert("Enter another city for listings")
    }

};

                 
//Redefining the same HashTable class due to export/import issue
//Mentioned the issue in the report under Restrictions 
class HashTable {
    constructor() {
      this.table = new Array(50);
      this.size = 0;
    }
    _hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);}
      return hash % this.table.length;
    }
  
    set(key, value) {
      const index = this._hash(key);
      this.table[index] = [key, value];
      this.size++;}
  
    get(key) {
      const target = this._hash(key);
      return this.table[target];}
  
    check_key(key){
      const target = this.get(key);
      if(target === undefined){return false;}
      else return true;
    }

    //Created this custom helper method to recreate the hashtable 
    //by reading the local storage table imported from login.js
    make_Hash_Table(arr){
        if(table !== null) {
            var atb = arr['table'];
            //tab = new HashTable();
            Object.keys(atb).forEach(key => {
                if (atb[key] != null) {
                    this.set(atb[key][0], atb[key][1])
                }
            });
        }}

    check_key_value(key,val){
      const target = this.get(key);
      if(target!==undefined)
      {
      const pw = target[1];
  
      if(val == pw){
          return true;
      }
      else{
          return false;
      }
      }
      else{
          alert("No such username, Please create an account with us");
      }
    }

  }


var HashTab = new HashTable();
var FavArr = [];
var FavDict = {};
HashTab.make_Hash_Table(table);
localStorage.setItem('table',JSON.stringify(HashTab));

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-110%';
}



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
    let title = document.getElementById("title");
    title.style.display = "block";//displays "Your Search Results" when search is button is clicked
    let city = document.getElementById('search-content').value;
    let state = document.getElementById('search-content').value;
    let maxBeds = document.getElementById('max-bedroom').value || '';
    let minBeds = document.getElementById('min-bedroom').value || '';
    let maxBathrooms = document.getElementById('max-bathroom').value || '';
    let minBathrooms = document.getElementById('min-bathroom').value || '';
    let maxPrice = document.getElementById('max-price').value || '';
    let minPrice = document.getElementById('min-price').value || '';
    let saleOrRent = document.getElementById('sale-rent').value || 'for-sale?';
    let propType = document.getElementById('prop-type').value || '';

    try {
        fetch(`https://us-real-estate.p.rapidapi.com/v2/${saleOrRent}offset=0&limit=200&state_code=${state}&city=${city}&sort=newest&price_min=${minPrice}&price_max=${maxPrice}beds_min=${minBeds}&beds_max=${maxBeds}&baths_min=${minBathrooms}&baths_max=${maxBathrooms}&property_type=${propType}`, options)
            .then(response => response.json())
            .then(response => {
                let counter = 0;
                let cities = response.data.home_search.results //This grabs the json object and to later map and retrieve properties
                 cities.map(city => {
                     let baths, propertyId, address, bedrooms,propertyId_dup;
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
                         propertyId_dup = cities[counter].property_id;
                         address = cities[counter].location.address.line;
                     }
                     counter++; //Counter iterates through each listing to retrieve property details, properties are then placed into html
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
            <button type="button" class="add-as-favorites" id=${propertyId_dup} onclick="addToFavs(event)"> Favorite
                        <i class="fas fa-heart"></i>
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

//Makes second API request to fetch more property details
async function fullPropertyDetails(event) {
    try {
        fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${event.target.id}`, options)
            .then(response => response.json())
            .then(data => displayPropDetails(data))
            .catch(err => console.error(err))
    } catch(err) {
        alert("No property details available")
    }}

//modal taken from w3schools example
let myModal = document.getElementById("myModal");
myModal.style.display = "none";

//Displays extra property details when listings is clicked
async function displayPropDetails(data){
    if(data != null) {
    let photo = data.data.photos[1]?.href;
    document.getElementById('content').innerHTML += `
      <div class="images/home-img" >
                <img src="${photo}" style="border-radius: 50px;
                border-color: rgb(90, 50, 168);
                padding: 10px;
                display: block;
                align-items: center;
                justify-content: center;
                position: relative;
                height: 400px;" alt="home image">
            </div>`
        document.getElementById("prop-address").innerHTML = 'Address: ' + data.data.location.address?.line + ' ' + data.data.location.address?.city + ', ' + data.data.location.address?.state_code + ' ' + data.data.location.address?.postal_code;
        document.getElementById("price").innerHTML = 'Listing Price: $' +  data.data?.list_price.toLocaleString();
        document.getElementById("bed-bath").innerHTML = 'Bed/s: ' + data.data.description?.beds + ' ' + 'Bath/s: ' + data.data.description?.baths;
        document.getElementById("brand-company").innerHTML = 'Branding: ' + data.data.branding[1]?.type + ' ' + data.data.branding[1]?.name;
        document.getElementById("brand-agent").innerHTML = 'Branding: ' + data.data.branding[0]?.type + ' ' + data.data.branding[0]?.name;
        document.getElementById("date-listed").innerHTML = 'Listing Date: ' + data.data?.list_date;
        const pnType = data.data.advertisers[0].office.phones[0]?.type;
        document.getElementById("advertiser-pn").innerHTML = 'Phone Number: ' + data.data.advertisers[0].office.phones[0]?.number + ' Type: ' + pnType;
        document.getElementById("listing-type").innerHTML = 'Listing Type: ' + data.data.description?.type;
        document.getElementById("prop-description").innerHTML = 'Description: ' + data.data.description?.text.toLowerCase();
        myModal.style.display = "block";

    }else{
        alert('No additional property details are available!')
    }
}

//closes modal display of property details
function  onCloseModal() {
    myModal.style.display = "none";
}

function traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);
        if (o[i] !== null && typeof(o[i])=="object") {
            if(key === 'text'&& value !== null)
            {var propDescription = [];
                propDescription += (key + " : "+value);
                console.log(propDescription)}
            if(key === 'photo' && value !== null){
                var photos = new Object;
                photos += (key + " : "+value);
                console.log(photos)}//going one step down in the object tree!!
            traverse(o[i],func);
        }
    }
}

//Fetching the first favorite and displaying the request
async function fullFavoritesDetails(event) {
    FavDict[username] = FavArr;
    localStorage.setItem('username',username);
    localStorage.setItem('FavDict',JSON.stringify(FavDict));
    location.href = 'Favorites.html';
    return false;
}

function addToFavs(event){
    
    if(event.target.id!= null || event.target.id!= "" || !FavArr.includes(event.target.id)){
    FavArr.push(event.target.id);
    console.log(FavArr);
    }
    else{
        alert('Listing already added to favorites!');
    }
    
    localStorage.setItem('FavArr',JSON.stringify(FavArr));
}

