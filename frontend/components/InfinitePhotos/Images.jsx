import React from "react";
import { nanoid } from "nanoid";
import {
  Image,
  Flex,
  Box,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import { DownloadIcon } from "@chakra-ui/icons";
import CustomImageModal from "../Modals/ViewImage";

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
      {images?.map((image) => (
        <CustomImage
          w="100%"
          key={nanoid()}
          mb={gutterSpace}
          alt=""
          imageInfo={image}
        />
      ))}
    </Flex>
  );
};

export default Images;

const CustomImage = ({ mb, imageInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} className="custom-image">
        <Image w="100%" mb={mb} src={imageInfo?.url} alt="" />
        <div className="custom-image-overlay"></div>
        <Stack direction={"row"} className="custom-image-more">
          <IconButton border={"none"} icon={<DownloadIcon />} />{" "}
          <IconButton border={"none"} icon={<>♡</>} />
        </Stack>
      </Box>
      <CustomImageModal
        isOpen={isOpen}
        onClose={onClose}
        imageInfo={imageInfo}
      />
    </>
  );
};
