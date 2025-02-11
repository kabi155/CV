// Load Profile Data
const email = localStorage.getItem('currentUser');
const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
const profile = profiles.find(p => p.email === email);

if (profile) {
    document.getElementById('profile-photo').src = profile.profilePhoto;
    document.getElementById('full-name').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('bio-text').textContent = profile.bio;
    document.getElementById('dob').textContent = profile.dob;
    document.getElementById('email').textContent = profile.email;
    document.getElementById('fatherName').textContent = profile.fatherName || 'Not provided';
    document.getElementById('motherName').textContent = profile.motherName || 'Not provided';
    document.getElementById('address').textContent = profile.address || 'Not provided';
} else {
    alert('Profile not found!');
    window.location.href = "profile-form.html";
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "kabiraj login.html";
}

// Thought Modal
function showThoughtModal() {
    document.getElementById('thoughtModal').style.display = 'flex';
}

function postThought() {
    const content = document.querySelector('#thoughtModal textarea').value;
    const privacy = document.getElementById('privacy').value;
    alert(`Posted: ${content} (${privacy})`);
    document.getElementById('thoughtModal').style.display = 'none';
}

// Edit Modal
function showEditModal() {
    document.getElementById('editModal').style.display = 'flex';
}

function saveDetails() {
    const fatherName = document.getElementById('editFatherName').value;
    const motherName = document.getElementById('editMotherName').value;
    const address = document.getElementById('editAddress').value;

    profile.fatherName = fatherName;
    profile.motherName = motherName;
    profile.address = address;

    localStorage.setItem('profiles', JSON.stringify(profiles));
    location.reload();
}

// Email Verification
function verifyEmail() {
    alert('Verification email sent!');
    document.getElementById('verifyButton').innerHTML = '✅ Verified';
}

// Photos Gallery
function showPhotoGallery() {
    document.getElementById('photoGallery').classList.remove('hidden');
    const photoGrid = document.querySelector('.photo-grid');
    photoGrid.innerHTML = ''; // Clear previous photos
    // Add logic to load photos
}

// Relatives List
function showRelatives() {
    document.getElementById('relativesList').classList.remove('hidden');
    const relativeList = document.querySelector('.relative-list');
    relativeList.innerHTML = ''; // Clear previous list
    // Add logic to load relatives
}

// Chat Interface
function showConversations() {
    document.getElementById('chatInterface').classList.remove('hidden');
}

function sendMessage() {
    const message = document.querySelector('.message-input').value;
    alert(`Message sent: ${message}`);
}