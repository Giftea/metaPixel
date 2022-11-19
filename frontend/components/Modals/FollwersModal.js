import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";

export default function BasicUsage({ isOpen, onClose, followers, userName }) {
  console.log("modal", followers);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg='#F2F0F4' textAlign={"center"}>{userName}'s Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {followers?.map((follower) => {
              let url =
                follower?.wallet?.defaultProfile?.picture?.original?.url;
              let slice = url?.slice(url.lastIndexOf("/"), url?.length);
              let renderURL = `https://ipfs.io/ipfs/${slice}`;
              return (
                <Flex
                  alignItems={"center"}
                  my={3}
                  justifyContent="space-between"
                >
                  <Flex alignItems={"center"}>
                    {" "}
                    <Avatar
                      name={follower?.wallet?.defaultProfile?.name}
                      src={renderURL}
                    />
                    <Text ml={4} fontWeight="bold" fontSize={"xl"} textTransform='capitalize'>
                      {follower?.wallet?.defaultProfile?.name}
                    </Text>
                  </Flex>
                  <button className="btn-outline">Follow</button>
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
