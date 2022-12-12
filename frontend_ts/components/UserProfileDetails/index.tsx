import { Avatar, Box, Flex, Spacer, Text, useToast } from '@chakra-ui/react'
import {
  createFollowTypedData,
  getFollowers,
  getFollowing,
  getProfile,
} from '../../lensCalls'
import { useEffect, useState } from 'react'

import { EditIcon } from '@chakra-ui/icons'
import FollowersModal from '../Modals/FollwersModal'
import FollowingModal from '../Modals/FollowingModal'
// import getAvatar from '../../lib/getAvatar'
import { useAccount } from 'wagmi'
import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const {
    isOpen: followingIsOpen,
    onOpen: followingOnOpen,
    onClose: followingOnClose,
  } = useDisclosure()
  const router = useRouter()
  const query = router?.query?.lenshandle
  const { address } = useAccount()
  const [profiles, setProfiles] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  async function fetchProfiles() {
    try {
      const response = await getProfile({ handle: query })
      setProfiles(response?.data?.profile)
      console.log(response)
      // if (response?.data) {
      //   const url = await profiles?.picture?.original?.url
      //   const slice = url?.slice(url.lastIndexOf('/'), url?.length)
      //   setImgUrl(`https://lens.infura-ipfs.io/ipfs${slice}`)
      // }
      setImgUrl(getAvatar(profiles))
    } catch (error) {
      console.log('fetchProfiles ERROR:', error)
    }
  }

  async function getMyFollowers() {
    try {
      const response = await getFollowers(profiles?.id)

      setFollowers(response?.data?.followers?.items)
      onOpen()
    } catch (error) {
      console.log(error)
    }
  }

  async function getMyFollowing() {
    try {
      console.log(profiles?.ownedBy)
      const response = await getFollowing(profiles?.ownedBy)

      console.log('following', response)
      setFollowing(response?.data?.following?.items)
      followingOnOpen()
    } catch (error) {
      console.log(error)
    }
  }

  async function followUser(id: string) {
    try {
      const response = await createFollowTypedData({
        follow: [
          {
            profile: id,
          },
        ],
      })

      toast({
        title: 'Followed User!',
        position: 'top',
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      })

      console.log(response)
    } catch (error) {
      toast({
        title: error.message,
        position: 'top',
        variant: 'left-accent',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [query])

  return (
    <Box px={{ base: 6, md: 20 }} pt={10}>
      <Flex alignItems={'center'} pb={10}>
        <Box alignItems={'center'}>
          <Avatar
            height={'240px'}
            width="240px"
            src={imgUrl}
            name={profiles?.name}
          />
        </Box>
        <Spacer />
        <Box width={{ base: 'auto', md: '70%' }}>
          <Flex alignItems={'center'}>
            {' '}
            <Text textAlign="center" mr={6} fontSize="4xl">
              {profiles?.name}
            </Text>
            <Text textAlign="center" mr={6} fontSize="xl">
              {profiles?.handle}
            </Text>
            {address === profiles?.ownedBy ? (
              <button
                className="btn-outline"
                onClick={() => router.push('/profile/editProfile')}
              >
                <EditIcon mr={2} /> Edit Profile
              </button>
            ) : (
              <>
                {' '}
                <button
                  className="btn-outline"
                  onClick={() => followUser(profiles?.id)}
                >
                  <Text px={6}> Follow</Text>
                </button>
                <button
                  className="btn-primary"
                  // onClick={() => router.push("/profile/editProfile")}
                  style={{ marginLeft: '15px' }}
                >
                  Reward Creator
                </button>
              </>
            )}
          </Flex>
          <Text mt={6} fontSize="xl">
            {profiles?.bio}
          </Text>
          <Flex mt={6} textAlign="center">
            <Flex fontSize="3xl" mr={8}>
              {' '}
              <Text color={'#625da0'} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalPosts}
              </Text>
              <Text>Posts</Text>
            </Flex>
            <Flex fontSize="3xl" mr={8}>
              {' '}
              <Text color={'#625da0'} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalFollowers}
              </Text>
              <Text cursor={'pointer'} onClick={() => getMyFollowers()}>
                Followers
              </Text>
            </Flex>{' '}
            <Flex fontSize="3xl" mr={8}>
              {' '}
              <Text color={'#625da0'} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalFollowing}
              </Text>
              <Text cursor={'pointer'} onClick={() => getMyFollowing()}>
                Following
              </Text>
            </Flex>{' '}
            <Flex fontSize="3xl" mr={8}>
              {' '}
              <Text color={'#625da0'} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalPosts}
              </Text>
              <Text>Views</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Text fontSize="xl" mt={20} color={'#666666'} fontWeight="bold">
        Your Photos
      </Text>

      <FollowersModal
        isOpen={isOpen}
        onClose={onClose}
        followers={followers}
        userName={profiles?.name}
      />
      <FollowingModal
        isOpen={followingIsOpen}
        onClose={followingOnClose}
        followers={following}
        userName={profiles?.name}
      />
    </Box>
  )
}

export default Profile
