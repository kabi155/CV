document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileEmail = urlParams.get('email') || localStorage.getItem('currentUser');
    const currentUser = localStorage.getItem('currentUser');
    const isOwner = profileEmail === currentUser;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const profileUser = users.find(u => u.email === profileEmail);
    
    if (!profileUser) {
        alert('Profile not found!');
        window.history.back();
        return;
    }

    renderProfile(profileUser, isOwner);
});

function renderProfile(user, isOwner) {
    const container = document.getElementById('profile-container');
    
    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-photo-container">
                <img src="${user.profilePhoto}" alt="Profile Photo" class="profile-photo">
                ${isOwner ? `
                <div class="edit-photo" onclick="document.getElementById('photo-input').click()">
                    ✎
                </div>
                <input type="file" id="photo-input" accept="image/*" hidden>
                ` : ''}
            </div>
            <h1>${user.firstName} ${user.lastName}</h1>
            <p class="bio">${user.bio || 'No bio yet'}</p>
        </div>

        <div class="profile-details">
            <div class="detail-card">
                <h3>About</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Joined:</strong> ${new Date(user.joinedDate).toLocaleDateString()}</p>
                ${isOwner ? `
                <button onclick="editProfile()">Edit Profile</button>
                ` : `
                <button onclick="window.location.href='chat.html?with=${user.email}'">Message</button>
                `}
            </div>
        </div>
    `;

    if (isOwner) {
        document.getElementById('photo-input').addEventListener('change', updateProfilePhoto);
    }
}

function editProfile() {
    // Add edit functionality here
}

function updateProfilePhoto(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const users = JSON.parse(localStorage.getItem('users'));
            const currentUser = localStorage.getItem('currentUser');
            const user = users.find(u => u.email === currentUser);
            user.profilePhoto = e.target.result;
            localStorage.setItem('users', JSON.stringify(users));
            renderProfile(user, true);
        };
        reader.readAsDataURL(file);
    }
}