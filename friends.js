function searchUsers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');
    
    const results = users.filter(user => 
        (user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)) &&
        user.email !== currentUser
    );

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    const friends = JSON.parse(localStorage.getItem('friends')) || {};
    const currentFriends = friends[currentUser] || [];
    const requests = JSON.parse(localStorage.getItem('requests')) || {};

    container.innerHTML = results.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3><a href="profile.html?email=${user.email}">${user.firstName} ${user.lastName}</a></h3>
                <p>${user.email}</p>
            </div>
            <div class="user-actions">
                ${currentFriends.includes(user.email) ? 
                    '<button class="chat-btn" onclick="window.location.href=\'chat.html?with=${user.email}\'">Chat</button>' :
                requests[currentUser]?.includes(user.email) ? 
                    '<button disabled>Request Sent</button>' :
                    '<button onclick="sendRequest(\'${user.email}\')">Add Friend</button>'}
            </div>
        </div>
    `).join('');
}

// Friend Request System
let currentUser = localStorage.getItem('currentUser');
let friends = JSON.parse(localStorage.getItem('friends') || {};
let requests = JSON.parse(localStorage.getItem('requests') || {};

// Initialize data structures
if (!friends[currentUser]) friends[currentUser] = [];
if (!requests[currentUser]) requests[currentUser] = [];

// Search Users
function searchUsers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const results = users.filter(user => 
        (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
        && user.email !== currentUser
    );

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    container.innerHTML = results.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3>${user.firstName} ${user.lastName}</h3>
                <p>${user.email}</p>
            </div>
            <div class="user-actions">
                ${friends[currentUser].includes(user.email) ? 
                    '<button onclick="openChat(\'${user.email}\')">Chat</button>' :
                    requests[currentUser].includes(user.email) ? 
                    '<button disabled>Request Sent</button>' :
                    '<button onclick="sendRequest(\'${user.email}\')">Add Friend</button>'}
            </div>
        </div>
    `).join('');
}

// Friend Requests
function sendRequest(email) {
    if (!requests[email]) requests[email] = [];
    requests[email].push(currentUser);
    localStorage.setItem('requests', JSON.stringify(requests));
    loadRequests();
    searchUsers();
}

function loadRequests() {
    const container = document.getElementById('requests-list');
    const userRequests = requests[currentUser] || [];
    
    document.getElementById('request-count').textContent = userRequests.length;
    
    container.innerHTML = userRequests.map(sender => {
        const user = JSON.parse(localStorage.getItem('users'))
            .find(u => u.email === sender);
        return `
            <div class="request-card">
                <div>
                    <h3>${user.firstName} ${user.lastName}</h3>
                    <p>${sender}</p>
                </div>
                <div>
                    <button onclick="acceptRequest('${sender}')">Accept</button>
                    <button onclick="declineRequest('${sender}')">Decline</button>
                </div>
            </div>
        `;
    }).join('');
}

function acceptRequest(sender) {
    friends[currentUser].push(sender);
    if (friends[sender]) friends[sender].push(currentUser);
    else friends[sender] = [currentUser];
    
    requests[currentUser] = requests[currentUser].filter(req => req !== sender);
    
    localStorage.setItem('friends', JSON.stringify(friends));
    localStorage.setItem('requests', JSON.stringify(requests));
    loadRequests();
    loadFriends();
}

function declineRequest(sender) {
    requests[currentUser] = requests[currentUser].filter(req => req !== sender);
    localStorage.setItem('requests', JSON.stringify(requests));
    loadRequests();
}

// Friends List
function loadFriends() {
    const container = document.getElementById('friends-list');
    const userFriends = friends[currentUser] || [];
    
    document.getElementById('friend-count').textContent = userFriends.length;
    
    container.innerHTML = userFriends.map(friend => {
        const user = JSON.parse(localStorage.getItem('users'))
            .find(u => u.email === friend);
        return `
            <div class="user-card">
                <div class="user-info">
                    <h3>${user.firstName} ${user.lastName}</h3>
                    <p>${friend}</p>
                </div>
                <div class="user-actions">
                    <button onclick="openChat('${friend}')">Chat</button>
                    <button onclick="removeFriend('${friend}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');
}

// Chat System
let currentChat = null;

function openChat(email) {
    currentChat = email;
    const modal = document.getElementById('chat-modal');
    const user = JSON.parse(localStorage.getItem('users'))
        .find(u => u.email === email);
    
    document.getElementById('chat-header').innerHTML = `
        <h3>Chat with ${user.firstName} ${user.lastName}</h3>
        <p>${email}</p>
    `;
    
    loadMessages();
    modal.style.display = 'block';
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatMessages = document.getElementById('chat-messages');
    
    const filtered = messages.filter(msg => 
        (msg.from === currentUser && msg.to === currentChat) ||
        (msg.to === currentUser && msg.from === currentChat)
    );
    
    chatMessages.innerHTML = filtered.map(msg => `
        <div class="message ${msg.from === currentUser ? 'sent' : 'received'}">
            <p>${msg.text}</p>
            <small>${new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');
}

function sendMessage() {
    const input = document.getElementById('message-text');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    messages.push({
        from: currentUser,
        to: currentChat,
        text: input.value,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('messages', JSON.stringify(messages));
    input.value = '';
    loadMessages();
}

// Close Modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('chat-modal').style.display = 'none';
});

// Initial Load
window.onload = () => {
    if (!currentUser) window.location.href = 'kabiraj login.html';
    loadRequests();
    loadFriends();
};