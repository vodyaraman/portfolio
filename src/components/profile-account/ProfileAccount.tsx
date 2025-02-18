import React, { useState } from 'react';

const ProfileCard = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <aside 
      className={`profile-card${isActive ? ' active' : ''}`} 
      onClick={handleClick}
    >
      <div className="profile-card__text-wrapper" draggable='false'>
        <h2 className="profile-card__title">Anton Saevskii</h2>
        <span className="profile-card__subtitle">
          22 y.o., Murmansk, Russia
        </span>
      </div>
      <img
        className="profile-card__image"
        src="/mainphotos/profile_photo.jpg"
        alt="photo"
      />
    </aside>
  );
};

export default ProfileCard;