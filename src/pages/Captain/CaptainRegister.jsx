import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainContextGlobal } from "../../../context/CaptainContext";
import RegisterFailed from "../../Error/RegisterFailed";
import NoNetwork from "../../Error/NoNetwork";

const CaptainRegister = () => {

  
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
  const [vehcolor, setColor] = useState("");
const [vehplate, setPlate] = useState("");
const [vehcapacity, setCapacity] = useState("");
const [vehicleType, setVehicleType] = useState("");
const [errorMessage, setErrorMessage] = useState('');
const [errorType, setErrorType] = useState('');

    const navigate = useNavigate();
    const { setcaptaindata } = useContext(CaptainContextGlobal)    

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

        <form onSubmit={ async (e) => {
  e.preventDefault();
  setErrorMessage('');
  setErrorType('');
  const captain = {
    fullname:{
      firstName:firstName,
      lastName:lastName,
    },
    vehicle:{
      type:vehicleType,
      color:vehcolor,
      plate:vehplate,
      capacity:vehcapacity
    },
    email:email,
    password:password
  }

 try {
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/register` , captain);
   const data = response.data;
   if(response.status===200){
        localStorage.setItem('token' , data.token)
        setcaptaindata(data.captain);
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        navigate('/captain-home');
   } else {
        setErrorMessage('We could not create this captain account.');
        setErrorType('register');
   }
 } catch (err) {
   if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
     setErrorMessage('Please check your internet connection and try again.');
     setErrorType('network');
   } else {
     setErrorMessage(err.response?.data?.message || 'Please complete every field before registering.');
     setErrorType('register');
   }
 }
}}>
        <div className="mt-10 space-y-5">
          {errorType === 'register' && <RegisterFailed message={errorMessage} onRetry={clearError} onClose={clearError} />}
          {errorType === 'network' && <NoNetwork message={errorMessage} onRetry={clearError} onClose={clearError} />}

          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Firstname
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              placeholder="enter firstname"
              className="w-full h-14 rounded-xl bg-gray-100 px-4 outline-none border border-transparent focus:border-black transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LastName
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              placeholder="enter lastname"
              className="w-full h-14 rounded-xl bg-gray-100 px-4 outline-none border border-transparent focus:border-black transition"
            />
          </div>

             

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
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

 <div>
  <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>

  <input
    type="text"
    placeholder="Vehicle Color"
    value={vehcolor}
    onChange={(e) => setColor(e.target.value)}
    className="w-full p-3 border rounded-lg mb-3"
  />

  <input
    type="text"
    placeholder="Vehicle Plate Number"
    value={vehplate}
    onChange={(e) => setPlate(e.target.value)}
    className="w-full p-3 border rounded-lg mb-3"
  />

  <input
    type="number"
    placeholder="Passenger Capacity"
    value={vehcapacity}
    onChange={(e) => setCapacity(e.target.value)}
    className="w-full p-3 border rounded-lg mb-3"
  />

  <select
    value={vehicleType}
    onChange={(e) => setVehicleType(e.target.value)}
    className="w-full p-3 border rounded-lg mb-4"
  >
    <option value="">Select Vehicle Type</option>
    <option value="car">Car</option>
    <option value="motorcycle">Motorcycle</option>
    <option value="auto">Auto</option>
  </select>
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
            Register
          </button>
        </div>

</form>
        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

    

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Signup */}
        <div className="pb-6 text-center">
          <p className="text-gray-500">
            Already have a account
          </p>

<Link to = '/captainLogin'>
          <button
            className="
              mt-4
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
           Login
          </button>
</Link>
<Link to='/userLogin'>
          <button
            className="
              mt-4
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
            Sign up as User
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CaptainRegister;