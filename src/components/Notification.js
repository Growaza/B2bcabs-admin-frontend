import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import { makeStyles } from '@mui/styles';
// import {makeStyles} from '@mui/material/styles/makeStyles'

// const useStyles = makeStyles(theme => ({
//     root: {
//         top: theme.spacing(9)
//     }
// }))
function Notification(props) {
    const {notify,setNotify} = props;
    // const classes = useStyles()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    return (
        <Snackbar
        // className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
        >
            <Alert severity={notify.type}  variant="filled" onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
