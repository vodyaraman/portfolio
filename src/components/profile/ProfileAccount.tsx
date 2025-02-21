import React, { useRef } from 'react';
import { gsap } from 'gsap';

const ProfileCard = () => {
  const overlayRef = useRef(null);
  const email = "a.vodyaraman@gmail.com";

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <aside
      className="profile-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      <div className="profile-card__overlay" ref={overlayRef} style={{ opacity: 0 }}>
        <a
          className="profile-card__link profile-card__link--hh"
          href="https://hh.ru/resume/3a469acbff0d13c2f80039ed1f767966733052"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src='/icons/hh_ru.svg' />
        </a>
        <a
          className="profile-card__link profile-card__link--telegram"
          href="https://t.me/vodyaraman"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src='/icons/tg.svg' />
        </a>
        <a
          className="profile-card__link profile-card__link--github"
          href="https://github.com/vodyaraman"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src='/icons/github.svg' />
        </a>
      </div>
    </aside>
  );
};

export default ProfileCard;
