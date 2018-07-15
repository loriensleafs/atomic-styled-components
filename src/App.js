import React from 'react';
import { withTheme } from 'styled-components'
import Flex from './Flex'
import Text from './Text'
import Button from './Button'


const App = props => {
  console.log(props.theme);

  return (
    <Flex width={ 1 / 2 }>
      <Text fontSize={ [2, 3] } textAlign='center'>hello</Text>
      <Button color='primary' variant='contained'>Button!</Button>
    </Flex>
  )
};

export default withTheme(App);
