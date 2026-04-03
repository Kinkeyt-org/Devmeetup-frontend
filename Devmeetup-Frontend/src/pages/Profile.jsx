import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      await axios.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-20">
      <h1>Update Profile</h1>

      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Profile Picture
      </button>
    </div>
  );
};

export default Profile;