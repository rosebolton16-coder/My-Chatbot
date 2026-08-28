// =========================
// MAICHAT CHAT ENGINE
// =========================

const chatContainer =
    document.getElementById(
        "chatContainer"
    );

const messageInput =
    document.getElementById(
        "messageInput"
    );

const sendBtn =
    document.getElementById(
        "sendBtn"
    );

const typingIndicator =
    document.getElementById(
        "typingIndicator"
    );

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );

// =========================
// UTILITIES
// =========================

function scrollToBottom(){

    chatContainer.scrollTop =
        chatContainer.scrollHeight;

}

function hideWelcome(){

    if(welcomeScreen){

        welcomeScreen.style.display =
            "none";

    }

}

// =========================
// CREATE MESSAGE
// =========================

function createMessage(
    role,
    content
){

    const message =
        document.createElement("div");

    message.className =
        `message ${role}`;

    message.innerHTML =
        marked.parse(content);

    chatContainer.appendChild(
        message
    );

    // Highlight code blocks

    message
        .querySelectorAll(
            "pre code"
        )
        .forEach(block => {

            hljs.highlightElement(
                block
            );

        });

    scrollToBottom();

    return message;

}

// =========================
// LOAD CONVERSATION
// =========================

function loadConversationMessages(){

    chatContainer.innerHTML = "";

    const conversation =
        getCurrentConversation();

    if(!conversation){

        return;

    }

    if(
        conversation.messages
        .length === 0
    ){

        if(welcomeScreen){

            welcomeScreen.style.display =
                "flex";
        }

        return;
    }

    hideWelcome();

    conversation.messages.forEach(
        msg => {

            createMessage(
                msg.role,
                msg.content
            );

        }
    );

}

// =========================
// CLEAR UI
// =========================

function clearChatUI(){

    chatContainer.innerHTML = "";

    if(welcomeScreen){

        welcomeScreen.style.display =
            "flex";

    }

}

// =========================
// TYPING INDICATOR
// =========================

function showTyping(){

    typingIndicator.style.display =
        "block";

}

function hideTyping(){

    typingIndicator.style.display =
        "none";

}

// =========================
// STREAM RESPONSE
// =========================

function streamResponse(
    text
){

    hideWelcome();

    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "message bot";

    chatContainer.appendChild(
        bubble
    );

    let index = 0;

    const stream =
        setInterval(() => {

            bubble.textContent =
                text.substring(
                    0,
                    index
                );

            index++;

            scrollToBottom();

            if(
                index >
                text.length
            ){

                clearInterval(
                    stream
                );

                bubble.innerHTML =
                    marked.parse(
                        text
                    );

                bubble
                    .querySelectorAll(
                        "pre code"
                    )
                    .forEach(block => {

                        hljs.highlightElement(
                            block
                        );

                    });

            }

        },15);

}

// =========================
// SEND MESSAGE
// =========================

function sendMessage(){

    const text =
        messageInput.value.trim();

    if(!text){

        return;

    }

    hideWelcome();

    createMessage(
        "user",
        text
    );

    addMessageToConversation(
        "user",
        text
    );

    messageInput.value = "";

    showTyping();

    // TEMP AI DEMO
    // Replace later with API

    setTimeout(() => {

        hideTyping();

        const aiReply =

`Hello 👋

I'm **MAICHAT Premium**.

You can connect me to:

- OpenAI
- Gemini
- Grok

Example code:

\`\`\`javascript
function hello(){
  console.log("MAICHAT");
}
\`\`\`
`;

        streamResponse(
            aiReply
        );

        addMessageToConversation(
            "bot",
            aiReply
        );

    },1200);

}

// =========================
// EVENTS
// =========================

sendBtn?.addEventListener(
    "click",
    sendMessage
);

messageInput?.addEventListener(
    "keydown",
    e => {

        if(
            e.key === "Enter" &&
            !e.shiftKey
        ){

            e.preventDefault();

            sendMessage();

        }

    }
);

// =========================
// INITIAL LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadConversationMessages();

    }
);
