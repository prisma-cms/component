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
        // "Request error": "Ошибка запроса",
      },
    });

    this.addLexicon("en", {
      values: {
        word1: "word 1",
        word2: "word 2",
        "Request error": "Request custom error",
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
            xs={12}
          >
            word1: {this.lexicon("word1")}
          </Grid>
          <Grid
            item
            xs={12}
          >
            word2: {this.lexicon("word2")}
          </Grid>
          <Grid
            item
            xs={12}
          >
            Request error: {this.lexicon("Request error")}
          </Grid>
        </Grid>

      </App>
    );
  }
}


export default DevMainPage;