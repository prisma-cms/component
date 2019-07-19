// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

// class ComponentField extends PureComponent {


//   componentDidUpdate(prevProps, prevState) {

//     const keys = Object.keys(this.props);

//     keys.map(key => {

//       const value = this.props[key];

//       const prevValue = prevProps[key];

//       if (value !== undefined && prevValue !== undefined && value !== prevValue) {

//         console.log("ComponentField componentDidUpdate value !== prevValue / ", key, value, prevValue);

//       }

//     });

//     super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);

//   }


//   render() {

//     const {
//       children,
//     } = this.props;

//     // console.log("ComponentField props.children", children);

//     // return "ComponentField"

//     return children;

//   }
// }

// export default ComponentField;