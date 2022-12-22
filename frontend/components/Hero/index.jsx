import { Box, Text } from "@chakra-ui/react";
import { heroText } from "../../data";
import SearchForm from "../SearchForm";

const Hero = () => {
  return (
    <Box
      px={10}
      py={10}
      color="#fff"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      className="hero-section"
    >
      <Box textAlign={"center"} py={20} my={14} width={"70%"}>
        <Text fontSize="5xl">{heroText.title}</Text>
        <Text my={8} px={20}>
          Create an online portfolio and build an audience based on the content you upload
        </Text>
        <SearchForm />
      </Box>
    </Box>
  );
};

export default Hero;
