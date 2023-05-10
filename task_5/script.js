const wsUri = "wss://echo-ws-service.herokuapp.com/";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);

const geo = document.querySelector('.btn_geo');

geo.addEventListener('click', () => {
    fetch('https://www.openstreetmap.org/#map=18/44.03481/42.88089', {mode: 'no-cors'})
      .then((response) => { 
        console.log('response', response);
    })
    const chatOutput = document.querySelector('.chat_output');
    let messageHTML = `<a href='https://www.openstreetmap.org/#map=18/44.03481/42.88089' target='_blank' class='sent'>Геолокация</a>`;
    chatOutput.innerHTML += messageHTML;   
})