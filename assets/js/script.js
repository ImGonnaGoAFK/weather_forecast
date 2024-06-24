const searchFormEl = document.querySelector('#search-form');
const resultTextEl = document.querySelector('#result-text');
const resultContentEl= document.querySelector('#result-content');

function getParams() {
    const searchParamsArr = document.location.search.split('&');
    const query = searchParamsArr[0].split('=').pop();
    const exclude = searchParamsArr[1].split('=').pop();
    const api = searchParamsArr[2].split('=').pop();

    searchApi(query, exclude, api);
}

function showWeather (weatherObj) {
    console.log(weatherObj);

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    const weatherBody = document.createElement('div');
    weatherBody.classList.add('card-body');
    weatherCard.append(weatherBody);

    const bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML +=
    `<strong>${weather.city}`, ` ` , `${weather.date}</strong> <br/>`

    if (weatherObj.temp) {
        bodyContentEl.innerHTML +=
        `Temp: , ${weatherObj.temp} <br/>`;
    }
    if (weatherObj.wind) {
        bodyContentEl.innerHTML +=
        `Wind: , ${weatherObj.wind} <br/>`;
    }

    if (weatherObj.humidity) {
        bodyContentEl.innerHTML +=
        `Humidity: , ${weatherObj.humidity} <br/>`;
    }
    weatherBody.append(bodyContentEl);
    resultContentEl.append(weatherCard);
}

function searchApi (query, exclude, api) {
    let weatherQueryURL = `api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&exclude=current,minutely,hourly&appid=${apiKey}`
    fetch (weatherQueryUrl)
    .then (function (response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    })

    .then(function(locRes) {
        resultTextEl.textContent = locRes.search.query;

        if(!locRes.results.length) {
            console.log('No results found');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        }
        else {
            resultContentEl.textContent = '';
            for (let i = 0; i < locRes.results.length; i++) {
                showWeather(locRes.results[i]);
            }
        }
    })
    .catch(function (error) {
        console.error(error);
    })
}

function handleSearchFormSubmit (event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;
    const apiKey = 'f7ae7c2ad24eafb7ed39958def2a3a06';
    const queryString = `api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&exclude=current,minutely,hourly&appid=${apiKey}`;

    if (!searchInputVal) {
        console.error('You need a search input!');
        return;
    }

    
    getParams();
    location.assign(queryString);
    console.log(searchInputVal);
    console.log(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();