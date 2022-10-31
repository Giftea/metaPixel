import React from "react";
import { Text, Stack, Box, Avatar, Input, Button } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Box px={{ base: 6, md: "7rem", lg: "15rem" }} py={20}>
      <Text my={4} fontWeight={"bold"} fontSize={"3xl"}>
        Profile Settings
      </Text>
      <>
        <Stack direction={'row'} alignItems='center' >
          <Avatar size={"xl"} />
          <Button>Change Image</Button>
        </Stack>
        <Stack
          mt={8}
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Box width={{ md: "45%" }}>
            <Text>First Name</Text> <Input />
          </Box>{" "}
          <Box width={{ md: "45%" }}>
            <Text>Last Name</Text> <Input />
          </Box>
        </Stack>
        <Stack
          mt={8}
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Box width={{ md: "45%" }}>
            <Text>Email</Text> <Input />
          </Box>{" "}
          <Box width={{ md: "45%" }}>
            <Text>Change Password</Text> <Input />
          </Box>
        </Stack>
        <Button my={6}>Update Profile</Button>
      </>
    </Box>
  );
};

export default Settings;
