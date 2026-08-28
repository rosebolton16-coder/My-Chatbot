// =========================
// MAICHAT VOICE INPUT
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const voiceBtn =
            document.getElementById(
                "voiceBtn"
            );

        const messageInput =
            document.getElementById(
                "messageInput"
            );

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        // =====================
        // Browser Support Check
        // =====================

        if(!SpeechRecognition){

            console.warn(
                "Speech Recognition not supported"
            );

            if(voiceBtn){

                voiceBtn.disabled = true;

                voiceBtn.title =
                    "Voice input not supported in this browser";
            }

            return;
        }

        // =====================
        // Create Recognition
        // =====================

        const recognition =
            new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = true;

        let listening = false;

        // =====================
        // Start Listening
        // =====================

        function startListening(){

            try{

                recognition.start();

            }catch(error){

                console.log(error);

            }

        }

        // =====================
        // Stop Listening
        // =====================

        function stopListening(){

            recognition.stop();

        }

        // =====================
        // Button Click
        // =====================

        voiceBtn?.addEventListener(
            "click",
            () => {

                if(listening){

                    stopListening();

                }else{

                    startListening();

                }

            }
        );

        // =====================
        // Recognition Started
        // =====================

        recognition.onstart = () => {

            listening = true;

            voiceBtn.classList.add(
                "recording"
            );

            voiceBtn.textContent =
                "🔴";

        };

        // =====================
        // Recognition Result
        // =====================

        recognition.onresult =
            event => {

                let transcript = "";

                for(
                    let i = 0;
                    i <
                    event.results.length;
                    i++
                ){

                    transcript +=
                        event.results[i][0]
                        .transcript;

                }

                messageInput.value =
                    transcript;

                messageInput.focus();

            };

        // =====================
        // Recognition End
        // =====================

        recognition.onend = () => {

            listening = false;

            voiceBtn.classList.remove(
                "recording"
            );

            voiceBtn.textContent =
                "🎤";

        };

        // =====================
        // Error Handling
        // =====================

        recognition.onerror =
            event => {

                console.error(
                    "Speech Error:",
                    event.error
                );

                listening = false;

                voiceBtn.classList.remove(
                    "recording"
                );

                voiceBtn.textContent =
                    "🎤";

            };

    }
);
