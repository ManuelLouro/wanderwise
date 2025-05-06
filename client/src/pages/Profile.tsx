import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react"; // ou use qualquer ícone SVG de sua preferência

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "+1234567890",
  });

  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setTimeout(() => {
      setIsSaving(false);
      setMessage("Profile updated successfully!");
    }, 1000);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
            isSaving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        {message && (
          <div className="flex items-center gap-2 text-green-600 text-sm mt-2 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
