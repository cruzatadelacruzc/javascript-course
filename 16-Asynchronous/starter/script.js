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

/* const whoIam = function (lat, long) {
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
}; */

const whoIam = async function (lat, long) {
  try {
    const responseGeo = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json`
    );
    const geoCountry = await responseGeo.json();
    console.log(geoCountry);

    if (!responseGeo.ok)
      throw new Error(
        `Uff, problem getting country geoposition(${responseGeo.status})`
      );

    const responseCountry = await fetch(
      `https://restcountries.eu/rest/v2/name/${geoCountry.country}`
    );
    if (!responseGeo.ok)
      throw new Error(
        `Uff, problem getting country data(${responseCountry.status})`
      );

    const dataCountry = await responseCountry.json();
    renderCountry(dataCountry[0]);

    return `You are in ${geoCountry.city}, ${geoCountry.country}`;
  } catch (error) {
    console.error(error);
    renderError(`Upps, something went wrong 💣 ${error.message}`);

    // Reject promise returned from async function
    throw error;
  }
};
/* Very Ugly writte this code but, It's work

 whoIam(20.1431797, -75.2034783)
  .then(city => console.log(`You are at ${city}`))
  .catch(err => console.log(`💣 ${err.message}💣`)); */

/*  Better writte this code. Returning values from asynchronous function */
/* (async function () {
  try {
    const city = await whoIam(20.1431797, -75.2034783);
    console.log(`🤞 Yep, it's work: ${city}`);
  } catch (err) {
    console.log(`💣 ${err.message}💣`);
  }
})();
 */
// Guantanamo -> 20.1431797, -75.2034783
/* whoIam(20.1431797, -75.2034783);
whoIam(52.508, 13.381);
whoIam(19.037, 72.873);
whoIam(-33.933, 18.474); */

// running promises in parallel
const get3Countries = (country1, country2, country3) =>
  Promise.all([
    getJSON(`https://restcountries.eu/rest/v2/name/${country1}`),
    getJSON(`https://restcountries.eu/rest/v2/name/${country2}`),
    getJSON(`https://restcountries.eu/rest/v2/name/${country3}`),
  ]);

(async function () {
  try {
    const data = await get3Countries('tanzania', 'usa', 'canada');
    console.log([...data].flat());
  } catch (error) {
    renderError(err.message);
  }
})();

// last challenge

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    // load image 1
    let currentImg = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    currentImg.style.display = 'none';
    // load image 2
    currentImg = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    currentImg.style.display = 'none';
  } catch (error) {
    err => console.error(err);
  }
};

// create loadAll methods

const loadAll = async function (imgArr = []) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    err => console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
