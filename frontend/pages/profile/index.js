import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/Layout";
import UserDetails from "../../components/ProfilePage/UserDetails";
import UserGallery from "../../components/ProfilePage/UserGallery";

const Home = () => {
  return (
    <Layout>
      <Box p={{ base: 6, md: 20 }}>
        <UserDetails />
        <UserGallery />
      </Box>
    </Layout>
  );
};

export default Home;
