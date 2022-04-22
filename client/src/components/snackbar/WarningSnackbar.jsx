import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function WarningSnackbar(props) {
  return (
    <div>
      <Snackbar open={props.open} autoHideDuration={1800} onClose={props.onClose}>
        <Alert  severity="warning" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
