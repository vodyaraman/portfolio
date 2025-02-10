import React, { useRef, useEffect, type ReactNode } from "react";

interface ScrollButtonProps {
  target: string;
  children?: ReactNode;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ target, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const timer = setTimeout(() => {
      button.classList.add("active");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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