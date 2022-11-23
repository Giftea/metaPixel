import React from "react";
import { nanoid } from "nanoid";
import {
  Image,
  Flex,
  Box,
  IconButton,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import { DownloadIcon } from "@chakra-ui/icons";

const Images = ({ images }) => {
  const breakpointColumnsObj = {
    default: 3,
    1500: 3,
    800: 1,
  };

  const columnClassName = "my-masonry-grid_column";

  const gutterSpace = "30px";

  const masonryStyles = {
    ml: `-${gutterSpace}`,
  };

  const selector = `& .${columnClassName}`;

  masonryStyles[selector] = {
    pl: gutterSpace,
    backgroundClip: "padding-box",
  };

  return (
    <Flex
      columnClassName={columnClassName}
      as={Masonry}
      breakpointCols={breakpointColumnsObj}
      sx={masonryStyles}
      mt="2rem"
    >
      {images.map((image) => (
        <CustomImage
          w="100%"
          key={nanoid()}
          mb={gutterSpace}
          src={image}
          alt=""
        />
      ))}
    </Flex>
  );
};

export default Images;

const CustomImage = ({ mb, src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} className="custom-image">
        <Image w="100%" mb={mb} src={src} alt="" />
        <div className="custom-image-overlay"></div>
        <Stack direction={"row"} className="custom-image-more">
          <IconButton border={"none"} icon={<DownloadIcon />} />{" "}
          <IconButton border={"none"} icon={<>♡</>} />
        </Stack>
      </Box>
      <CustomImageModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

function CustomImageModal({ isOpen, onClose }) {
  return (
    <>
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
