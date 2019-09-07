import React from 'react';

import Page from "../layout";
import App from '../../../../App';
import Button from 'material-ui/Button';
import PureTextField from './PureTextField';

class DevMainPage extends Page {


  componentWillMount() {

    this.addLexicon("ru", {
      values: {
        word1: "Слово 1",
        word2: "Слово 2",
        // "Request error": "Ошибка запроса",
        helperText: "Подсказка",
        Label: "Название поля",
        "Show error": "Показать ошибку",
        "Test error": "Тестовое сообщение",
      },
    });

    this.addLexicon("en", {
      values: {
        word1: "word 1",
        word2: "word 2",
        "Request error": "Request custom error",
        helperText: "Hint",
      },
    });

  }


  forceUpdateBind = () => this.forceUpdate();

  render() {

    const {
      ...other
    } = this.props;

    const {
      Grid,
    } = this.context;

    // console.log("this.state", { ...this.state });

    const {
      numberField,
      numberField3,
    } = this.state._dirty || {};


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

          <Grid
            item
            xs={12}
          >

            {/* PureDiv: {this.renderField(pureDiv)} */}

            {/* PureDiv 2: {this.renderField(<div>
              Pure div 2
            </div>)} */}

          </Grid>


          {/* 
          <Grid
            item
            xs={12}
          >
            Text field: {this.renderField(<TextField
              label="Label"
              helperText="helperText"
            />)}
          </Grid>

          <Grid
            item
            xs={12}
          >
            Number field: {this.renderField(<TextField
              label="Number Label"
              helperText="helperText"
              type="number"
              name="numberField"
              onChange={event => this.onChange(event)}
            />)}
          </Grid> */}

          <Grid
            item
            xs={12}
          >
            PureTextField: <PureTextField
              label="Number Label"
              helperText="helperText"
              type="number"
              name="numberField"
              // onChange={event => this.onChange(event)}
              onChange={this.forceUpdateBind}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            PureTextField 2: <PureTextField
              label="Number Label 2"
              helperText="helperText"
              type="number"
              name="numberField"
              // onChange={event => this.onChange(event)}
              onChange={this.forceUpdateBind}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            PureTextField via this.renderField: {this.renderField(<PureTextField
              label="Number Label"
              helperText="helperText"
              type="number"
              name="numberField"
              value={numberField || ""}
            // onChange={event => this.onChange(event)}
            // onChange={this.forceUpdateBind}
            />)}
          </Grid>

          <Grid
            item
            xs={12}
          >
            PureTextField via this.renderField 2: {this.renderField(<PureTextField
              label="Number Label"
              helperText="helperText"
              type="number"
              name="numberField"
              value={numberField || ""}
            // onChange={event => this.onChange(event)}
            // onChange={this.forceUpdateBind}
            />)}
          </Grid>

          <Grid
            item
            xs={12}
          >
            PureTextField via this.renderField 3: {this.renderField(<PureTextField
              label="Number Label"
              helperText="helperText"
              type="number"
              name="numberField3"
              value={numberField3 || ""}
            // onChange={event => this.onChange(event)}
            // onChange={this.forceUpdateBind}
            />)}
          </Grid>

          <Grid
            item
            xs={12}
          >
            Show error: <Button
              onClick={event => {
                this.addError("Test error")
              }}
            >
              {this.lexicon("Show error")}
            </Button>
          </Grid>

        </Grid>

      </App>
    );
  }
}


export default DevMainPage;