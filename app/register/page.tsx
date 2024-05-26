"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import AuthService from "../services/auth.service";
import Navbar from '@/components/navbar/navbar';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    try {
      const response = await AuthService.register(username, email, password);
      setMessage(response.data.message);
      setSuccessful(true);
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      }
      console.log(errorMessage);
      setSuccessful(false);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-100">
      <Navbar />
      <div className="p-6 bg-teal-300 border border-blue-700 w-96 rounded-md shadow-md">
        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-blue-900">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-blue-900">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-blue-900">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-3 rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                Register
              </button>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-2 rounded-md text-center ${successful ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {message}
            </div>
          )}
        </form>

        {successful && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md my-8 mx-auto">
              <h2 className="text-black font-bold">Registration Successful</h2>
              <p className="mt-2">{message}</p>
              <button
                className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-md"
                onClick={() => router.push(`/login`)}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
