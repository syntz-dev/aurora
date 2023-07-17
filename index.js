const inputField = document.getElementById('input');
const chatMessages = document.getElementById('chat-messages');
let newMessage = null;
let prevMessage = null; // Declare a variable to store the previous message

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = inputField.value;

    const data = {
      text: query,
      key: '931605b9-87c1-45af-b9b8-b59b8f5ad17a',
      user_id: 'website-user',
      speak: false,
    };

    fetch('https://api.carterlabs.ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Input:', data.input);
        console.log('Output:', data.output);

        // Create a new message element
        newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.textContent = data.output.text;

        // Append the message element to the chat messages container
        chatMessages.appendChild(newMessage);

        // Scroll to the bottom of the chat messages container
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Fade in the new message element
        show(newMessage.id, true);

        // Fade out and remove the previous message element if any
        if (prevMessage) {
          show(prevMessage.id, false, () => {
            chatMessages.removeChild(prevMessage);
          });
        }

        // Update the previous message reference
        prevMessage = newMessage;

        // Clear the input field
        inputField.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

function show(id, value, callback) {
  const element = document.getElementById(id);
  if (value) {
    // Fade in the element
    element.style.display = 'block';
    setTimeout(() => {
      element.style.opacity = 1;
    }, 100);
  } else {
    // Fade out the element
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = 'none';
      // Call the callback function if provided
      if (callback) callback();
    }, 1000); // This should match the transition duration in CSS
  }
}
