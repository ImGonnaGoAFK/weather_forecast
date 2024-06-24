const searchFormEl = document.querySelector('#search-form');
const resultTextEl = document.querySelector('#result-text');
const resultContentEl= document.querySelector('#result-content');


function handleSearchFormSubmit (event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;
    const apiKey = 'f7ae7c2ad24eafb7ed39958def2a3a06';

    if (!searchInputVal) {
        console.error('You need a search input!');
        return;
    }

    const queryString = `api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&appid=${apiKey}`;

    location.assign(queryString);

    console.log(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function showWeather (weatherObj) {
    console.log(weatherObj);

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    const weatherBody = document.createElement('div');
    weatherBody.classList.add('card-body');
    weatherCard.append(weatherBody);

    
}