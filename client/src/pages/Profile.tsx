import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border rounded"
            placeholder="Enter your phone number"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;