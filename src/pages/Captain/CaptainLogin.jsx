import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CaptainContextGlobal } from "../../../context/CaptainContext";
import axios from "axios";
import LoginFailed from "../../Error/LoginFailed";
import NoNetwork from "../../Error/NoNetwork";


const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const navigate = useNavigate();
  const { setcaptaindata } = useContext(CaptainContextGlobal);

  const clearError = () => {
    setErrorType('');
    setErrorMessage('');
  };
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md min-h-screen px-6 py-10 flex flex-col">
        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-tight">
          Uber
        </h1>

        {/* Heading */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            Login to continue your journey
          </p>
        </div>
        {/* Form */}
        <div className="mt-10 space-y-5">
          {errorType === 'login' && <LoginFailed message={errorMessage} onRetry={clearError} onClose={clearError} />}
          {errorType === 'network' && <NoNetwork message={errorMessage} onRetry={clearError} onClose={clearError} />}
<form onSubmit={async (e) => {
  e.preventDefault();
  setErrorMessage('');
  setErrorType('');

  const captain = {
    email:email,
    password:password
  }
 try {
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/login` , captain);
   const data = response.data;
   if(response.status===200){
        localStorage.setItem('token' , data.token)
        setcaptaindata(data.captain);
        setEmail('')
        setPassword('')
        navigate('/captain-home');
   } else {
        setErrorMessage('We couldn’t sign in this captain account.');
        setErrorType('login');
   }
 } catch (err) {
   if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
     setErrorMessage('Please check your internet connection and try again.');
     setErrorType('network');
   } else {
     setErrorMessage(err.response?.data?.message || 'Invalid captain credentials.');
     setErrorType('login');
   }
 }
}}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              placeholder="example@gmail.com"
              className="w-full h-14 rounded-xl bg-gray-100 px-4 outline-none border border-transparent focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
              placeholder="••••••••"
              className="w-full h-14 rounded-xl bg-gray-100 px-4 outline-none border border-transparent focus:border-black transition"
            />
          </div>

          <div className="flex justify-end">
            <button className="text-sm text-gray-600 hover:text-black transition">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            className="


              w-full
              h-14
              rounded-xl
              bg-black
              text-white
              text-lg
              font-semibold
              hover:bg-neutral-800
              transition
            "
          >
            Login
          </button>
</form>


        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

    

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Signup */}
        <div className="pb-6 text-center">
          <p className="text-gray-500">
            Don't have an account?
          </p>

<Link to = '/captainRegister'>
          <button
            className="
              mt-1
              w-full
              h-14
              rounded-xl
              bg-black
              text-white
              font-semibold
              hover:bg-green-700
              transition
            "
          >
            Create New Account
          </button>
</Link>
        </div>

      </div>
    </div>
  );
};

export default CaptainLogin;