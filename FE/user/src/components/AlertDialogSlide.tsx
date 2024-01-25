import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '~/hooks'
import { selectAlert, setCloseAlert } from '~/store/reducers'

const Transition = React.forwardRef<JSX.Element, TransitionProps & { children: JSX.Element }>(
  function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  }
)

export function AlertDialogSlide() {
  const { id, isOpen, title, content } = useAppSelector(selectAlert)
  const dispatch = useDispatch()

  const handleCloseDisagree = () => {
    dispatch(setCloseAlert({ confirm: false }))
  }

  const handleCloseAgree = () => {
    dispatch(setCloseAlert({ confirm: true, id: id }))
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree}>Disagree</Button>
          <Button onClick={handleCloseAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
