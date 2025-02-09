document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = {
    firstName: document.getElementById('firstName').value,
    middleName: document.getElementById('middleName').value,
    lastName: document.getElementById('lastName').value,
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    address: {
      country: document.getElementById('country').value,
      state: document.getElementById('state').value,
      district: document.getElementById('district').value,
    },
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
  };

  // Validate passwords
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Send data to backend
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
      window.location.href = '/login'; // Redirect to login page
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration.');
  }
});
