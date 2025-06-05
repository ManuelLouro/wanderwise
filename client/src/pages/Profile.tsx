import React, { useState, useEffect } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Loader } from "lucide-react";

type ProfileData = {
  name: string;
  phone: string;
};

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString() || "";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getAuthToken();

        const res = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch profile1");

        const data = await res.json();
        setFormData({ name: data.name || "", phone: data.phone || "" });
      } catch (error: any) {
        console.error("Failed to fetch profile:2", error);
        setError(error.message || "Failed to fetch profile3");
      } finally {
        setLoading(false);
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
    setError(null);

    try {
      const token = await getAuthToken();

      const res = await fetch("http://localhost:3000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile4");
      }

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(error.message || "Failed to update profile5.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  if (loading)
  return (
    <div className="flex items-center justify-center h-60 text-gray-500 gap-2">
      <Loader className="animate-spin w-5 h-5" />
      Loading profile...
    </div>
    );

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Your Profile
      </h1>
      {error && (
        <div className="text-red-700 bg-red-100 border border-red-400 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing || isSaving}
            placeholder="e.g. John Doe"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing || isSaving}
            placeholder="e.g. +1 555 123 4567"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isSaving}
            className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-200 transition disabled:opacity-50"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSaving}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
              isSaving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}

        {message && (
          <div className="flex items-center gap-2 text-sm mt-2 text-green-600 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
