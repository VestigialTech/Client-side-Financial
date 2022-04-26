var table = JSON.parse(localStorage.getItem('FavArr'));
const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
var table = JSON.parse(localStorage.getItem('table1'));
//console.log(table);
var favDict = {}
openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);
var favArr = [];

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

    make_Hash_Table(arr){
        
        
        var atb = arr['table'];
        //console.log(atb);
        //tab = new HashTable();
        Object.keys(atb).forEach(key => {
            if(atb[key]!= null){
            //console.log(atb[key])
            this.set(atb[key][0],atb[key][1])} 
          });
    }

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
var HashTab1 = new HashTable();
    //HashTab = table;
    //console.log(HashTab1);
HashTab1.make_Hash_Table(table);

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
		<div class="home-descriptions">
		    <h5 class="description-of-home" id="listing-price"> $ ${price} </h5>
		    <h5 class="description-of-home" id="bed-count">Bedroom/s: ${bedrooms}</h5>
		    <h5 class="description-of-home" id="bath-count">Bath/s: ${baths}</h5>
			<h5 class="description-of-home" id="branding">Company: ${brand}</h5>
			<h5 class="description-of-home" id="address">Address: ${address}</h5>
			<button type="button" class="view-home-button" id=${propertyId} onclick="fullPropertyDetails(event)"> View Listing
                        <i class="fas fa-search"></i>
            <button type="button" class="add-as-favorites" id=${propertyId_dup} onclick="addToFavs(event)"> Favorite
            <i class="fas fa-heart"></i>
            </button>
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


localStorage.setItem('table1',JSON.stringify(HashTab1));
function isNull(obj){
    if(obj === null || obj === 'undefined' ){
       return true;
    }
}

async function fullPropertyDetails(event) {
    //console.log(event.target.id);
    try {
        fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${event.target.id}`, options)
            .then(response => response.json())
            .then(data => displayPropDetails(data))
            .catch(err => console.error(err))
    } catch(err) {
        alert("No property details available")
    }}

function addToFavs(event){
    
    //console.log(event.target.id);
    favArr.push(event.target.id);
    console.log(favArr);
    localStorage.setItem('FavArr',JSON.stringify(favArr));
}

//modal taken from w3schools example
let myModal = document.getElementById("myModal");
myModal.style.display = "none";

async function displayPropDetails(data){
    if(data != null) {
        console.log("displayPropDetails", data);
        document.getElementById("some-text").innerHTML = data.data.list_date;
        myModal.style.display = "block";
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




