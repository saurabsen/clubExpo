import React from 'react';
import './backButton.css';
import { ReactComponent as BackButtonIcon } from '../../assets/Icons/back-button.svg';

const BackButton = () => {
  const buttonStyle = {
  };
  return (
    <BackButtonIcon className='standard-ui-backbutton' style={buttonStyle} />
  );
};

export default BackButton;