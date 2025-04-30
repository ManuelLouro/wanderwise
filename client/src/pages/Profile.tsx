import React, { useState } from "react";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "John Doe", // default value simulating fetched data
    phone: "+1234567890",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simulate saving logic (e.g. API call)
    setTimeout(() => {
      setMessage("Profile updated successfully!");
    }, 500);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Save
        </button>

        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
