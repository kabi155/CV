// Friend Management System
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

function searchUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const friends = JSON.parse(localStorage.getItem('friends')) || { 
        [currentUser.email]: [] 
    };
    
    const results = allUsers.filter(user => 
        (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(searchTerm) &&
        user.email !== currentUser.email
    );

    displayResults(results, friends[currentUser.email]);
}

function displayResults(users, friendsList) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = users.map(user => `
        <div class="user-card">
            <div>
                <h3>${user.firstName} ${user.lastName}</h3>
                <p>${user.email}</p>
            </div>
            ${!friendsList.includes(user.email) ? 
                `<button onclick="sendRequest('${user.email}')">Add Friend</button>` : 
                `<span>Already Friends</span>`}
        </div>
    `).join('');
}

function sendRequest(targetEmail) {
    const requests = JSON.parse(localStorage.getItem('friendRequests')) || {};
    if (!requests[targetEmail]) requests[targetEmail] = [];
    
    requests[targetEmail].push({
        from: currentUser.email,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem('friendRequests', JSON.stringify(requests));
    alert('Friend request sent!');
}

// Load friend requests on page load
function loadRequests() {
    const requests = JSON.parse(localStorage.getItem('friendRequests')) || {};
    const userRequests = requests[currentUser.email] || [];
    
    document.getElementById('friendRequests').innerHTML = userRequests.map(req => `
        <div class="request-card">
            <h3>${req.name}</h3>
            <p>${req.email}</p>
            <button onclick="acceptRequest('${req.from}')">Accept</button>
            <button onclick="declineRequest('${req.from}')">Decline</button>
        </div>
    `).join('');
}

function acceptRequest(fromEmail) {
    // Add to friends list
    const friends = JSON.parse(localStorage.getItem('friends')) || {};
    if (!friends[currentUser.email]) friends[currentUser.email] = [];
    friends[currentUser.email].push(fromEmail);
    
    // Remove from requests
    const requests = JSON.parse(localStorage.getItem('friendRequests'));
    requests[currentUser.email] = requests[currentUser.email].filter(req => req.from !== fromEmail);
    
    localStorage.setItem('friends', JSON.stringify(friends));
    localStorage.setItem('friendRequests', JSON.stringify(requests));
    loadRequests();
}

function declineRequest(fromEmail) {
    const requests = JSON.parse(localStorage.getItem('friendRequests'));
    requests[currentUser.email] = requests[currentUser.email].filter(req => req.from !== fromEmail);
    localStorage.setItem('friendRequests', JSON.stringify(requests));
    loadRequests();
}

// Initial load
window.onload = () => {
    if (!currentUser) window.location.href = 'login.html';
    loadRequests();
};
