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
} from '@chakra-ui/react'
import { Button, Text } from '@chakra-ui/react'
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Checkbox,
} from '@chakra-ui/react'
import UploadIcon from './UploadIcon'
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
              <Text>Add tags</Text>

              <Checkbox>
                I own the copyright of this photo and any depicted people or
                owner of the depicted property has given me permission to
                publish the photo.
              </Checkbox>
              <Box>
                <DragDropFiles />
              </Box>

              {/* <Input
                variant="filled"
                placeholder="Drag and drop your files here"
                // children={<UploadIcon />}
              /> */}
            </Stack>

            {/* 
           <Input
              variant="filled"
              placeholder="Drag and drop your files here"
              children={<UploadIcon />}
            /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UploadPhoto
