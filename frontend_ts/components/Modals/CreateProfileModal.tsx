import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
  Flex,
  ModalCloseButton,
  useToast,
  Text,
  Input,
  Box,
  Checkbox,
  Spinner,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import UploadModalIcon from '../Icons/UploadModalIcon'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px 20px',
  borderRadius: 10,
  backgroundColor: '#F3F3F3',
  color: '#0C0C0C',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const UploadImage = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [profileImg, setProfileImg] = useState('')

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone()
  const toast = useToast()
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  async function handleOnChange() {
    const reader = new FileReader() // create new reader to read image file as a daat URL

    reader.onload = function (onLoadEvent) {
      //setProfileImg(onLoadEvent.target.result) // save base64 encoded version of image
    }

    reader.readAsDataURL(acceptedFiles[0])
    return profileImg
  }

  async function handleOnSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const image = await handleOnChange()

    setLoading(false)
    onClose() // close modal
    toast({
      title: 'Image Successfully Uploaded!',
      position: 'top',
      variant: 'left-accent',
      status: 'success',
      isClosable: true,
    })
    try {
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        position: 'top',
        variant: 'left-accent',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#F2F0F4" textAlign={'center'}>
          Sign up for pixeed
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleOnSubmit}>
            {' '}
            <Box my={3}>
              <Text color={'#999999'}>Profile Name</Text>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box my={3}>
              <Text color={'#999999'}>Biography</Text>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </Box>
            <Box
              my={3}
              border={'1px'}
              borderColor="#7879F1"
              p={2}
              borderRadius={10}
              cursor="pointer"
            >
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Box mb={2}>
                  <UploadModalIcon />
                </Box>

                <p>Drag and drop your profile avatar here</p>
                <Text>{acceptedFiles[0]?.path}</Text>
              </div>
            </Box>
            <button className="btn-primary w-full">
              {loading ? <Spinner /> : 'Sign Up'}
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UploadImage
