import { Avatar, Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { client } from "../../apollo-client";
import { getProfiles } from "../../lensCalls";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [profiles, setProfiles] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  async function fetchProfiles() {
    try {
      let response = await getProfiles({ ownedBy: [`${address}`], limit: 10 });
      setProfiles(response?.data?.profiles?.items[0]);

      if (response?.data) {
        const url = profiles?.picture?.original?.url;
        const slice = url?.slice(url.lastIndexOf("/"), url?.length);
        setImgUrl(`https://lens.infura-ipfs.io/ipfs${slice}`);
      }
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
        <Box alignItems={"center"}>
          <Avatar
            height={"240px"}
            width="240px"
            src={imgUrl}
            name={profiles?.name}
          />
        </Box>
        <Spacer />
        <Box width={{ base: "auto", md: "70%" }}>
          <Flex alignItems={'center'}>
            {" "}
            <Text textAlign="center" mr={6} fontSize="4xl">
              {profiles?.name}
            </Text>
            {address === profiles?.ownedBy ? (
              <button
                className="btn-outline"
                onClick={() => router.push("/profile/editProfile")}
              >
                <EditIcon mr={2} /> Edit Profile
              </button>
            ) : (
              <>
                {" "}
                <button
                  className="btn-outline"
                  onClick={() => router.push("/profile/editProfile")}
                >
                  <Text px={6}> Follow</Text>
                </button>
                <button
                  className="btn-primary"
                  onClick={() => router.push("/profile/editProfile")}
                  style={{ marginLeft: "15px" }}
                >
                  Reward Creator
                </button>
              </>
            )}
          </Flex>
          <Text mt={6} fontSize="xl">
            {profiles?.bio}
          </Text>
          <Flex mt={6} textAlign="center">
            <Flex fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalPosts}
              </Text>
              <Text>Posts</Text>
            </Flex>
            <Flex fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalFollowers}
              </Text>
              <Text>Followers</Text>
            </Flex>{" "}
            <Flex fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalFollowing}
              </Text>
              <Text>Following</Text>
            </Flex>{" "}
            <Flex fontSize="3xl" mr={8}>
              {" "}
              <Text color={"#625da0"} fontWeight="bold" mr={3}>
                {profiles?.stats?.totalPosts}
              </Text>
              <Text>Views</Text>
            </Flex>
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
