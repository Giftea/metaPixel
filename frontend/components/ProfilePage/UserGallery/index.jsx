import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import Images from "../../InfinitePhotos/Images";
import { dummyPhotos } from "../../../data";

const UserGallery = () => {
  const [images, setImages] = useState([]);

  return (
    <Box>
      <Text fontWeight={'bold'} fontSize={'2xl'}>Gallery</Text>
      <Images images={dummyPhotos} />
    </Box>
  );
};

export default UserGallery;
