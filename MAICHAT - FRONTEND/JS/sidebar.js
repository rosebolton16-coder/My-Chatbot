// =========================
// MAICHAT SIDEBAR SYSTEM
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const sidebar =
            document.getElementById(
                "sidebar"
            );

        const toggleSidebar =
            document.getElementById(
                "toggleSidebar"
            );

        const newChatBtn =
            document.getElementById(
                "newChat"
            );

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        const chatList =
            document.getElementById(
                "chatList"
            );

        // =====================
        // Sidebar Toggle
        // =====================

        toggleSidebar?.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "collapsed"
                );

            }
        );

        // =====================
        // New Chat
        // =====================

        newChatBtn?.addEventListener(
            "click",
            () => {

                const chat =
                    createConversation();

                currentConversationId =
                    chat.id;

                renderConversationList();

                if(
                    typeof clearChatUI
                    === "function"
                ){

                    clearChatUI();

                }

            }
        );

        // =====================
        // Search Chats
        // =====================

        searchInput?.addEventListener(
            "input",
            e => {

                const query =
                    e.target.value.trim();

                renderFilteredChats(
                    query
                );

            }
        );

        function renderFilteredChats(
            query
        ){

            if(!chatList) return;

            chatList.innerHTML = "";

            const results =
                query
                ? searchConversations(
                    query
                )
                : conversations;

            results.forEach(chat => {

                const item =
                    document.createElement(
                        "div"
                    );

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

                item.textContent =
                    chat.title;

                item.addEventListener(
                    "click",
                    () => {

                        setActiveConversation(
                            chat.id
                        );

                    }
                );

                chatList.appendChild(
                    item
                );

            });

        }

        // =====================
        // Mobile Sidebar Close
        // =====================

        function mobileClose(){

            if(
                window.innerWidth <=
                768
            ){

                sidebar.classList.add(
                    "collapsed"
                );

            }

        }

        document.addEventListener(
            "click",
            e => {

                const clickedInside =
                    sidebar.contains(
                        e.target
                    );

                const clickedToggle =
                    e.target.id ===
                    "toggleSidebar";

                if(
                    window.innerWidth <=
                    768 &&
                    !clickedInside &&
                    !clickedToggle
                ){

                    sidebar.classList.add(
                        "collapsed"
                    );

                }

            }
        );

        // =====================
        // Open sidebar on mobile
        // =====================

        toggleSidebar?.addEventListener(
            "click",
            () => {

                if(
                    window.innerWidth <=
                    768
                ){

                    sidebar.classList.remove(
                        "collapsed"
                    );

                }

            }
        );

        // =====================
        // Resize Handling
        // =====================

        window.addEventListener(
            "resize",
            () => {

                if(
                    window.innerWidth >
                    768
                ){

                    sidebar.classList.remove(
                        "collapsed"
                    );

                }

            }
        );

        renderFilteredChats("");
        mobileClose();

    }
);
