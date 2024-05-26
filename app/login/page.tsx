"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import AuthService from "../services/auth.service";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await AuthService.login(username, password);
      setMessage("Login successful!");
      console.log("Login response:", response); // Debug statement
      setLoading(false);
    } catch (error: any) {
      console.log("Login error:", error); // Debug statement
      setLoading(false);
      setMessage("incorrect username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-100">
      <Navbar />
      <div className="p-6 bg-teal-300 border border-blue-700 w-96 rounded-md shadow-md">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-blue-900">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-blue-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-blue-900">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-blue-900"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-3 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {message && (
            <div className={`mt-4 p-2 rounded-md text-center ${message === "Login successful!" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {message}
            </div>
          )}
        </form>

        {message === "Login successful!" && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-black font-bold">Login Successful</h2>
              <p className="mt-2">{message}</p>
              <button
                className="mt-4 bg-blue-700 text-black py-2 px-4 rounded-md"
                onClick={() => router.push(`/`)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;