var URL = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=42&state_code=MI&city=Detroit'

const searchBtn = document.getElementById("search-btn");
const city = document.getElementById("search-input");
const homeDetails = document.querySelector('.home-descriptions');
const closeBtn = document.getElementById("home-close-btn");
const URL = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=1&state_code='


const apiFsUrl = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=42&state_code=MI&city=Detroit&sort=newest';


function fetchdata(){
    fetch(apiFsUrl, options)
        .then(response =>
            response.json())
        .then(response =>
            console.log(response.data))
    let html = [];
    html = options.data.map(home_search => {
        return `<p>Search: ${home_search.results}</p>`
    })
        .catch(err =>
            console.error(err));
}
fetchdata();

/*
const apiFsUrl = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=42&state_code=MI&city=Detroit&sort=newest';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};
function fetchData(){
    fetch(apiFsUrl, options)
        .then(response =>
            response.json())
        .then(response =>
            console.log(response.data))
        .catch(err =>
            console.error(err));
}
function listData(postContainerId){
    const postContainerElement = document.getElementById(postContainerId)
    if(!postContainerId)
        return;
    fetchData().then(response =>{
        for (options of options){
            postContainerElement.appendChild(postContainerElement(options));
        }
    }).catch(err =>
        console.error(err));
}
function postData(data){
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', apiFsUrl);
    anchorElement.setAttribute('target', 'blank');
    const postElement = document.createElement('h4');
    anchorElement.innerText = post.title;
    postElement.appendChild(anchorElement);
    return postElement;
}

 */





const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
        'X-RapidAPI-Key': '18cd63294emsh0b9d489e122855ep1b113ajsne2337bf9f996'
    }
};

///Event Listeners
searchBtn.addEventListener('click', getCityData);
document.querySelector('#state').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCityData();
    }
});

function getCityData(){
    let searchInputCity = document.getElementById('Query').value.trim();
    let searchInputState = document.getElementById("state").value.trim();
    fetch(URL + '${searchInputState}' + '&city=' + '${searchInputCity}', options)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
}





function getPropertyDetails(search) {
    fetch(URL , options)
        .then(response => {
            var value = (response.json())
            console.log(value)
            const match = findNestedObject(value, "geo_type", "state");
            console.log(match)
        }).catch(err =>
        console.error(err));
};

getPropertyDetails(Promise.data);




const isObject = (value) => {
    return !!(value && typeof value === "object" && !Array.isArray(value));
};

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

const staircase = {
    step: 5,
    nextStep: {
        step: 4,
        nextStep: {
            step: 3,
            nextStep: {
                step: 2,
                nextStep: {
                    name: "Down here!",
                    step: 1,
                },
            },
        },
    },
};

const match = findNestedObject(staircase, "name", "Down here!");
console.log(match);
// { name: "Down here!", step: 1 }


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
}
/*create a switch case for each example of a search, initial page must have a state and city input

fetch(URL, options)
    .then(response => {
        return response.json();
    })
    .then(function BinarySearchTree(json){
        Object.entries(json.data).map(data =>{
            console.log(data)
        bst.add(json)
         console.log(json)
        }).then(console.log('a')
     /*   document.getElementById('sample').textContext = Object.data.address.time_zone;

