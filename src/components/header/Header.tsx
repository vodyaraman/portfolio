import { Suspense, useEffect, useState } from 'react';
import "./Header.scss";

export default function Header() {
    const [expanded, setExpanded] = useState(15);

    useEffect(() => {
        const e = document.querySelector('.landing');

        if (!e) return;

        const handleScroll = () => {
            const currentScroll = e.scrollTop;
            console.log(currentScroll);

            if (currentScroll <= window.innerHeight - 200) {
                setExpanded(15);
            } else if (currentScroll >= window.innerHeight) {
                setExpanded(window.innerWidth / 20);
            } else {
                const start = window.innerHeight - 200;
                const end = window.innerHeight;
                const progress = (currentScroll - start) / (end - start);
                const interpolatedValue = 15 + progress * ((window.innerWidth / 20) - 15);
                setExpanded(interpolatedValue);
            }
        };

        e.addEventListener("scroll", handleScroll);

        return () => e.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Suspense fallback='Шапка'>
            <header>
                <nav className={`${expanded > window.innerWidth / 20 - 10 && "expanded"}`}>
                    <a style={{ padding: `10px ${expanded}px` }}>MAIN</a>
                    <a style={{ padding: `10px ${expanded}px` }}>PORTFOLIO</a>
                    <a style={{ padding: `10px ${expanded}px` }}>EDUCATION</a>
                    <a style={{ padding: `10px ${expanded}px` }}>ABOUT</a>
                    <a style={{ padding: `10px ${expanded}px` }}>SUPPORT</a>
                </nav>
            </header>
        </Suspense>
    );
}
