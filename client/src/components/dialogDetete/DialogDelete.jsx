import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogDelete(props) {
  return (
    <div>
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm" >
        <DialogTitle>Delete {props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this {props.title} from this {props.object}?
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <button onClick={props.onClick1} className="btnEdit">Yes  </button>
            <button onClick={props.onClick2} className="btnCancel"> Cancel  </button>
        </DialogActions>
    </Dialog>
</div>
  )
}
