import React from 'react'
import styled from 'styled-components'
import Component from '../../src'

import { render } from '../tests/utils'

const border = '1px solid green'

const ComponentStyled = styled(Component)`
  color: ${({ theme }) => theme.colors.primary};

  border: ${border};
`

describe('Component', () => {
  it('Render default', () => {
    const tree = render(<Component object={null} />)
    expect(tree.container).toMatchSnapshot()
  })

  it('Render styled', () => {
    const tree = render(<ComponentStyled />)
    const node = tree.container.children[0]
    expect(tree.container).toMatchSnapshot()
    expect(node).toBeUndefined()
  })
})
