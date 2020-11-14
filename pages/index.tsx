import React from 'react'
import Head from 'next/head'
import App from 'src'

import Context from '@prisma-cms/context'

class InnerComponent extends App {
  createError = () => {
    this.addError(new Error('Test Error'))
  }

  render() {
    return (
      <>
        {super.render()}

        <p>
          <button onClick={this.createError}>Add Error</button>
        </p>
      </>
    )
  }
}

const MainPage: React.FC = (props) => {
  return (
    <div {...props}>
      <Head>
        <title>@prisma-cms/component</title>
        <meta name="description" content="Component for prisma-cms" />
      </Head>
      <App object={null} {...props}>
        <Context.Provider
          value={{
            content: 'content',
          }}
        >
          Some content{' '}
          <Context.Consumer>
            {(context) => {
              return context.content
            }}
          </Context.Consumer>
          <div>
            <InnerComponent object={null}>InnerComponent</InnerComponent>
          </div>
        </Context.Provider>
      </App>
    </div>
  )
}

export default MainPage
