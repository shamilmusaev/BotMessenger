async function query(data) {
    const randomParam = Math.random(); // Генерируем случайный параметр
    const modifiedData = { ...data, randomParam }; // Добавляем его к данным запроса
  
    const response = await fetch(
      "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(modifiedData),
      }
    );
    const result = await response.blob();
    return result;
  }
  
  async function chat(data) {
    const randomParam = Math.random(); // Генерируем случайный параметр
    const modifiedData = { ...data, randomParam }; // Добавляем его к данным запроса
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(modifiedData),
      }
    );
    const result = await response.json();
    return result;
  }
  
  // async function animateMessage(messageText) {
  //   const messageElement = document.createElement("div");
  //   messageElement.classList.add("message", "user-message");
  //   messagesContainer.appendChild(messageElement);
  
  //   const delay = 70;
  
  //   for (let i = 0; i <= messageText.length; i++) {
  //     messageElement.textContent = messageText.substring(0, i);
  //     await new Promise(resolve => setTimeout(resolve, delay));
  //   }
  // }
  
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
      loadingIndicator.classList.add(
        "message",
        "other-message",
        "typing-indicator"
      );
      const dots = document.createElement("span");
      dots.classList.add("dot");
      loadingIndicator.appendChild(dots);
      loadingIndicator.appendChild(dots.cloneNode());
      loadingIndicator.appendChild(dots.cloneNode());
      messagesContainer.appendChild(loadingIndicator);
  
      const chatbotResponse = await chat({ inputs: messageText });
      // const botMessageElement = document.createElement("div")
      // botMessageElement.classList.add("message", "bot-message");
      // botMessageElement.textContent = chatbotResponse.generated_text;
  
      // messagesContainer.appendChild(botMessageElement)
  
      const audioData = await query({ inputs: chatbotResponse.generated_text });
      const audioUrl = URL.createObjectURL(audioData);
  
      messagesContainer.removeChild(loadingIndicator);
  
      const audioElement = document.createElement("audio");
      audioElement.controls = true; // Добавим элементы управления для воспроизведения
      audioElement.src = audioUrl;
      messagesContainer.appendChild(audioElement);
  
      // Прокрутить контейнер к последнему элементу
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
  
  document.addEventListener("DOMContentLoaded", async function () {
    const messagesContainer = document.querySelector(".messages");
    const delay = 10;
  
    const messages = [
      "Hi.",
      "My name is Sarah 😜",
      "Text me, and I will answer you with a voice message 👻",
      "Let's talk! 🥰"
  
    ];
  
    async function animateMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("other-message");
      messagesContainer.appendChild(messageElement);
  
      for (let i = 0; i <= message.length; i++) {
        messageElement.textContent = message.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
  
      await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка перед следующим сообщением
    }
  
    for (const message of messages) {
      await animateMessage(message);
    }
  });
  