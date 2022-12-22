import React, { useState, useEffect } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Images from "./Images";
import axios from "axios";

const Loader = () => (
  <Flex justifyContent="center" py="2rem">
    <Spinner size="xl" />
  </Flex>
);

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const config = {
        method: "get",
        url: "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
        },
      };

      const res = await axios(config);
      setLoading(false);
      console.log(res?.data?.rows);
      setImages(res?.data?.rows);
      return res?.data?.rows;
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchMoreData = async () => {
  //   const moreData = await fetchImages();
  //   setTimeout(() => {
  //     setImages(moreData);
  //   }, 1500);
  // };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box w="90%" m="0 auto">
      {/* <InfiniteScroll
        next={fetchMoreData()}
        dataLength={images?.length}
        hasMore={false}
        loader={<Loader />}
      > */}
        {loading && <Loader />}
        <Images images={images} />
      {/* </InfiniteScroll> */}
    </Box>
  );
};

export default Home;
