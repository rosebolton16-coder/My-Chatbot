document.addEventListener(
    "DOMContentLoaded",
    () => {

        const messageInput =
            document.getElementById(
                "messageInput"
            );

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

        messageInput?.addEventListener(
            "input",
            autoResize
        );

        autoResize();

        console.log(
            "MAICHAT Premium Loaded"
        );

    }
);
