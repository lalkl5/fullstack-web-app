function myFunction() {
  alert("ПАШЕЛ нннау!");
}
document.getElementById("myButton").addEventListener("click", function() {
  window.open("https://www.vk.com/lalkl4", "_blank");
});
var socket = new WebSocket("ws://188.235.122.214:228/ws");
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

  // If userName is not set, set it to the value of nameInput
  if (!userName) {
    userName = nameInput.value;
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
