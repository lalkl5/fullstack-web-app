function myFunction() {
    alert("ПАШЕЛ нннау!");
}
document.getElementById("myButton").addEventListener("click", function() {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
});
var socket = new WebSocket("ws://192.168.88.254:8080/ws");
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
    const messageText = messageInput.value.trim();
  
    // If message text is empty or starts with the username, do not send
    if (!messageText || messageText.startsWith(userName + ":")) {
      return;
    }
  
    // If userName is not set, set it to the value of nameInput
    if (!userName) {
      userName = nameInput.value.trim();
      if (!userName) {
        return;
      }
      nameInput.disabled = true;
    }
  
    messageInput.value = "";
    const message = userName + ": " + messageText;
  
    socket.send(message);
    console.log("Sent message:", message);
  }
  