const DownloadResume = () => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Saevskii_A_A-CV.pdf";
        link.download = "Saevskii_A_A_resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <aside className="profile-card download-cv">
            <button className="profile-card__download-cv-button" onClick={handleDownload}>
                <h1 className="profile-card__subtitle">Download CV</h1>
                <img className="profile-card__download" src="/icons/pdf.svg" alt="PDF"/>
            </button>
        </aside>
    );
};

export default DownloadResume;
