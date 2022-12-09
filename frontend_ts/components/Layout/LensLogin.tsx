import { useAccount } from 'wagmi'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { CustomConnectButton } from '../ConnectButton'
import AuthenticateModal from '../Modals/AuthenticateModals'

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
      <CustomConnectButton />
      {/* <AuthenticateModal isOpen={isOpen} onClose={onClose} /> */}
    </>
  )
}
