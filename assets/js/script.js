const searchFormEl = document.querySelector('#search-form');
const resultTextEl = document.querySelector('#result-text');
const resultContentEl= document.querySelector('#result-content');
const searchInputVal = document.querySelector('#search-input').value;
const searchBtnEl = document.querySelector('#searchBtn')
const searchHistoryEl = document.querySelector('#search-history')

let searchHistoryObj = [];

function updateLocalStorage() {
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistoryObj));
    return searchHistoryObj;
}

// function readLocalStorage() {
//  let history = JSON.parse(localStorage).getItem('weatherHistory');
// }

function renderSearchHistory() {
    searchHistoryEl.innerHTML= '';

    for (let i=0; i < searchHistoryObj.length; i++) {
        const historyList = document.createElement('li');
        const historyString = document.createElement('btn');

        historyString.textContent= searchHistoryObj[i];

        historyString.setAttribute('class', 'history-button');

        historyList.appendChild(historyString);
    }
}

function searchApi (cityName) {

    let weatherAry = [];
    const apiKey = 'f7ae7c2ad24eafb7ed39958def2a3a06';
    const queryString = `/data/2.5/forecast?q=${cityName}&units=imperial&exclude=current,minutely,hourly&appid=${apiKey}`;
    let weatherQueryUrl =  `https://api.openweathermap.org`;

    weatherQueryUrl = `${weatherQueryUrl}${queryString}`;
    console.log(weatherQueryUrl);
    // `https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&exclude=current,minutely,hourly&appid=${apiKey}`

    console.log(weatherQueryUrl)
    fetch (weatherQueryUrl)
    .then (function (response) {
        return response.json();
    })

    .then(function(data) {
        console.log(data);
        for (let i=0; i < data.list.length; i++) {
            let timeIsNotTwelve = data.list[i].dt_txt.split(" ")[1].split(":")[0] != "12";
            if(timeIsNotTwelve){
                continue
            }
            let weatherInfo = {
                city: (data.city.name),
                date: (data.list[i].dt_txt),
                iconId: (data.list[i].weather[0].id),
                temperature: (data.list[i].main.temp),
                wind: (data.list[i].wind.speed),
                humidity: (data.list[i].main.humidity),
            }

            weatherAry.push(weatherInfo);
        }
        
        updateLocalStorage(weatherAry);
        renderForecast(weatherAry)
    });
}

function renderForecast (forecastData) {
    for (let i=0; i< forecastData.length; i++) {
    let iconUrl = `https://openweathermap.org/img/wn`;
    let forecastIdEl = `${forecastData[i].iconId}`;
    let iconIdEl = '11d';
    if (forecastIdEl >= 200 && forecastIdEl <= 235) {
        iconIdEl = "11d"
    }
    else if (forecastIdEl >= 300 && forecastIdEl <= 321) {
        iconIdEl = '09d';
    }
    else if (forecastIdEl >= 500 && forecastIdEl <= 504) {
        iconIdEl = '10d';
    }
    else if (forecastIdEl === 511) {
        iconIdEl = '13d';
    }
    else if (forecastIdEl >= 520 && forecastIdEl <= 531) {
        iconIdEl = '09d';
    }
    else if (forecastIdEl >= 600 && forecastIdEl <= 622) {
        iconIdEl = '13d';
    }
    else if (forecastIdEl >= 700 && forecastIdEl <= 781) {
        iconIdEl = '50d';
    }
    else if (forecastIdEl === 800) {
        iconIdEl = '01d';
    }
    else if (forecastIdEl === 801) {
        iconIdEl = '02d';
    }else if (forecastIdEl === 802) {
        iconIdEl = '03d';
    }else if (forecastIdEl === 803) {
        iconIdEl = '04d';
    }else if (forecastIdEl === 804) {
        iconIdEl = '04d';
    }
    let iconString = `/${iconIdEl}@2x.png`
    iconUrl = `${iconUrl}${iconString}`;
    console.log(iconUrl);
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('future');

    const forecastBody = document.createElement('div');
    forecastBody.classList.add('card-body');
    forecastCard.append(forecastBody);

    const bodyContentEl = document.createElement('div');
    bodyContentEl.setAttribute('class', 'future');
    bodyContentEl.innerHTML +=
        `<strong>${forecastData[i].date}</strong>`
    bodyContentEl.innerHTML +=
        `<strong>Temp: </strong>${forecastData[i].temperature}&deg<br/>`;
    
    bodyContentEl.innerHTML +=
        `<img src="${iconUrl}" /> <br/>`;

    bodyContentEl.innerHTML +=
        `<div>Wind: ${forecastData[i].wind}mph<br/>`;

    bodyContentEl.innerHTML +=
        `<div>Humidity: ${forecastData[i].humidity}%<br>`;
    
    forecastBody.append(bodyContentEl);
    resultContentEl.append(forecastCard);
}
    
    // forecastBody.append(titleCityEl, titleDateEl, bodyContentEl);
    // resultContentEl.append(forecastCard);


    console.log((forecastData[0].date))
}




function handleSearchFormSubmit (event) {
    event.preventDefault();
    const searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
        console.error('You need a search input!');
        return;
    }
    searchHistoryObj.push(searchInputVal);
    searchApi(searchInputVal);
}

searchBtnEl.addEventListener('click', handleSearchFormSubmit);
