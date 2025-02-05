document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData();
    formData.append('fullName', document.getElementById('fullName').value);
    formData.append('dateOfBirth', document.getElementById('dob').value);
    formData.append('fathersName', document.getElementById('fathersName').value);
    formData.append('mothersName', document.getElementById('mothersName').value);
    formData.append('relationshipStatus', document.getElementById('relationshipStatus').value);
    formData.append('citizenshipNumber', document.getElementById('citizenshipNumber').value);
    formData.append('nationalID', document.getElementById('nationalID').value);
    formData.append('passportPhoto', document.getElementById('passportPhoto').files[0]);

    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Show the success message from the server
        document.getElementById('registrationForm').reset();  // Reset form fields
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
});