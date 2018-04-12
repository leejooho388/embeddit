import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import rIcon from '../../../images/arrows.png'

const Head2 = () => (
  <Header as='h3' block>
    <Image src={ rIcon } size='tiny' verticalAlign='bottom'/> <span>Bottom Aligned</span>
  </Header>
)

export default Head2