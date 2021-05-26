'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (data, classNeighbour = '') => {
  console.log(data);
  const html = `
     <article class="country ${classNeighbour}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = (url, msgError = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${msgError} (${response.status})`);
    return response.json();
  });
};
/* const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    renderCountry(data);
  });
}; */

const getCountry = country =>
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country no found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');
      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country no found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`🔥 ${err} 🔥 `);
      renderError(`🔥 This went wrong 🔥. ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

btn.addEventListener('click', () => getCountry('portugal'));

const whoIam = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Uff, problem with geoposition ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(`You are looking for ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Uff, Country no found ${response.status}`);
      return response.json();
    })
    .then(countries => {
      console.log(
        `${countries[0].name} has borders with:${countries[0].borders}`
      );
      renderCountry(countries[0]);
    })
    .catch(err => console.error(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// Guantanamo -> 20.1431797, -75.2034783
whoIam(20.1431797, -75.2034783);
whoIam(52.508, 13.381);
whoIam(19.037, 72.873);
whoIam(-33.933, 18.474);
