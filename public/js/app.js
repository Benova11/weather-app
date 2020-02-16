console.log('client side js');

const weatherForm = document.querySelector('form');
const serach = document.querySelector('input');
const msgOne = document.querySelector('#success');
const msgTwo = document.querySelector('#error');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';

  const location = serach.value;
  fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        msgTwo.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forcast;
      }
    });
  });
});
