import { Box, Text } from '@chakra-ui/react'

import SearchForm from '../SearchForm'
import { heroText } from '../../data'

const Hero = () => {
  return (
    <Box
      px={10}
      py={10}
      color="#fff"
      display={'flex'}
      justifyContent="center"
      alignItems={'center'}
      className="hero-section"
    >
      <Box textAlign={'center'} py={20} my={14} width={'70%'}>
        <Text fontSize="5xl">{heroText.title}</Text>
        {/* <Text my={8} px={20}>
          {heroText.subtitle}
        </Text> */}
        <SearchForm />
      </Box>
    </Box>
  )
}

export default Hero
