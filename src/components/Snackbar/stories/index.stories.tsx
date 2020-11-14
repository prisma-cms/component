import React, { useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'

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

import Component, { SnackbarProps as ComponentProps } from '../'

const title = 'Snackbar'

export const Snackbar: React.FC<ComponentProps> = (props) => {
  const { message, ...other } = props

  const [error, setError] = useState<ComponentProps['error']>(undefined)

  const createError = useCallback(() => {
    const error = new Error(message)
    action('Set error')(error)
    setError(error)
  }, [setError, message])

  const close = useCallback(
    (error: Error) => {
      action('Close error')(error)
      setError(undefined)
    },
    [setError]
  )

  return (
    <>
      <p>
        <button onClick={createError}>Create error</button>
      </p>

      <Component
        {...other}
        message={message}
        error={error}
        opened={!!error}
        close={close}
      ></Component>
    </>
  )
}

const args: Partial<ComponentProps> = {
  message: 'Test error message',
}

export default {
  title,
  component: Snackbar,
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
