'use strict';




const STATE = {
    image: null,
    caption: '',
};



function getDogImage(){
    //return obj with data image url that we save in the store
    return fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
    
}










function render() {
    
}




