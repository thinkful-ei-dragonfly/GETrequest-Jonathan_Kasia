
'use strict';
/* global $ */



const STATE = {
  dogs: [],
  breeds: {},
};

function addDogsToState(dogs) {
  STATE.dogs = dogs;
}

function render() {
  const html = STATE.dogs.map(dogImg => {
    return `<li> 
       <img src= ${dogImg}></li>`;
  });
  $('#random-dog-breed').empty();
  Object.keys(STATE.breeds.message).forEach((key) => {
    $('#random-dog-breed').append(`<option value="${key}">${key}</option>`);
  });
  return $('ul').html(html.join(''));
}

function getBreedImage(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .catch(error => alert('Must enter a valid Breed name!'));
}

function getRandomImage(n) {
  return fetch(`https://dog.ceo/api/breeds/image/random/${n}`)
    .then(response => response.json());
}

function handleClick() {
  $('#random-dog-img-form').submit(e => {
    e.preventDefault();
    const inputVar = $('#for-dog-image-entry').val();
    getRandomImage(inputVar)
      .then(response => {
        addDogsToState(response.message);
        render();
      });
  });
  $('#single-breed-dog-img-form').submit(e => {
    e.preventDefault();
    const breedVar = $('#random-dog-breed').val();
    getBreedImage(breedVar)
      .then(response => {
        addDogsToState([response.message]);
        render();
      });
  });
}

function getBreedList() {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
      STATE.breeds = data;
      render();

    });
}

$(() => {
  getBreedList();
  handleClick();
});