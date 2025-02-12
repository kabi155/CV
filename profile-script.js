// Modal Functions
function showEditModal() {
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function showThoughtModal() {
    document.getElementById('thoughtModal').style.display = 'flex';
}

function showPhotosModal() {
    document.getElementById('photosModal').style.display = 'flex';
}

function showRelativesModal() {
    document.getElementById('relativesModal').style.display = 'flex';
}

function showMessagesModal() {
    document.getElementById('messagesModal').style.display = 'flex';
}

// Save Profile Details
function saveDetails() {
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const bio = document.getElementById('editBio').value;
    const profilePhoto = document.getElementById('editProfilePhoto').value;
    const fatherName = document.getElementById('editFatherName').value;
    const motherName = document.getElementById('editMotherName').value;
    const grandfatherName = document.getElementById('editGrandfatherName').value;
    const address = document.getElementById('editAddress').value;

    document.getElementById('full-name').innerText = `${firstName} ${lastName}`;
    document.getElementById('bio-text').innerText = bio;
    document.getElementById('profile-photo').src = profilePhoto;
    document.getElementById('fatherName').innerText = fatherName;
    document.getElementById('motherName').innerText = motherName;
    document.getElementById('grandfatherName').innerText = grandfatherName;
    document.getElementById('address').innerText = address;

    closeEditModal();
}

// Post Thought
function postThought() {
    const postText = document.getElementById('postText').value;
    const postImage = document.getElementById('postImage').files[0];
    const privacy = document.getElementById('postPrivacy').value;

    if (postText || postImage) {
        alert(`Posted: ${postText} (Privacy: ${privacy})`);
        document.getElementById('thoughtModal').style.display = 'none';
    } else {
        alert('Please enter text or upload an image.');
    }
}

// Logout
function logout() {
    alert('Logged out successfully!');
    window.location.href = '/login'; // Redirect to login page
}
