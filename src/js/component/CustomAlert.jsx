import React from 'react';
import PropTypes from 'prop-types';

const CustomAlert = ({ variant, text, type, onClick }) => {
  return (
    <div className={`alert alert-${variant} alert-dismissible fade show`} role="alert">
      {text}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClick}></button>
    </div>
  );
};

CustomAlert.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomAlert;
