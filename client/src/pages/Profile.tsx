import React, { useState, useEffect } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { fetchAuthSession } from "aws-amplify/auth";

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

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setFormData({ name: data.name || "", phone: data.phone || "" });
      } catch (error: any) {
        console.error("Failed to fetch profile:", error);
        setError(error.message || "Failed to fetch profile");
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
        throw new Error("Failed to update profile");
      }

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(error.message || "Failed to update profile.");
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

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
      {error && (
        <div className="text-red-600 p-4 mb-4 rounded border border-red-400">
          {error}
        </div>
      )}
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
            disabled={!isEditing || isSaving}
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
            disabled={!isEditing || isSaving}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
          />
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isSaving}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
