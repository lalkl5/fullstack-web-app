function myFunction() {
<<<<<<< HEAD
  alert("ПАШЕЛ нннау!");
=======
  alert("Короче меченый, снизу есть чат. Пиши имя и сообщения, можешь общаться с чуваками кто сидит щас на сайте. \n Если че - пиши мне в вк, кнопка под чатом");
>>>>>>> 4039b08 (prod)
}
document.getElementById("myButton").addEventListener("click", function() {
  window.open("https://www.vk.com/lalkl4", "_blank");
});
<<<<<<< HEAD
var socket = new WebSocket("ws://188.235.122.214:228/ws");
=======
var socket = new WebSocket("ws://smartsshtopor.com:80/ws");
>>>>>>> 4039b08 (prod)
var userName = null;

socket.onopen = function(event) {
console.log("WebSocket opened");
};

socket.onmessage = function(event) {
console.log("Received message:", event.data);
const messageContainer = document.getElementById("message-container");
const messageElement = document.createElement("p");
messageElement.innerText = event.data;
messageContainer.appendChild(messageElement);
};

socket.onclose = function(event) {
console.log("WebSocket closed");
};

function sendMessage() {
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value;

<<<<<<< HEAD
  // If userName is not set, set it to the value of nameInput
  if (!userName) {
    userName = nameInput.value;
=======
  // If userName is not set or is empty, prompt the user to enter a name
  if (!userName || userName.trim() === '') {
    userName = nameInput.value.trim();
    if (userName === '') {
      userName = prompt("Enter your name");
      if (!userName || userName.trim() === '') {
        alert("Enter your name");
        return;
      }
      nameInput.value = userName;
    }
>>>>>>> 4039b08 (prod)
    nameInput.disabled = true;
  }

  // Only send message if it is not empty
  if (messageText.trim() !== '') {
    const message = userName + ": " + messageText;

    socket.send(message);
    console.log("Sent message:", message);

    messageInput.value = "";
  }
}

// Send message on pressing enter key
document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    sendMessage();
  }
});
