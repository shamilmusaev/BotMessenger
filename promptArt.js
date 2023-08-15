async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  
  async function animateMessage(messageText) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "user-message");
    messagesContainer.appendChild(messageElement);
  
    const delay = 70;
  
    for (let i = 0; i <= messageText.length; i++) {
      messageElement.textContent = messageText.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  const generateButton = document.getElementById("send-button");
  const messageInput = document.getElementById("message-input");
  const messagesContainer = document.querySelector(".messages");
  
  generateButton.addEventListener("click", async () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== "") {
      const userMessageElement = document.createElement("div");
      userMessageElement.classList.add("message", "user-message");
      userMessageElement.textContent = messageText;
      messagesContainer.appendChild(userMessageElement);
      messageInput.value = "";
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
      const loadingIndicator = document.createElement("div");
      loadingIndicator.classList.add("message", "other-message", "typing-indicator");
      const dots = document.createElement("span");
      dots.classList.add("dot");
      loadingIndicator.appendChild(dots);
      loadingIndicator.appendChild(dots.cloneNode());
      loadingIndicator.appendChild(dots.cloneNode());
      messagesContainer.appendChild(loadingIndicator);
  
      const imageData = await query({ inputs: messageText });
      const imageUrl = URL.createObjectURL(imageData);
  
      messagesContainer.removeChild(loadingIndicator);
  
      const imageElement = document.createElement("img");
      imageElement.classList.add("img_container");
      imageElement.src = imageUrl;
      imageElement.alt = "Not available";
      messagesContainer.appendChild(imageElement);
  
  
      // Прокрутить контейнер к последнему элементу
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", async function () {
    const messagesContainer = document.querySelector(".messages");
    const delay = 10;
  
    const messages = [
      "Hello. Type a prompt and get awesome images 😜",
      "For example ",
      "Surreal illustration of Stockholm camera zoom 0.5 🇸🇪",
      "Space scene in Van Gogh style 🖼️",
      "Cityscape at night in cyberpunk style 🏙️",
      "Make sure to add to your prompt as much details as possible", 
      "Have fun 😊"
    ];
  
    async function animateMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("other-message");
      messagesContainer.appendChild(messageElement);
  
      for (let i = 0; i <= message.length; i++) {
        messageElement.textContent = message.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
  
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
  
    for (const message of messages) {
      await animateMessage(message);
    }
  });
  
  
  
  