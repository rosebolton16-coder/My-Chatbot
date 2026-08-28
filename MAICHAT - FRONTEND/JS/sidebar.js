// =========================================================
// MAICHAT SIDEBAR CONTROLLER
// Mobile + Desktop responsive sidebar
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const newChatBtn = document.getElementById("newChat");
    const searchInput = document.getElementById("searchInput");
    const chatList = document.getElementById("chatList");

    if (!sidebar || !toggleBtn) {
        console.warn("MAICHAT: Sidebar elements not found.");
        return;
    }

    // =====================================================
    // MOBILE BREAKPOINT
    // =====================================================

    const mobileBreakpoint = 768;

    function isMobile() {
        return window.innerWidth <= mobileBreakpoint;
    }

    // =====================================================
    // CREATE MOBILE OVERLAY
    // =====================================================

    let overlay = document.querySelector(".sidebar-overlay");

    if (!overlay) {

        overlay = document.createElement("div");

        overlay.className = "sidebar-overlay";

        document.body.appendChild(overlay);

    }

    // =====================================================
    // ADD OVERLAY STYLE
    // =====================================================

    const overlayStyle = document.createElement("style");

    overlayStyle.textContent = `
    
        .sidebar-overlay {
            position: fixed;
            inset: 0;
            z-index: 90;

            background: rgba(0, 0, 0, 0.55);

            opacity: 0;
            visibility: hidden;

            pointer-events: none;

            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);

            transition:
                opacity 0.25s ease,
                visibility 0.25s ease;
        }

        .sidebar-overlay.active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        @media (min-width: 769px) {
            .sidebar-overlay {
                display: none !important;
            }
        }

    `;

    document.head.appendChild(overlayStyle);

    // =====================================================
    // OPEN SIDEBAR
    // =====================================================

    function openSidebar() {

        if (isMobile()) {

            sidebar.classList.remove("collapsed");

            overlay.classList.add("active");

            document.body.classList.add(
                "sidebar-open"
            );

        } else {

            sidebar.classList.remove("collapsed");

            overlay.classList.remove("active");

        }

        toggleBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    // =====================================================
    // CLOSE SIDEBAR
    // =====================================================

    function closeSidebar() {

        sidebar.classList.add("collapsed");

        overlay.classList.remove("active");

        document.body.classList.remove(
            "sidebar-open"
        );

        toggleBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    // =====================================================
    // TOGGLE SIDEBAR
    // =====================================================

    function toggleSidebar() {

        const isOpen =
            !sidebar.classList.contains(
                "collapsed"
            );

        if (isOpen) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }

    // =====================================================
    // HAMBURGER CLICK
    // =====================================================

    toggleBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleSidebar();

        }
    );

    // =====================================================
    // CLICK OUTSIDE SIDEBAR
    // =====================================================

    overlay.addEventListener(
        "click",
        () => {

            closeSidebar();

        }
    );

    // =====================================================
    // ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !sidebar.classList.contains(
                    "collapsed"
                )
            ) {

                closeSidebar();

            }

        }
    );

    // =====================================================
    // NEW CHAT
    // =====================================================

    newChatBtn?.addEventListener(
        "click",
        () => {

            // Clear current messages

            const chatContainer =
                document.getElementById(
                    "chatContainer"
                );

            if (chatContainer) {

                chatContainer.innerHTML = "";

            }

            // Show welcome screen

            const welcome =
                document.getElementById(
                    "welcomeScreen"
                );

            if (welcome) {

                welcome.style.display =
                    "flex";

            }

            // Clear input

            const input =
                document.getElementById(
                    "messageInput"
                );

            if (input) {

                input.value = "";

                input.style.height =
                    "auto";

                input.focus();

            }

            // Close mobile sidebar

            if (isMobile()) {

                closeSidebar();

            }

            // Tell storage system if available

            if (
                typeof createNewConversation ===
                "function"
            ) {

                createNewConversation();

            }

        }
    );

    // =====================================================
    // SEARCH CHAT HISTORY
    // =====================================================

    searchInput?.addEventListener(
        "input",
        () => {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const chatItems =
                chatList?.querySelectorAll(
                    ".chat-item"
                );

            if (!chatItems) {
                return;
            }

            chatItems.forEach(
                item => {

                    const text =
                        item.textContent
                            .toLowerCase();

                    if (
                        !searchTerm ||
                        text.includes(searchTerm)
                    ) {

                        item.style.display =
                            "";

                    } else {

                        item.style.display =
                            "none";

                    }

                }
            );

        }
    );

    // =====================================================
    // CLOSE SIDEBAR WHEN CHAT IS SELECTED
    // =====================================================

    chatList?.addEventListener(
        "click",
        event => {

            const chatItem =
                event.target.closest(
                    ".chat-item"
                );

            if (!chatItem) {
                return;
            }

            if (isMobile()) {

                closeSidebar();

            }

        }
    );

    // =====================================================
    // HANDLE WINDOW RESIZE
    // =====================================================

    let previousMobileState =
        isMobile();

    window.addEventListener(
        "resize",
        () => {

            const currentMobileState =
                isMobile();

            // Only react when crossing
            // the mobile breakpoint

            if (
                currentMobileState !==
                previousMobileState
            ) {

                if (currentMobileState) {

                    // On mobile start closed

                    closeSidebar();

                } else {

                    // On desktop start closed
                    // to match the collapsed
                    // ChatGPT-style layout

                    closeSidebar();

                }

                previousMobileState =
                    currentMobileState;

            }

        }
    );

    // =====================================================
    // INITIAL STATE
    // =====================================================

    closeSidebar();

    // =====================================================
    // EXPOSE CONTROLLER
    // =====================================================

    window.MAICHATSidebar = {

        open: openSidebar,

        close: closeSidebar,

        toggle: toggleSidebar,

        isOpen: () => {

            return !sidebar.classList.contains(
                "collapsed"
            );

        }

    };

    console.log(
        "MAICHAT Sidebar initialized."
    );

});
