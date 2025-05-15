import React, { useState, useEffect } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { fetchAuthSession } from "aws-amplify/auth";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.accessToken?.toString();

        const res = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        setFormData({
          name: data.name || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      await fetch("http://localhost:3000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
          />
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-300"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSaving}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
              isSaving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        )}

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
