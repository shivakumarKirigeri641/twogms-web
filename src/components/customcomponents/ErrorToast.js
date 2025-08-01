import React from "react";

const ErrorToast = ({ message }) => {
  return (
    <div>
      <div className="toast toast-center toast-middle">
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
