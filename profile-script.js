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

// Thought Modal Functions
function showThoughtModal() {
    document.getElementById('thoughtModal').style.display = 'flex';
}

function closeThoughtModal() {
    document.getElementById('thoughtModal').style.display = 'none';
}

function postThought() {
    const content = document.querySelector('#thoughtModal textarea').value;
    const privacy = document.getElementById('privacy').value;
    alert(`Posted: ${content} (${privacy})`);
    closeThoughtModal();
}

// Relatives List
function showRelatives() {
    document.getElementById('relativesList').classList.remove('hidden');
    const relativesList = document.querySelector('.relatives-list');
    relativesList.innerHTML = ''; // Clear previous list
    // Add logic to load relatives
}

// Chat Interface
function showChat() {
    document.getElementById('chatInterface').classList.remove('hidden');
}

function sendMessage() {
    const message = document.querySelector('.message-input').value;
    alert(`Message sent: ${message}`);
}

// Photos Gallery
function showPhotos() {
    document.getElementById('photoGallery').classList.remove('hidden');
    const photoGrid = document.querySelector('.photo-grid');
    photoGrid.innerHTML = ''; // Clear previous photos
    // Add logic to load photos
}

// Email Verification
function verifyEmail() {
    alert('Verification email sent!');
    document.getElementById('verifyButton').innerHTML = '✅ Verified';
}

// Edit Profile Modal Functions
function showEditModal() {
    document.getElementById('editModal').style.display = 'flex';
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
