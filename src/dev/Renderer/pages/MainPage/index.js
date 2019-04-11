import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";
import App from '../../../../App';
import { Typography } from 'material-ui';

class DevMainPage extends Page {


  componentWillMount() {

    this.addLexicon("ru", {
      values: {
        word1: "Слово 1",
        word2: "Слово 2",
      },
    });

    this.addLexicon("en", {
      values: {
        word1: "word 1",
        word2: "word 2",
      },
    });

  }

  render() {

    const {
      ...other
    } = this.props;

    const {
      Grid,
    } = this.context;

    return super.render(
      <App
        {...other}
      >

        <Grid
          container
          spacing={8}
        >
          <Grid
            item
          >
            {this.lexicon("word1")}
          </Grid>
          <Grid
            item
          >
            {this.lexicon("word2")}
          </Grid>
        </Grid>

      </App>
    );
  }
}


export default DevMainPage;