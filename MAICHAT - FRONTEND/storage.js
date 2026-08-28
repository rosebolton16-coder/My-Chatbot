// =========================
// MAICHAT STORAGE SYSTEM
// =========================

const STORAGE_KEY = "maichat_conversations";

let conversations = [];
let currentConversationId = null;

// Load saved conversations
function loadConversations() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if(saved){

        conversations =
            JSON.parse(saved);

    }else{

        conversations = [];

    }

}

// Save conversations
function saveConversations(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations)
    );

}

// Create a new chat
function createConversation(){

    const conversation = {

        id: Date.now().toString(),

        title: "New Chat",

        createdAt: new Date().toISOString(),

        messages: []

    };

    conversations.unshift(
        conversation
    );

    currentConversationId =
        conversation.id;

    saveConversations();

    renderConversationList();

    return conversation;

}

// Find current conversation
function getCurrentConversation(){

    return conversations.find(
        chat =>
        chat.id === currentConversationId
    );

}

// Set active conversation
function setActiveConversation(id){

    currentConversationId = id;

    renderConversationList();

    if(typeof loadConversationMessages
        === "function"){

        loadConversationMessages();

    }

}

// Save message to conversation
function addMessageToConversation(
    role,
    content
){

    const conversation =
        getCurrentConversation();

    if(!conversation) return;

    conversation.messages.push({

        role,
        content,
        timestamp:
        Date.now()

    });

    // Update title from first message
    if(
        conversation.messages.length === 1
    ){

        conversation.title =
            content.substring(0,30);

    }

    saveConversations();

    renderConversationList();

}

// Delete conversation
function deleteConversation(id){

    conversations =
        conversations.filter(
            item => item.id !== id
        );

    if(
        currentConversationId === id
    ){

        if(conversations.length){

            currentConversationId =
                conversations[0].id;

        }else{

            const chat =
                createConversation();

            currentConversationId =
                chat.id;

        }

    }

    saveConversations();

    renderConversationList();

}

// Get conversation by ID
function getConversation(id){

    return conversations.find(
        item => item.id === id
    );

}

// Search chats
function searchConversations(query){

    return conversations.filter(chat =>

        chat.title
        .toLowerCase()
        .includes(
            query.toLowerCase()
        )

    );

}

// Render sidebar list
function renderConversationList(){

    const chatList =
        document.getElementById(
            "chatList"
        );

    if(!chatList) return;

    chatList.innerHTML = "";

    conversations.forEach(chat => {

        const item =
            document.createElement("div");

        item.className =
            "chat-item";

        if(
            chat.id ===
            currentConversationId
        ){

            item.classList.add(
                "active"
            );

        }

        item.innerHTML = `
            <span>
                ${chat.title}
            </span>
        `;

        item.onclick = () => {

            setActiveConversation(
                chat.id
            );

        };

        chatList.appendChild(
            item
        );

    });

}

// Initialize storage
loadConversations();

if(
    conversations.length === 0
){

    createConversation();

}else{

    currentConversationId =
        conversations[0].id;

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderConversationList();

    }
);
