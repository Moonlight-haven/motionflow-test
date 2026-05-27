// app-logic.js - The Global Brain of Motion-Flow

function initGlobalNotifications() {
    const updateDot = document.getElementById('updateDot');
    const chatDot = document.getElementById('chatDot');

    // 1. WATCH UPDATES
    const lastSeenUpdates = localStorage.getItem('lastVisitUpdates') || 0;
    firebase.database().ref('updates').limitToLast(1).on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const latestId = Object.keys(data)[0];
            const latestTimestamp = data[latestId].createdAt;

            if (latestTimestamp > lastSeenUpdates) {
                if(updateDot) updateDot.classList.add('active');
            } else {
                if(updateDot) updateDot.classList.remove('active');
            }
        }
    });

    // 2. WATCH LIVE CHAT
    const lastSeenChat = localStorage.getItem('lastVisitChat') || 0;
    firebase.database().ref('messages').limitToLast(1).on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const latestId = Object.keys(data)[0];
            const latestTimestamp = data[latestId].timestamp; // Ensure this matches your message object key

            if (latestTimestamp > lastSeenChat) {
                if(chatDot) chatDot.classList.add('active');
            } else {
                if(chatDot) chatDot.classList.remove('active');
            }
        }
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initGlobalNotifications);