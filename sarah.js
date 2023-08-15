async function query(data) {
  const randomParam = Math.random();
  const modifiedData = { ...data, randomParam };

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
  const randomParam = Math.random();
  const modifiedData = { ...data, randomParam };
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

    //For text
    // const botMessageElement = document.createElement("div")
    // botMessageElement.classList.add("message", "bot-message");
    // botMessageElement.textContent = chatbotResponse.generated_text;

    // messagesContainer.appendChild(botMessageElement)

    const audioData = await query({ inputs: chatbotResponse.generated_text });
    const audioUrl = URL.createObjectURL(audioData);

    messagesContainer.removeChild(loadingIndicator);

    const audioContainer = document.createElement("div");
    audioContainer.classList.add("audio-container");

    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.src = audioUrl;

    audioContainer.appendChild(audioElement);
    messagesContainer.appendChild(audioContainer);

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
    "Let's talk! 🥰",
  ];

  async function animateMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("other-message");
    messagesContainer.appendChild(messageElement);

    for (let i = 0; i <= message.length; i++) {
      messageElement.textContent = message.substring(0, i);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  for (const message of messages) {
    await animateMessage(message);
  }
});

const switcher = document.querySelector(".theme");

switcher.addEventListener("click", () => {
  document.querySelector(".imessage-container").classList.toggle("dark-theme");
  document.querySelector("body").classList.toggle("dark-theme");
});
