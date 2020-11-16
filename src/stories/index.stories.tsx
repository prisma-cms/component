import React from 'react'
// import { action } from '@storybook/addon-actions'

import { Meta } from '@storybook/react'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
// import styled from 'styled-components'

import Context from '@prisma-cms/context'

import Component, { PrismaCmsComponentProps as ComponentProps } from '../'

const title = '@prisma-cms/component/component'

interface ComponentPropsCustom extends ComponentProps {
  message: string
}

export const BaseComponent: React.FC<ComponentProps> = (props) => {
  return (
    <Component
      {...props}
      data={{
        object: null,
      }}
    >
      Base Component
    </Component>
  )
}

class CustomComponent<
  C extends ComponentPropsCustom = ComponentPropsCustom
> extends Component<C> {
  createError = () => {
    this.addError('Test error')
  }

  render() {
    const { content: contextContent } = this.context

    return (
      <>
        <button onClick={this.createError}>Add error</button>

        {contextContent ? (
          <p>
            <b>Context content</b>: {contextContent}
          </p>
        ) : null}

        <p>Custom Component</p>
        {super.render()}
      </>
    )
  }
}

export const customComponent: React.FC = () => {
  return (
    <CustomComponent
      message="asdas"
      // data={{
      //   object: {
      //     name: 'Test object',
      //   },
      // }}
      object={{
        name: 'Test object',
      }}
    />
  )
}

export const componentWithContext: React.FC = () => {
  return (
    <Context.Provider
      value={{
        content: 'Some context content',
      }}
    >
      <CustomComponent
        message="asdas"
        // data={{
        //   object: {
        //     name: 'Test object',
        //   },
        // }}
        object={{
          name: 'Test object',
        }}
      />
    </Context.Provider>
  )
}

const args: Partial<ComponentPropsCustom> = {
  message: 'Test error message',
}

export default {
  title,
  component: BaseComponent,
  argTypes: {},
  args,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>{title}</Title>
          <Subtitle></Subtitle>
          <Description></Description>
          <Primary></Primary>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta
