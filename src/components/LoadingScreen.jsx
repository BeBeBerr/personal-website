function LoadingScreen({ message }) {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
