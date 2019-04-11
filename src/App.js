import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import Context from '@prisma-cms/context';

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";
import PrismaCmsComponent from './components/Component';

export {
  ContextProvider,
  SubscriptionProvider,
}

export default PrismaCmsComponent;