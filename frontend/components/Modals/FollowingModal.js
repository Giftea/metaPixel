import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createFollowTypedData } from "../../lensCalls";

export default function BasicUsage({ isOpen, onClose, followers, userName }) {
  const router = useRouter();
  const toast = useToast();

  async function followUser(id) {
    try {
      await createFollowTypedData({
        follow: [
          {
            profile: id,
          },
        ],
      });

      onClose();
      toast({
        title: "Followed User!",
        position: "top",
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      onClose();

      toast({
        title: error.message,
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#F2F0F4" textAlign={"center"}>
            {userName}'s Followers
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {followers?.map((follower) => {
              let url = follower?.profile?.picture?.original?.url;
              let slice = url?.slice(url.lastIndexOf("/"), url?.length);
              let renderURL = `https://ipfs.io/ipfs/${slice}`;
              return (
                <Flex
                  key={follower?.profile?.id}
                  alignItems={"center"}
                  my={3}
                  justifyContent="space-between"
                >
                  <Flex alignItems={"center"}>
                    {" "}
                    <Avatar name={follower?.profile?.name} src={renderURL} />
                    <Text
                      ml={4}
                      fontWeight="bold"
                      fontSize={"xl"}
                      textTransform="capitalize"
                      cursor={"pointer"}
                      onClick={() => {
                        router.push(`/profile/${follower?.profile?.handle}`);
                        onClose();
                      }}
                    >
                      {follower?.profile?.name}
                    </Text>
                  </Flex>
                  <button
                    onClick={() => followUser(follower?.profile?.id)}
                    className="btn-outline"
                  >
                    Follow
                  </button>
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

/*
  follower?.wallet?.defaultProfile?.name
  
  */
