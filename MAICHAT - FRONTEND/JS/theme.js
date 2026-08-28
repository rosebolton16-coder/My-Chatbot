// =========================
// MAICHAT THEME SYSTEM
// =========================

const THEME_KEY = "maichat_theme";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const body =
            document.body;

        const themeBtn =
            document.getElementById(
                "themeBtn"
            );

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );

        const settingsBtn =
            document.getElementById(
                "settingsBtn"
            );

        const settingsModal =
            document.getElementById(
                "settingsModal"
            );

        const closeSettings =
            document.getElementById(
                "closeSettings"
            );

        // =====================
        // Apply Theme
        // =====================

        function applyTheme(theme){

            body.classList.remove(
                "light-theme",
                "dark-theme"
            );

            body.classList.add(
                theme
            );

            localStorage.setItem(
                THEME_KEY,
                theme
            );

            updateThemeButtons(
                theme
            );

        }

        // =====================
        // Button Labels
        // =====================

        function updateThemeButtons(
            theme
        ){

            const label =
                theme === "light-theme"
                ? "☀ Light"
                : "🌙 Dark";

            if(themeBtn){

                themeBtn.textContent =
                    label;

            }

        }

        // =====================
        // Toggle Theme
        // =====================

        function toggleTheme(){

            const current =
                body.classList.contains(
                    "light-theme"
                )
                ? "light-theme"
                : "dark-theme";

            const next =
                current ===
                "light-theme"
                ? "dark-theme"
                : "light-theme";

            applyTheme(next);

        }

        // =====================
        // Load Saved Theme
        // =====================

        const savedTheme =
            localStorage.getItem(
                THEME_KEY
            ) || "dark-theme";

        applyTheme(savedTheme);

        // =====================
        // Events
        // =====================

        themeBtn?.addEventListener(
            "click",
            toggleTheme
        );

        themeToggle?.addEventListener(
            "click",
            toggleTheme
        );

        // =====================
        // Settings Modal
        // =====================

        settingsBtn?.addEventListener(
            "click",
            () => {

                settingsModal.style.display =
                    "flex";

            }
        );

        closeSettings?.addEventListener(
            "click",
            () => {

                settingsModal.style.display =
                    "none";

            }
        );

        settingsModal?.addEventListener(
            "click",
            e => {

                if(
                    e.target ===
                    settingsModal
                ){

                    settingsModal.style.display =
                        "none";

                }

            }
        );

    }
);
