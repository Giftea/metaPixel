import {
  Avatar,
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import LocationIcon from '../Icons/LocationIcon'
import Images from '../InfinitePhotos'
import {
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  TwitterIcon,
  RedditIcon,
  PinterestIcon,
} from 'react-share'
import { saveAs } from 'file-saver'

function ViewImages({ isOpen, onClose, imageInfo }) {
  const [likes, setlikes] = useState(0)
  function like() {
    setTimeout(() => {
      setlikes(likes + 1)
    }, 3000)
  }
  return (
    <>
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#F2F0F4" py={4}>
            <Flex alignItems={'center'} justifyContent="space-between">
              <Flex alignItems={'center'}>
                <Avatar mx={3} />
                <Text mx={3}>Giftea</Text>
                <button className="btn-outline">Follow</button>
              </Flex>
              <Flex alignItems={'center'} gap="2">
                <button className="btn-primary">Reward Creator</button>
                <Spacer />
                <button
                  className="btn-outline"
                  onClick={() => saveAs(imageInfo?.url, imageInfo?.title)}
                >
                  Download Image
                </button>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalBody pt={0}>
            <Flex justifyContent={'center'} px={3}>
              <Image height="600px" src={imageInfo?.url} />
            </Flex>
            <Box my={4} px={5}>
              <Flex gap="2">
                <button className="btn-outline" onClick={() => like()}>
                  {likes} Likes
                </button>
                {/* <button className="btn-outline">Share</button> */}

                <PinterestShareButton
                  url={imageInfo?.url}
                  media={imageInfo?.url}
                >
                  {' '}
                  <PinterestIcon size={32} round />{' '}
                </PinterestShareButton>
                <RedditShareButton
                  url={imageInfo?.url}
                  title={imageInfo?.title}
                  windowWidth={660}
                  windowHeight={460}
                >
                  {' '}
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <TwitterShareButton url={imageInfo?.url}>
                  {' '}
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Flex>
              <Box mt="4">
                <Text fontSize={'20px'} fontWeight={'bold'}>
                  {imageInfo?.title}
                </Text>
                <Text my="3">{imageInfo?.desc}</Text>
                <Flex alignItems={'center'}>
                  <LocationIcon />{' '}
                  <Text ml={2} fontWeight={'thin'}>
                    Nigeria
                  </Text>
                </Flex>
              </Box>
              <Box mt={6}>
                <Text color={'#666'} fontSize={'18px'} fontWeight={'bold'}>
                  Related photos
                </Text>

                {/* <Images width={'auto'} /> */}
                <Images />
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewImages
