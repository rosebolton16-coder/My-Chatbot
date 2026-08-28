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

const sendBtn = document.getElementById("sendBtn");

alert(sendBtn ? "Send button found" : "Send button NOT found");

const typingIndicator =
    document.getElementById(
        "typingIndicator"
    );

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );

// =========================
// BACKEND URL
// =========================

const API_URL =
    "https://mai-3-1qoi.onrender.com/chat";

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
        document.createElement(
            "div"
        );

    message.className =
        `message ${role}`;

    if(
        typeof marked !==
        "undefined"
    ){

        message.innerHTML =
            marked.parse(
                content
            );

    }else{

        message.textContent =
            content;

    }

    chatContainer.appendChild(
        message
    );

    if(
        typeof hljs !==
        "undefined"
    ){

        message
            .querySelectorAll(
                "pre code"
            )
            .forEach(block => {

                hljs.highlightElement(
                    block
                );

            });

    }

    scrollToBottom();

    return message;

}

// =========================
// LOAD CONVERSATION
// =========================

function loadConversationMessages(){

    chatContainer.innerHTML =
        "";

    if(
        typeof
        getCurrentConversation
        !== "function"
    ){
        return;
    }

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
// CLEAR CHAT
// =========================

function clearChatUI(){

    chatContainer.innerHTML =
        "";

    if(welcomeScreen){

        welcomeScreen.style.display =
            "flex";

    }

}

// =========================
// TYPING
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

                if(
                    typeof marked !==
                    "undefined"
                ){

                    bubble.innerHTML =
                        marked.parse(
                            text
                        );

                }else{

                    bubble.textContent =
                        text;

                }

                if(
                    typeof hljs !==
                    "undefined"
                ){

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

            }

        },15);

}

// =========================
// SEND MESSAGE
// =========================

async function sendMessage(){

    const text =
        messageInput.value
            .trim();

    if(!text){

        return;

    }

    hideWelcome();

    createMessage(
        "user",
        text
    );

    if(
        typeof
        addMessageToConversation
        === "function"
    ){

        addMessageToConversation(
            "user",
            text
        );

    }

    messageInput.value =
        "";

    showTyping();

    try{

        const response =
            await fetch(
                API_URL,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({
                        message:text
                    })
                }
            );

        const data =
            await response.json();

        hideTyping();

        if(
            !data.success
        ){

            streamResponse(
                "⚠️ AI request failed."
            );

            return;

        }

        streamResponse(
            data.reply
        );

        if(
            typeof
            addMessageToConversation
            === "function"
        ){

            addMessageToConversation(
                "bot",
                data.reply
            );

        }

    }catch(error){

        console.error(
            error
        );

        hideTyping();

        streamResponse(
            "⚠️ Unable to reach MAICHAT servers."
        );

    }

}

// =========================
// EVENTS
// =========================

sendBtn?.addEventListener(
    "click",
    () => {
        alert("Button works");
        sendMessage();
    }
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

        console.log(
            "MAICHAT Connected"
        );

    }
);
alert("chat.js loaded");
