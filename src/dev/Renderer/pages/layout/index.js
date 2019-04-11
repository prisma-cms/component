import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";
import PrismaCmsComponent from '../../../../App';

class DevPageLayout extends PrismaCmsComponent {

  static contextType = Context;


  render(content = null) {

    return content;
  }
}


export default DevPageLayout;