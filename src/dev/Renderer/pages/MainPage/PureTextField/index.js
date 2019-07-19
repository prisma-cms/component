import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class PureTextField extends PureComponent {




  componentDidUpdate(prevProps, prevState) {

    const keys = Object.keys(this.props);

    keys.map(key => {

      const value = this.props[key];

      const prevValue = prevProps[key];

      if (value !== undefined && prevValue !== undefined && value !== prevValue) {

        console.log("PureTextField componentDidUpdate value !== prevValue / ", key, value, prevValue);

      }

    });

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);

  }


  render() {

    return <TextField
      {...this.props}
    />;
  }
}

export default PureTextField;