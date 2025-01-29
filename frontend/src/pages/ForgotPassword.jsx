import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track when to show password field
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const submitDetails = async () => {
    if (email && dob) {
      let responseData;
      await fetch(`${process.env.VITE_API_BASE_URL}/forgot`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          dateofbirth: dob,
        }),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));
        
      if (responseData.success) {
        setShowPassword(true); // Show new password field if success
      } else {
        toast.error('Invalid email or date of birth');
      }
    } else {
      toast.error('Please enter a valid email address and date of birth');
    }
  };

  const updatePassword = async () => {
    if (newPassword) {
      let responseData;
      await fetch(`${process.env.VITE_API_BASE_URL}/updatePassword`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));
        
      if (responseData.success) {
        toast.success('Password updated Successfully!');
        setTimeout(() => {
            window.location.replace('/login');
          }, 2000);
        // Optionally redirect user after password update
      } else {
        toast.error('Error updating password');
      }
    } else {
      toast.error('Please enter a new password');
    }
  };

  return (
    <>
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {/* Email and Date of Birth Input Fields */}
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Enter your email address:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email address"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label htmlFor="dob" className="block mb-2 font-semibold">
            Enter your date of birth:
          </label>
          <input
            id="dob"
            type="text"
            value={dob}
            onChange={handleDobChange}
            placeholder="Enter in dd-mm-yyyy"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <button
            onClick={submitDetails}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        {/* New Password Input Field (shown after successful email and DOB verification) */}
        {showPassword && (
          <div className="mt-6">
            <label htmlFor="newPassword" className="block mb-2 font-semibold">
              Enter your new password:
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="New password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              required
            />
            <button
              onClick={updatePassword}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </section>
    <ToastContainer />
    </>
  );
};
