const searchFormEl = document.querySelector("#search-form");
const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");
const searchInputVal = document.querySelector("#search-input").value;
const searchBtnEl = document.querySelector("#searchBtn");
const searchHistoryEl = document.querySelector("#search-history");

let searchHistoryObj = JSON.parse(localStorage.getItem("weatherHistory")) || [];

function updateLocalStorage() {
  localStorage.setItem("weatherHistory", JSON.stringify(searchHistoryObj));
}

function renderSearchHistory() {
  searchHistoryEl.innerHTML = "";
  searchHistoryObj.forEach((city) => {
    const historyItem = document.createElement("li");
    const historyBtn = document.createElement("button");
    historyBtn.textContent = city;
    historyBtn.classList.add("history-button");
    historyBtn.onclick = () => searchApi(city);
    historyItem.appendChild(historyBtn);
    searchHistoryEl.appendChild(historyItem);
  });
}

function searchApi(cityName) {
  const apiKey = "f7ae7c2ad24eafb7ed39958def2a3a06";
  const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&exclude=current,minutely,hourly&appid=${apiKey}`;
  fetch(weatherQueryUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .then((data) => {
      const weatherAry = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((item) => ({
          city: data.city.name,
          date: item.dt_txt,
          iconId: item.weather[0].id,
          temperature: item.main.temp,
          wind: item.wind.speed,
          humidity: item.main.humidity,
        }));

      updateLocalStorage();
      renderForecast(weatherAry);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderForecast(forecastData) {
    resultContentEl.innerHTML = '';
    forecastData.forEach(data => {
        const iconUrl = `https://openweathermap.org/img/wn/${determineIcon(data.iconId)}@2x.png`;
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('future');

        const forecastBody = document.createElement('div');
        forecastBody.classList.add('card-body');
        forecastBody.innerHTML = `
            <strong>${data.date}</strong><br>
            <strong>${data.city}</strong><br>
            <img src="${iconUrl}" /><br>
            <strong>Temp: </strong>${data.temperature}°F<br>
            <strong>Wind: </strong>${data.wind}mph<br>
            <strong>Humidity: </strong>${data.humidity}%
        `;
        forecastCard.appendChild(forecastBody);
        resultContentEl.appendChild(forecastCard);
    });
}

function determineIcon(iconId) {
    if (iconId >= 200 && iconId <= 232) return '11d'; 
    if (iconId >= 300 && iconId <= 321) return '09d'; 
    if (iconId >= 500 && iconId <= 531) return '10d'; 
    if (iconId >= 600 && iconId <= 622) return '13d';
    if (iconId >= 701 && iconId <= 781) return '50d';
    if (iconId === 800) return '01d'; 
    if (iconId >= 801 && iconId <= 804) return (iconId === 801 ? '02d' : '03d' + (iconId === 804 ? '1' : ''));
    return '01d';
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchInputVal = document.querySelector('#search-input').value.trim();
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    searchHistoryObj.push(searchInputVal);
    updateLocalStorage();
    renderSearchHistory();
    searchApi(searchInputVal);
}

searchBtnEl.addEventListener('click', handleSearchFormSubmit);
renderSearchHistory();
