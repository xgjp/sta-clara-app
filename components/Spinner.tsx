export const Spinner = () => (
    <div className="spinner-container">
        <div className="spinner"></div>
        <style jsx>{`
            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .spinner {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
)