// Initialize Data
let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
let thoughtPosts = JSON.parse(localStorage.getItem('thoughtPosts')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Initialize Profile
function initProfile() {
    if (!currentUser) window.location.href = "login.html";
    
    const profile = profiles.find(p => p.email === currentUser.email);
    
    // Update Profile Info
    document.getElementById('profile-photo').src = profile.profilePhoto || 'default.jpg';
    document.getElementById('full-name').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('bio-text').textContent = profile.bio || 'No bio yet';
    document.getElementById('dob').textContent = profile.dob || 'Not set';
    document.getElementById('email').textContent = profile.email;
    document.getElementById('fatherName').textContent = profile.fatherName || 'Not provided';
    document.getElementById('motherName').textContent = profile.motherName || 'Not provided';

    // Hide empty fields
    if (profile.fatherName) document.getElementById('fatherNameField').style.display = 'none';
    if (profile.motherName) document.getElementById('motherNameField').style.display = 'none';
    
    loadThoughtPosts();
}

// Thought Post System
function loadThoughtPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    
    thoughtPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
            <div class="post-time">${new Date(post.timestamp).toLocaleString()}</div>
        `;
        postsList.prepend(postCard);
    });
}

function postThought() {
    const content = document.querySelector('.post-input').value;
    const imageInput = document.querySelector('input[type="file"]');
    const privacy = document.querySelector('.privacy-select').value;
    
    const newPost = {
        content,
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
        privacy,
        timestamp: new Date().toISOString()
    };
    
    thoughtPosts.unshift(newPost);
    localStorage.setItem('thoughtPosts', JSON.stringify(thoughtPosts));
    closeModal('thoughtModal');
    loadThoughtPosts();
}

// Modal System
function showThoughtModal() {
    document.getElementById('thoughtModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initProfile);
