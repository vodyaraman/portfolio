import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const DownloadResume = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (showOverlay) {
            gsap.to(overlayRef.current, {
                duration: 0.3,
                autoAlpha: 1
            });
        }
    }, [showOverlay]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/Saevskii_A_A-CV.pdf';
        link.download = 'Saevskii_A_A_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleButtonClick = () => {
        setShowOverlay(true);
    };

    const handleConfirm = () => {
        gsap.to(overlayRef.current, {
            duration: 0.2,
            autoAlpha: 0,
            onComplete: () => {
                setShowOverlay(false);
                handleDownload();
            }
        });
    };

    const handleCancel = () => {
        gsap.to(overlayRef.current, {
            duration: 0.2,
            autoAlpha: 0,
            onComplete: () => setShowOverlay(false)
        });
    };

    return (
        <aside className="profile-card download-cv">
                <button
                    className="profile-card__download-cv-button"
                    onClick={handleButtonClick}
                >
                    <h1 className="profile-card__subtitle">Download CV</h1>
                    <img
                        className="profile-card__download"
                        src="/icons/pdf.svg"
                        alt="PDF"
                    />
                </button>
                {showOverlay && (
                <div
                    className="profile-card__overlay"
                    ref={overlayRef}
                    style={{ visibility: 'hidden', opacity: 0 }}
                >
                        <button
                            className="profile-card__download-cv-button"
                            onClick={handleConfirm}
                        >
                            ✔️
                        </button>

                        <button
                            className="profile-card__download-cv-button"
                            onClick={handleCancel}
                        >
                            ❌
                        </button>
                </div>
            )}
        </aside>
    );
};

export default DownloadResume;