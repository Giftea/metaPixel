import { Avatar, Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { client } from "../../apollo-client";
import { getProfiles } from "../../lensCalls";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter()
  const { address } = useAccount();
  const [profiles, setProfiles] = useState([]);

  async function fetchProfiles() {
    try {
      let response = await getProfiles({ ownedBy: [`${address}`], limit: 10 });
      setProfiles(response?.data?.profiles?.items[0]);
    } catch (error) {
      console.log("fetchProfiles ERROR:", error);
    }
  }
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <Box px={{ base: 6, md: 20 }} pt={10}>
      <Flex alignItems={"center"} pb={10}>
        <Stack alignItems={"center"}>
          <Avatar
            height={"240px"}
            width="240px"
            // border="1px solid #0F0F0F"
          />
          <Text textAlign="center" fontSize="3xl">
            {profiles[0]?.handle}
          </Text>
          <button className="btn-outline" onClick={()=> router.push('/profile/editProfile')}>
            <EditIcon mr={2} /> Edit Profile
          </button>
        </Stack>
        <Spacer />
        <Box width={{ base: "auto", md: "70%" }}>
          <Text fontSize="2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            natus. Cum tempora quod porro magni, fuga quo expedita ullam harum
            laborum saepe, tempore quae. Molestias laborum soluta impedit omnis
            ullam?
          </Text>
          <Flex my={4} textAlign="center">
            <Box fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"}>
                {profiles?.stats?.totalFollowers}
              </Text>
              <Text>Followers</Text>
            </Box>{" "}
            <Box fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"}>
                {profiles?.stats?.totalFollowing}
              </Text>
              <Text>Following</Text>
            </Box>{" "}
            <Box fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"}>{profiles?.stats?.totalPosts}</Text>
              <Text>Posts</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Text fontSize="xl" mt={20} color={"#666666"} fontWeight="bold">
        Your Photos
      </Text>
    </Box>
  );
};

export default Profile;
