import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  Stack,
  Icon,
} from '@chakra-ui/react'
import { Button, Text } from '@chakra-ui/react'
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Checkbox,
} from '@chakra-ui/react'
import DragDropFiles from './DragDropFiles'

function UploadPhoto() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Upload Photo</Button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {/* added stack */}
              <FormLabel>Photo title</FormLabel>
              <Input />
              <FormLabel>Photo description (optional)</FormLabel>
              <Input />
              <FormLabel>Tags</FormLabel>
              <Input />
              <Text>
                <Icon viewBox="0 0 20 20" color="lightgray">
                  <path
                    fill="white"
                    d="M17.5 8.33337C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33337C2.5 6.34425 3.29018 4.4366 4.6967 3.03007C6.10322 1.62355 8.01088 0.833374 10 0.833374C11.9891 0.833374 13.8968 1.62355 15.3033 3.03007C16.7098 4.4366 17.5 6.34425 17.5 8.33337Z"
                    stroke="#666666"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill="white"
                    d="M10 10.8334C11.3807 10.8334 12.5 9.71409 12.5 8.33337C12.5 6.95266 11.3807 5.83337 10 5.83337C8.61929 5.83337 7.5 6.95266 7.5 8.33337C7.5 9.71409 8.61929 10.8334 10 10.8334Z"
                    stroke="#666666"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Icon>
                Add tags
              </Text>

              <Checkbox>
                I own the copyright of this photo and any depicted people or
                owner of the depicted property has given me permission to
                publish the photo.
              </Checkbox>
              <Box>
                <DragDropFiles />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button className="btn-primary" variant="ghost">
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UploadPhoto
