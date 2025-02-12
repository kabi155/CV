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

// Friend Request System
function sendFriendRequest(targetEmail) {
    alert(`Friend request sent to ${targetEmail}`);
    // Add logic to save friend request
}
