import AuthenticateModal from '../Modals/AuthenticateModals'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function LensLogin() {
  const { address, isConnected } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const userToken = localStorage.getItem('lens_auth_token')
    const lensHandle = localStorage.getItem('lens_handle')

    if (address && isConnected && !userToken) {
      onOpen()
    }
  }, [address])

  return (
    <>
      <ConnectButton />
      <AuthenticateModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
