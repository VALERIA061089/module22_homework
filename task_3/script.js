const statusA = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
  statusA.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  statusA.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    statusA.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    statusA.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  let size = document.querySelector('#size');
  size.textContent = `Размер вашего экрана ${screenWidth}px * ${screenHeight}px`;
});