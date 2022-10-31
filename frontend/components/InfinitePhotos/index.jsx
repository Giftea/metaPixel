import React, { useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Images from "./Images";
import { dummyPhotos } from "../../data";

const Loader = () => (
  <Flex justifyContent="center" py="2rem">
    <Spinner size="xl" />
  </Flex>
);

const Home = () => {
  const [images, setImages] = useState([]);

  const fetchMoreData = async () => {
    setTimeout(() => {
      setImages(dummyPhotos);
    }, 1500);
  };

  return (
    <Box w="90%" m="0 auto">
      <InfiniteScroll
        next={fetchMoreData()}
        dataLength={images.length}
        hasMore={false}
        loader={<Loader />}
      >
        <Images images={images} />
      </InfiniteScroll>
    </Box>
  );
};

export default Home;
