import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [clicked, SetClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dateofbirth: '', 
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    dateofbirth: '', 
  });

  const [termsError, setTermsError] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    let errors = {};
    if (state === 'Sign Up' && formData.username === '') {
      errors.username = 'Username is required';
    }
    if (formData.email === '') {
      errors.email = 'Email address is required';
    }
    if (formData.password === '') {
      errors.password = 'Password is required';
    }
    if (state === 'Sign Up' && formData.dateofbirth === '') {
      errors.dateofbirth = 'Date of birth is required';
    }
    if (!clicked) {
      setTermsError('You must agree to the terms and conditions');
    } else {
      setTermsError('');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0 && clicked;
  };

  const login = async () => {
    if (!validateFields()) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormErrors({ ...formErrors, email: 'Invalid email format' });
      return;
    }

    let responseData;
    await fetch(`${process.env.VITE_API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      toast.success('Successfully Logged In!');
      setTimeout(() => {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }, 2000);
    } else {
      toast.error('Wrong email or password');
    }
  };

  const signup = async () => {
    if (!validateFields()) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormErrors({ ...formErrors, email: 'Invalid email format' });
      return;
    }

    let responseData;
    await fetch(`${process.env.VITE_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      toast.success('Successfully Created Account!');
      setTimeout(() => {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      }, 2000);
    } else {
      toast.error(responseData.errors || 'Something went wrong');
    }
  };

  return (
    <>
      <section className="max_padd_container flexCenter flex-col pt-32">
        <div className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md">
          <h3 className="h3">{state}</h3>
          <div className="flex flex-col gap-4 mt-7">
            {state === 'Sign Up' && (
              <>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={changeHandler}
                  required
                  placeholder="Your Name"
                  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
                />
                {formErrors.username && (
                  <p className="text-orange-500 text-sm mt-1">
                    {formErrors.username}
                  </p>
                )}
              </>
            )}

            <input
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              required
              onChange={changeHandler}
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            />
            {formErrors.email && (
              <p className="text-orange-500 text-sm mt-1">{formErrors.email}</p>
            )}

            <div className="relative">
              <input
                value={formData.password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={changeHandler}
                placeholder="Password"
                required
                className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-4 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {formErrors.password && (
              <p className="text-orange-500 text-sm mt-1">
                {formErrors.password}
              </p>
            )}
            {state === 'Sign Up' && (
              <>
                <input
                  name="dateofbirth"
                  type="text"
                  value={formData.dateofbirth}
                  onChange={changeHandler}
                  placeholder='Enter in dd-mm-yyyy'
                  required
                  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
                />
                {formErrors.dateofbirth && (
                  <p className="text-orange-500 text-sm mt-1">
                    {formErrors.dateofbirth}
                  </p>
                )}
              </>
            )}
          </div>

          {state === 'Login' && (
            <div className="flex justify-end mt-2">
              <Link to="/forgotpassword" className="text-blue-500 underline">
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              state === 'Login' ? login() : signup();
            }}
            className="btn_dark_rounded my-5 w-full !rounded-md"
          >
            Continue
          </button>

          {state === 'Sign Up' ? (
            <p className="text-black font-bold">
              Already have an account?{' '}
              <span
                className="text-secondary underline cursor-pointer"
                onClick={() => {
                  setFormErrors({
                    username: '',
                    email: '',
                    password: '',
                    dateofbirth: '',
                  });
                  setTermsError('');
                  setState('Login');
                }}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-black font-bold">
              Create an account?{' '}
              <span
                className="text-secondary underline cursor-pointer"
                onClick={() => {
                  setFormErrors({
                    username: '',
                    email: '',
                    password: '',
                    dateofbirth: '',
                  });
                  setTermsError('');
                  setState('Sign Up');
                }}
              >
                Click here
              </span>
            </p>
          )}

 
          <div className="flexCenter mt-6 gap-3">
            <input
              type="checkbox"
              required
              onClick={() => SetClicked(!clicked)}
            />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {!clicked && (
            <p className="text-orange-500 text-sm mt-1">{termsError}</p>
          )}
        </div>
      </section>

      <ToastContainer />
    </>
  );
};
