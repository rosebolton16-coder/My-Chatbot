// =========================
// MAICHAT APP CONTROLLER
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // =====================
        // ELEMENTS
        // =====================

        const messageInput =
            document.getElementById(
                "messageInput"
            );

        const sendBtn =
            document.getElementById(
                "sendBtn"
            );

        const fileInput =
            document.getElementById(
                "fileInput"
            );

        const welcomeScreen =
            document.getElementById(
                "welcomeScreen"
            );

        // =====================
        // SEND BUTTON STATE
        // =====================

        if(sendBtn){

            sendBtn.disabled = true;

        }

        // =====================
        // AUTO RESIZE TEXTAREA
        // =====================

        function autoResize(){

            if(!messageInput){
                return;
            }

            messageInput.style.height =
                "auto";

            messageInput.style.height =
                Math.min(
                    messageInput.scrollHeight,
                    200
                ) + "px";

        }

        // =====================
        // UPDATE SEND BUTTON
        // =====================

        function updateSendButton(){

            if(
                !messageInput ||
                !sendBtn
            ){
                return;
            }

            sendBtn.disabled =
                messageInput.value
                    .trim() === "";

        }

        // =====================
        // INPUT EVENTS
        // =====================

        messageInput?.addEventListener(
            "input",
            () => {

                autoResize();

                updateSendButton();

            }
        );

        autoResize();

        updateSendButton();

        // =====================
        // HIDE WELCOME SCREEN
        // =====================

        function hideWelcomeScreen(){

            if(welcomeScreen){

                welcomeScreen.style.display =
                    "none";

            }

        }

        // =====================
        // SHOW WELCOME SCREEN
        // =====================

        function showWelcomeScreen(){

            if(welcomeScreen){

                welcomeScreen.style.display =
                    "flex";

            }

        }

        // =====================
        // SEND MESSAGE
        // =====================

        function sendMessage(){

            const text =
                messageInput.value
                    .trim();

            if(!text){
                return;
            }

            hideWelcomeScreen();

            if(
                typeof createMessage
                === "function"
            ){

                createMessage(
                    "user",
                    text
                );

            }

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

            messageInput.value = "";

            autoResize();

            updateSendButton();

            // Future AI Request

            window.MAICHAT_API
                .sendMessage(text)
                .then(result => {

                    if(
                        typeof createMessage
                        === "function"
                    ){

                        createMessage(
                            "bot",
                            result.response
                        );

                    }

                    if(
                        typeof
                        addMessageToConversation
                        === "function"
                    ){

                        addMessageToConversation(
                            "bot",
                            result.response
                        );

                    }

                });

        }

        // =====================
        // SEND BUTTON CLICK
        // =====================

        sendBtn?.addEventListener(
            "click",
            sendMessage
        );

        // =====================
        // ENTER TO SEND
        // =====================

        messageInput?.addEventListener(
            "keydown",
            event => {

                if(
                    event.key === "Enter" &&
                    !event.shiftKey
                ){

                    event.preventDefault();

                    sendMessage();

                }

            }
        );

        // =====================
        // FILE UPLOAD
        // =====================

        fileInput?.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                if(!file){
                    return;
                }

                hideWelcomeScreen();

                const fileMessage =

`📎 File Attached

Name: ${file.name}

Size: ${(
    file.size / 1024
).toFixed(2)} KB

Type: ${
    file.type ||
    "Unknown"
}`;

                if(
                    typeof createMessage
                    === "function"
                ){

                    createMessage(
                        "user",
                        fileMessage
                    );

                }

                if(
                    typeof
                    addMessageToConversation
                    === "function"
                ){

                    addMessageToConversation(
                        "user",
                        fileMessage
                    );

                }

                fileInput.value = "";

            }
        );

        // =====================
        // SUGGESTION CARDS
        // =====================

        document
            .querySelectorAll(
                ".suggestion-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "click",
                    () => {

                        if(
                            !messageInput
                        ){
                            return;
                        }

                        messageInput.value =
                            card.textContent
                                .trim();

                        autoResize();

                        updateSendButton();

                        messageInput.focus();

                    }
                );

            });

        // =====================
        // API PLACEHOLDER
        // =====================

        window.MAICHAT_API = {

            async sendMessage(
                message
            ){

                console.log(
                    "AI Request:",
                    message
                );

                return {

                    success:true,

                    response:
                    "Connect OpenAI, Gemini, DeepSeek or Grok API here."

                };

            }

        };

        // =====================
        // GLOBAL METHODS
        // =====================

        window.MAICHAT = {

            hideWelcomeScreen,

            showWelcomeScreen,

            sendMessage

        };

        // =====================
        // READY
        // =====================

        console.log(
            "MAICHAT Premium Loaded"
        );

    }
);
