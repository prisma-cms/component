import React, { memo, useCallback } from 'react'

import ReactDOM from 'react-dom'

import SnackbarUI from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import { SnackbarProps } from './interfaces'

export * from './interfaces'

export const Snackbar: React.FC<SnackbarProps> = (props) => {
  // if (typeof window === "undefined") {
  //   return null;
  // }

  const { message, close, opened, error, ...other } = props

  const onClick = useCallback(
    (event) => {
      event.stopPropagation()
      event.preventDefault()
      close && error && close(error)
    },
    [close, error]
  )

  return ReactDOM.createPortal(
    <SnackbarUI
      open={opened}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      message={<span>{message}</span>}
      action={
        <>
          {close && error ? (
            <Button
              color="primary"
              variant="raised"
              size="small"
              onClick={onClick}
            >
              Close
            </Button>
          ) : null}
        </>
      }
      style={{
        zIndex: 3000,
      }}
      {...other}
    />,
    window.document.body
  )
}

export default memo(Snackbar)
