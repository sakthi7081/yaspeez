import React from 'react';
import Snackbar from 'react-native-snackbar-component';

const ToastBar = ({...props}) => {
  return (
    <Snackbar {...props} />
  );
}

export default ToastBar;