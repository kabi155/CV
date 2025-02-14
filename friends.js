// Load initial data
let currentUser = localStorage.getItem('currentUser');
let users = JSON.parse(localStorage.getItem('users')) || [];
let friends = JSON.parse(localStorage.getItem('friends')) || [];
let requests = JSON.parse(localStorage.getItem('requests')) || [];

// Display friend requests
function loadFriendRequests() {
    const requestsList = document.getElementById('friend-requests-list');
    requestsList.innerHTML = requests
        .filter(req => req.to === currentUser)
        .map(req => `
            <div class="request-card">
                <span>${req.from} wants to be your friend</span>
                <div>
                    <button onclick="acceptRequest('${req.from}')">Accept</button>
                    <button onclick="declineRequest('${req.from}')">Decline</button>
                </div>
            </div>
        `)
        .join('');
}

// Display friends list
function loadFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = friends
        .filter(f => f.user === currentUser)
        .map(f => `
            <div class="user-card">
                <span>${f.friend}</span>
            </div>
        `)
        .join('');
}

// Search for friends
function searchFriends() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    const results = users.filter(user => 
        user.email.toLowerCase().includes(searchInput) && user.email !== currentUser
    );

    searchResults.innerHTML = results
        .map(user => `
            <div class="user-card">
                <span>${user.email}</span>
                <button onclick="sendRequest('${user.email}')">Add Friend</button>
            </div>
        `)
        .join('');
}

// Send friend request
function sendRequest(to) {
    if (!requests.some(req => req.from === currentUser && req.to === to)) {
        requests.push({ from: currentUser, to });
        localStorage.setItem('requests', JSON.stringify(requests));
        alert('Friend request sent!');
    } else {
        alert('Request already sent!');
    }
}

// Accept friend request
function acceptRequest(from) {
    friends.push({ user: currentUser, friend: from });
    requests = requests.filter(req => !(req.from === from && req.to === currentUser));
    localStorage.setItem('friends', JSON.stringify(friends));
    localStorage.setItem('requests', JSON.stringify(requests));
    loadFriendRequests();
    loadFriendsList();
}

// Decline friend request
function declineRequest(from) {
    requests = requests.filter(req => !(req.from === from && req.to === currentUser));
    localStorage.setItem('requests', JSON.stringify(requests));
    loadFriendRequests();
}

// Initial load
loadFriendRequests();
loadFriendsList();