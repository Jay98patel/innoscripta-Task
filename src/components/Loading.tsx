import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="overlay">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
