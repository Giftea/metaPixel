import {
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { authenticate, challenge, getProfiles } from '../../lensCalls'
import { useEffect, useState } from 'react'

import { apolloClient as client } from '../../src/apollo-client'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'

export default function AuthenticateModal({ isOpen, onClose, variant }) {
  const [profiles, setProfiles] = useState([])
  const { address } = useAccount()
  const toast = useToast()

  async function fetchProfiles() {
    try {
      const response = await getProfiles({ ownedBy: [`${address}`], limit: 10 })
      setProfiles(response.data.profiles.items)
    } catch (error) {
      console.log('fetchProfiles ERROR:', error)
    }
  }

  async function login() {
    try {
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      )
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      })
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData
      localStorage.setItem('lens_auth_token', accessToken)
      onClose()
      toast({
        title: 'Lens is authenticated!',
        position: 'top',
        variant: 'left-accent',
        status: 'success',
        isClosable: true,
      })
    } catch (err) {
      console.log('Error signing in: ', err)
      onClose()
      toast({
        title: 'Authentication error',
        position: 'top',
        variant: 'left-accent',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [address])
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Heading as="h2" size="xl">
                Welcome to Pixeed!
              </Heading>{' '}
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Center>
              <button onClick={() => login()} className="btn-primary">
                Authenticate Lens
              </button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
