import React from 'react';
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'


const App = props => (
  <Flex width={ 1 / 2 }>
    <Text fontSize={ [2, 3] } textAlign='center' caps>hello</Text>
  </Flex>
);

export default withTheme(App);
