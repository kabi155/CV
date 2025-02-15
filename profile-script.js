document.addEventListener('DOMContentLoaded', () => {
    // Address Copy Functionality
    document.getElementById('sameAsPermanent').addEventListener('change', (e) => {
        if(e.target.checked) {
            copyAddress('permanent', 'temporary');
        }
    });

    // Form Validation
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if(validateForm() && validateEmail() && validateVerificationCode()) {
            saveProfile();
        }
    });
});

function copyAddress(sourcePrefix, targetPrefix) {
    const addressFields = ['country', 'state', 'district', 'municipality', 'ward'];
    addressFields.forEach(field => {
        const sourceValue = document.getElementById(`${sourcePrefix}-${field}`).value;
        document.getElementById(`${targetPrefix}-${field}`).value = sourceValue;
    });
}

function validateForm() {
    // Add validation logic for all fields
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const gmailRegex = /@gmail\.com$/;
    if(!gmailRegex.test(email)) {
        alert('Please enter a valid Gmail address');
        return false;
    }
    return true;
}

function sendVerification() {
    if(validateEmail()) {
        // Simulate sending verification code
        document.querySelector('.verification-code').classList.add('active');
        document.getElementById('verificationCode').disabled = false;
        alert('Verification code sent to your email!');
    }
}

function validateVerificationCode() {
    const code = document.getElementById('verificationCode').value;
    // Add actual validation logic
    return code.length === 6;
}

function saveProfile() {
    // Add logic to save profile to localStorage
    window.location.href = "profile-display.html";
}
