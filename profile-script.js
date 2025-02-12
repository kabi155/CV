// Bottom Navigation Functions
function showPhotosModal() {
    document.getElementById('photosModal').style.display = 'block';
    loadPhotos();
}

function closePhotosModal() {
    document.getElementById('photosModal').style.display = 'none';
}

function showRelativesModal() {
    document.getElementById('relativesModal').style.display = 'block';
    loadRelatives();
}

function closeRelativesModal() {
    document.getElementById('relativesModal').style.display = 'none';
}

function showMessagesModal() {
    document.getElementById('messagesModal').style.display = 'block';
    loadConversations();
}

function closeMessagesModal() {
    document.getElementById('messagesModal').style.display = 'none';
}

// Photo Management
function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    posts.forEach(post => {
        if(post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            img.classList.add('photo-item');
            photoGrid.appendChild(img);
        }
    });
}

// Relative Management
function loadRelatives() {
    const relativesList = document.getElementById('relativesList');
    relativesList.innerHTML = '';
    const friends = JSON.parse(localStorage.getItem('friends')) || [];
    
    friends.forEach(friend => {
        if(friend.status === 'accepted') {
            const relativeItem = document.createElement('div');
            relativeItem.textContent = friend.name;
            relativesList.appendChild(relativeItem);
        }
    });
}

// Message Management
function loadConversations() {
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    // Implement conversation loading logic
}

function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    if(messageText.trim()) {
        const newMessage = {
            sender: currentUser.email,
            content: messageText,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        
        // Clear input
        document.getElementById('messageText').value = '';
    }
}
// Load Profile Data
const email = localStorage.getItem('currentUser');
const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
const profile = profiles.find(p => p.email === email);

if (profile) {
    document.getElementById('profile-photo').src = profile.profilePhoto || 'default.jpg';
    document.getElementById('full-name').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('bio-text').textContent = profile.bio || 'No bio provided';
    document.getElementById('dob').textContent = profile.dob || 'Not provided';
    document.getElementById('email').textContent = profile.email;
    document.getElementById('fatherName').textContent = profile.fatherName || 'Not provided';
    document.getElementById('motherName').textContent = profile.motherName || 'Not provided';
    document.getElementById('grandfatherName').textContent = profile.grandfatherName || 'Not provided';
    document.getElementById('address').textContent = profile.address || 'Not provided';

    // Hide conditional fields if already updated
    if (profile.fatherName) document.getElementById('fatherName').parentElement.style.display = 'none';
    if (profile.motherName) document.getElementById('motherName').parentElement.style.display = 'none';
    if (profile.grandfatherName) document.getElementById('grandfatherName').parentElement.style.display = 'none';
    if (profile.address) document.getElementById('address').parentElement.style.display = 'none';
} else {
    alert('Profile not found!');
    window.location.href = "profile-form.html";
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "kabiraj login.html";
}

// Edit Modal Functions
function showEditModal() {
    document.getElementById('editModal').style.display = 'flex';
    document.getElementById('editFirstName').value = profile.firstName || '';
    document.getElementById('editLastName').value = profile.lastName || '';
    document.getElementById('editBio').value = profile.bio || '';
    document.getElementById('editProfilePhoto').value = profile.profilePhoto || '';
    document.getElementById('editFatherName').value = profile.fatherName || '';
    document.getElementById('editMotherName').value = profile.motherName || '';
    document.getElementById('editGrandfatherName').value = profile.grandfatherName || '';
    document.getElementById('editAddress').value = profile.address || '';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveDetails() {
    profile.firstName = document.getElementById('editFirstName').value;
    profile.lastName = document.getElementById('editLastName').value;
    profile.bio = document.getElementById('editBio').value;
    profile.profilePhoto = document.getElementById('editProfilePhoto').value;
    profile.fatherName = document.getElementById('editFatherName').value;
    profile.motherName = document.getElementById('editMotherName').value;
    profile.grandfatherName = document.getElementById('editGrandfatherName').value;
    profile.address = document.getElementById('editAddress').value;

    localStorage.setItem('profiles', JSON.stringify(profiles));
    closeEditModal();
    location.reload(); // Refresh to show updated details
}

// Search Functionality
function searchMembers() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = profiles.filter(p => 
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(query) &&
        p.email !== profile.email
    );

    const resultsContainer = document.querySelector('.members-list');
    resultsContainer.innerHTML = '';

    results.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <div>
                <strong>${member.firstName} ${member.lastName}</strong>
                <p>${member.email}</p>
            </div>
            <button onclick="sendFriendRequest('${member.email}')">Join</button>
        `;
        resultsContainer.appendChild(memberCard);
    });

    document.getElementById('searchResults').classList.remove('hidden');
}
/* Conversation List */
.conversation-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
}

.conversation-item {
    padding: 8px;
    margin: 5px 0;
    background: #f5f5f5;
    border-radius: 4px;
    cursor: pointer;
}

.conversation-item:hover {
    background: #e0e0e0;
}

.conversation-item.active {
    background: #4CAF50;
    color: white;
}

/* Message History */
.message-history {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
}

.message {
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
}

.message.sent {
    background: #4CAF50;
    color: white;
    align-self: flex-end;
}

.message.received {
    background: #f1f1f1;
    align-self: flex-start;
}

/* Message Input */
.message-input {
    display: flex;
    gap: 10px;
}

.message-input input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.message-input button {
    padding: 8px 12px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
// Friend Request System
function sendFriendRequest(targetEmail) {
    alert(`Friend request sent to ${targetEmail}`);
    // Add logic to save friend request
}
