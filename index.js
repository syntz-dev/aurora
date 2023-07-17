const inputField = document.getElementById('input');
const chatMessages = document.getElementById('chat-messages');
let lastMessage = null;

inputField.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
const query = inputField.value;

const data = {
text : query,
key : '931605b9-87c1-45af-b9b8-b59b8f5ad17a',
user_id : 'website-user',
speak : false
};

fetch('https://api.carterlabs.ai/chat', {
method : 'POST',
headers : {'Content-Type' : 'application/json'},
body : JSON.stringify(data),
})
.then(response => response.json())
.then(data => {

// Create a new message element
const messageElement = document.createElement('div');
messageElement.classList.add('message');
messageElement.textContent = data.output.text;

// Append the message element to the chat messages container
chatMessages.appendChild(messageElement);

// Scroll to the bottom of the chat messages container
chatMessages.scrollTop = chatMessages.scrollHeight;

// Fade in the message element
setTimeout(() => {messageElement.style.display = 'block';},100);

// Fade out the last message
if (lastMessage) {
lastMessage.classList.add('fade-out');
setTimeout(() => {lastMessage.remove();},500);
}

// Set the current message as the last message
lastMessage = messageElement;

// Clear the input field
inputField.value = '';
})
.catch(error => {console.error('Error:', error);});
}
});
