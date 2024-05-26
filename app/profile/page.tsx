"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import UserService from "../services/user.service";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editableProfile, setEditableProfile] = useState<any>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    UserService.getProfile().then(
      response => {
        setProfile(response.data);
        setLoading(false);
      },
      error => {
        router.push(`/login`);
      }
    );
  }, []);

  const handleEdit = () => {
    setEditableProfile({ ...profile, oldPassword: "", newPassword: "" });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    setEditLoading(true);
    setMessage("");

    try {
      await UserService.updateProfile(editableProfile);
      setProfile(editableProfile);
      setShowEditModal(false);
    } catch (error: any) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
    setEditLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const formatRoles = (roles: Set<string>) => {
    return Array.from(roles)
      .map(role => role.slice(5).toLowerCase())
      .map(role => role.charAt(0).toUpperCase() + role.slice(1))
      .join(", ");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-100">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-teal-700 border-t-transparent rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-teal-300 border border-blue-700 w-96 rounded-md shadow-md">
          <div className="flex justify-center mb-4">
            <img 
              src={profile.profilePicture || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} 
              className="mb-4 w-48 h-48 rounded-full" 
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{profile.username}</h2>
            <p className="text-blue-900 mb-2"><strong>Full Name:</strong> {profile.fullName}</p>
            <p className="text-blue-900 mb-2"><strong>Email:</strong> {profile.email}</p>
            <p className="text-blue-900 mb-2"><strong>Phone Number:</strong> {profile.phoneNumber}</p>
            <p className="text-blue-900 mb-2"><strong>Bio:</strong> {profile.bio}</p>
            <p className="text-blue-900 mb-2"><strong>Gender:</strong> {profile.gender}</p>
            {profile.birthDate && (
              <p className="text-blue-900 mb-2"><strong>Birth Date:</strong> {new Date(profile.birthDate).toLocaleDateString()}</p>
            )}
            <p className="text-blue-900 mb-2"><strong>Roles:</strong> {formatRoles(profile.roles)}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" 
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md my-8 mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            {editableProfile && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={editableProfile.fullName} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Profile Picture URL</label>
                  <input 
                    type="text" 
                    name="profilePicture" 
                    value={editableProfile.profilePicture} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={editableProfile.email} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone Number</label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    value={editableProfile.phoneNumber} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bio</label>
                  <textarea 
                    name="bio" 
                    value={editableProfile.bio} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Gender</label>
                  <input 
                    type="text" 
                    name="gender" 
                    value={editableProfile.gender} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Birth Date</label>
                  <input 
                    type="date" 
                    name="birthDate" 
                    value={editableProfile.birthDate ? new Date(editableProfile.birthDate).toISOString().split('T')[0] : ''} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Old Password</label>
                  <input 
                    type="password" 
                    name="oldPassword" 
                    value={editableProfile.oldPassword} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword" 
                    value={editableProfile.newPassword} 
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
              </form>
            )}
            <div className="flex justify-end">
              <button 
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" 
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" 
                onClick={handleSave}
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
