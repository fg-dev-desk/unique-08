import React from 'react';

export const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '300px' }}>
      <div className="loader-ripple">
        <div></div>
        <div></div>
      </div>
      {message && <p className="text-muted mt-3">{message}</p>}
    </div>
  );
};

export default Loading;