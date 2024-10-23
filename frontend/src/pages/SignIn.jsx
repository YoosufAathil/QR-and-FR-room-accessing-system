import React, { useState } from 'react';
import logo from "../assets/logo.png";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', data.email);
    console.log('Password:', data.password);

    //destructuring email and password from data
    const { email, password } = data;
    try {
      const {data} = await axios.post('/signin', {
        email, 
        password
      });

      if(data.error){
        return toast.error(data.error)
      } else{
        toast.success('Logged in successfully');
        setData({});
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo} // Replace with your logo's URL
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          LOG IN
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password? <span className="font-semibold">Click Here</span>
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Having trouble logging in?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact us!
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
