import React from 'react';
import Box from './Box'
import Flex from './Flex'
import Text from './Text'


const App = () => (
  <Flex width={ 1 / 2 }>
    <Text fontSize={ [2, 3] } textAlign='center' caps>hello</Text>
  </Flex>
);

export default App;
