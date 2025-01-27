import { useEffect, useState } from "react";

export function useScrollPosition(selector: string) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = document.querySelector(selector);

    if (!element) return;

    const handleScroll = () => {
      setScrollY(element.scrollTop || 0);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [selector]);

  return scrollY;
}
