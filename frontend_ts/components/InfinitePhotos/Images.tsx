import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'

import { DownloadIcon } from '@chakra-ui/icons'
import ViewImages from '../Modals/ViewImages'
import Masonry from 'react-masonry-css'
import React from 'react'
import { nanoid } from 'nanoid'

const Images = ({ images }) => {
  const breakpointColumnsObj = {
    default: 3,
    1500: 3,
    800: 1,
  }

  const columnClassName = 'my-masonry-grid_column'

  const gutterSpace = '30px'

  const masonryStyles = {
    ml: `-${gutterSpace}`,
  }

  const selector = `& .${columnClassName}`

  masonryStyles[selector] = {
    pl: gutterSpace,
    backgroundClip: 'padding-box',
  }

  return (
    <Flex
      columnClassName={columnClassName}
      as={Masonry}
      breakpointCols={breakpointColumnsObj}
      sx={masonryStyles}
      mt="2rem"
    >
      {images?.map((image) => (
        <CustomImage
          w="100%"
          key={nanoid()}
          mb={gutterSpace}
          src={image}
          alt=""
          imageInfo={image}
        />
      ))}
    </Flex>
  )
}

export default Images

// const CustomImage = ({ mb, imageInfo }) => {
const CustomImage = ({ mb, src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box onClick={onOpen} className="custom-image">
        {/* <Image w="100%" mb={mb} src={imageInfo?.url} alt="" /> */}
        <Image w="100%" mb={mb} src={src} alt="" />
        <div className="custom-image-overlay"></div>
        <Stack direction={'row'} className="custom-image-more">
          <IconButton
            aria-label="Download"
            border={'none'}
            icon={<DownloadIcon />}
          />{' '}
          <IconButton aria-label="Like" border={'none'} icon={<>♡</>} />
        </Stack>
      </Box>
      <ViewImages imageInfo={'images'} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
