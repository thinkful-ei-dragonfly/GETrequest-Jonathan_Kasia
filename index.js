'use strict';
/* global $ */



const STATE = {
  dogs: [],
};

function addDogsToState(dogs){
  STATE.dogs = dogs;
}

function render(){
  const html = STATE.dogs.map(dogImg => {
    return `<li> 
       <img src= ${dogImg}></li>`; 
  });
  return $('ul').html(html.join(''));
}
function getDogImage(n){
  //return obj with data image url that we save in the store
  //If n is greater than 50, return some error.
  return fetch(`https://dog.ceo/api/breeds/image/random/${n}`)
    .then(response => response.json());
}

function handleClick(){
  $('#random-dog-img-form').submit(e => {
    e.preventDefault();
    const inputVar = $('#for-dog-image-entry').val();
    getDogImage(inputVar)
      .then(response => {
        addDogsToState(response.message);
        render();
      });
  });
}   

$(() =>{
  handleClick();
});
