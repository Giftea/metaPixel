import React from "react";
import {
  Text,
  Stack,
  Box,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const UserDetails = () => {
  const router = useRouter();
  return (
    <Box textAlign={"center"}>
      <Avatar size={"2xl"} />
      <Text mt={4} fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
        AL Bigh{" "}
        <Tooltip label="Edit Profile">
          <IconButton
            variant="outline"
            colorScheme="purple"
            border={"none"}
            icon={<EditIcon />}
            onClick={() => router.push("/profile/settings")}
          />
        </Tooltip>
      </Text>
      <Stack my={8} direction={"row"} justifyContent="center">
        <Box px={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: "sm", md: "md" }}>Total Views</Text>
          <Text
            color="#7352b4"
            fontWeight="bold"
            fontSize={{ base: "lg", md: "3xl" }}
          >
            100
          </Text>
        </Box>
        <Divider height="50px" orientation="vertical" />
        <Box px={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: "sm", md: "md" }}>Followers</Text>
          <Text
            color="#7352b4"
            fontWeight="bold"
            fontSize={{ base: "lg", md: "3xl" }}
          >
            100
          </Text>
        </Box>{" "}
        <Divider height="50px" orientation="vertical" />
        <Box px={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: "sm", md: "md" }}>Following</Text>
          <Text
            color="#7352b4"
            fontWeight="bold"
            fontSize={{ base: "lg", md: "3xl" }}
          >
            100
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserDetails;
