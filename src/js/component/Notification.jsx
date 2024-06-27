import React from "react";
import PropTypes from "prop-types";

const Notification = ({ text, type, onClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {text}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
