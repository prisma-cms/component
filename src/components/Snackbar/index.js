import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import ReactDOM from 'react-dom';

import SnackbarUI from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export default class Snackbar extends PureComponent {

  static propTypes = {
    error: PropTypes.object,
    opened: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    close: PropTypes.func,
  }


  // componentDidUpdate(prevProps, prevState) {

  //   const keys = Object.keys(this.props);

  //   keys.map(key => {

  //     const value = this.props[key];

  //     const prevValue = prevProps[key];

  //     if (value !== undefined && prevValue !== undefined && value !== prevValue) {

  //       console.log("Snackbar componentDidUpdate value !== prevValue / ", key, value, prevValue);

  //     }

  //   });

  //   super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);

  // }


  render() {

    if (typeof window === "undefined") {
      return null;
    }

    const {
      message,
      close,
      opened,
      error,
      ...other
    } = this.props;
    return ReactDOM.createPortal(
      <SnackbarUI
        open={opened}
        // autoHideDuration={errorDelay}
        // onClose={event => this.onCloseError(error)}
        // SnackbarContentProps={{
        //   // 'aria-describedby': 'snackbar-fab-message-id',
        //   // className: classes.snackbarContent,
        // }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        message={<span
        // id="snackbar-fab-message-id"
        >
          {message}
        </span>}
        action={
          <Fragment>

            {close ? <Button
              color="primary"
              variant="raised"
              size="small"
              onClick={event => {

                event.stopPropagation();
                event.preventDefault();
                close && close(error)
              }}
            >
              Close
          </Button> : null
            }

          </Fragment>
        }
        style={{
          // position: "absolute",
          // width: "100%",
          // height: "100%",
          // margin: 0,
          // padding: 0,
          // bottom: 0,
          zIndex: 3000,
        }}
        {...other}
      />, window.document.body
    )
  }
}
