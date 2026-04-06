import { useEffect, useState } from "react";
import { updateProfile} from "../api/user"; // Your logic file
import { deleteEvent } from "../api/event"; // For event deletion in organizer dashboard

const Profile = ({ user }) => {
  const isOrganizer = user.role === "organizer"; //

  const handlePhotoUpdate = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);
      await updateProfile(formData); // Emma's PATCH route
      // Refresh user data here
    }
  };

  return (
    <div className="profile-container">
      {/* Avatar Management */}
      <div className="avatar-section">
        <img src={user.avatar} alt="Profile" /> {/* */}
        <input type="file" onChange={handlePhotoUpdate} hidden id="photoInput" />
        <label htmlFor="photoInput" className="btn-minimal">Update Photo</label>
      </div>

      {/* User Information */}
      <div className="info-section">
        <h1>{user.name}</h1> {/* */}
        <p>{user.email}</p> {/* */}
        <span className="role-badge">{user.role}</span> {/* */}
        <p className="joined-date">Member since: {user.joined_at}</p> {/* */}
      </div>

      {/* Organizer Controls */}
      {isOrganizer && (
        <div className="organizer-dashboard">
          <h3>My Created Events</h3>
          {/* Map through events created by this user */}
          <div className="event-management-list">
             {/* Example Event Row */}
             <div className="event-row">
               <span>WEB3 CONFERENCE</span>
               <button onClick={() => {/* navigate to edit */}}>Update</button>
               <button onClick={() => deleteEvent("event-id")}>Delete</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile