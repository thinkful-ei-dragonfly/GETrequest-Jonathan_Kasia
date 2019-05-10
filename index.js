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

function getDogImage(n) {
  let error;
  //return obj with data image url that we save in the store
  //If n is greater than 50, return some error.
  return fetch(`https://dog.ceo/api/breeds/image/random/${n}`)
    .then(response => response.json());
}

function handleClick() {
  $('#random-dog-img-form').submit(e => {
    e.preventDefault();
    const inputVar = $('#for-dog-image-entry').val();
    const breedVar = $('#random-dog-breed option:selected').val();
    getDogImage(inputVar)
      .then(response => {
        addDogsToState(response.message);
        render();
      });
  });
}

function getBreedList() {
  return fetch(`https://dog.ceo/api/breeds/list/all`)
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
