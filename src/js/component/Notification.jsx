import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, onClose }) => {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
