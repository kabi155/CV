import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('/api/auth/register/google', {
        token: credentialResponse.credential,
      });
      console.log(res.data);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneSubmit = async () => {
    try {
      const res = await axios.post('/api/auth/register/phone', { phone });
      console.log(res.data);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post('/api/otp/verify-otp', { phone, otp });
      console.log(res.data);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log('Login Failed')} />
      </GoogleOAuthProvider>
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {!otpSent ? (
          <button onClick={handlePhoneSubmit}>Send OTP</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtpSubmit}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;