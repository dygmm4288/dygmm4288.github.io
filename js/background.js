const body = document.body;
const imageRandomNumber = Math.floor(Math.random() * 4);

body.style.background = `url('../images/${imageRandomNumber}.jpg') no-repeat center / cover`;
