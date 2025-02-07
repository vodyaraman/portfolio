import React, { useRef, type ReactNode } from "react";

interface ScrollButtonProps {
  target: string;
  children?: ReactNode;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ target, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, {
        duration: 1.5,
      });
    }
  };

  return (
    <button ref={buttonRef} className="scroll-button" onClick={handleScroll}>
      {children}
    </button>
  );
};

export default ScrollButton;
