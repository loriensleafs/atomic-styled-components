import { styled, withStyle } from 'styletron-react'
import { alignItems, alignContent, justifyContent, flexWrap, flexDirection, flex, flexBasis, justifySelf, alignSelf, order } from 'styled-system'
import tag from 'clean-tag'
import Box from '../Box'

const Flex = styled(Box, props => ({
    ...alignItems(props),
    ...alignContent(props),
    ...justifyContent(props),
    ...flexWrap(props),
    ...flexDirection(props),
    ...flex(props),
    ...flexBasis(props),
    ...justifySelf(props),
    ...alignSelf(props),
    ...order(props)
}))

Flex.displayName = 'Flex'

Flex.propTypes = {
    ...alignItems.propTypes,
    ...alignContent.propTypes,
    ...justifyContent.propTypes,
    ...flexWrap.propTypes,
    ...flexDirection.propTypes,
    ...flex.propTypes,
    ...flexBasis.propTypes,
    ...justifySelf.propTypes,
    ...alignSelf.propTypes,
    ...order.propTypes,
};

export default Flex