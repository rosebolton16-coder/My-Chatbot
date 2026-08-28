// =========================
// MAICHAT APP CONTROLLER
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const messageInput =
            document.getElementById(
                "messageInput"
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
        // AUTO RESIZE TEXTAREA
        // =====================

        function autoResize(){

            messageInput.style.height =
                "auto";

            messageInput.style.height =
                Math.min(
                    messageInput.scrollHeight,
                    200
                ) + "px";

        }

        messageInput?.addEventListener(
            "input",
            autoResize
        );

        autoResize();

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

`📎 **File Attached**

**Name:** ${file.name}

**Size:** ${(
    file.size / 1024
).toFixed(2)} KB

**Type:** ${
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
        // HIDE WELCOME
        // =====================

        function hideWelcomeScreen(){

            if(welcomeScreen){

                welcomeScreen.style.display =
                    "none";

            }

        }

        // =====================
        // API PLACEHOLDER
        // =====================

        window.MAICHAT_API = {

            async sendMessage(
                message
            ){

                console.log(
                    "Future AI Request:",
                    message
                );

                return {
                    success:true,
                    response:
                    "Connect OpenAI, Gemini or Grok here."
                };

            }

        };

        // =====================
        // APP READY
        // =====================

        console.log(
            "MAICHAT Premium Loaded"
        );

    }
);
