import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Heading,
  InputGroup,
  Input,
  Box,
  useToast,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import {
  challenge,
  authenticate,
  createProfile,
  getProfiles,
  getProfile,
  setMetadata,
} from "../../lensCalls";
import { client } from "../../apollo-client";
import { useAccount } from "wagmi";
import { v4 as uuidv4 } from "uuid";

export default function AuthenticateModal({ isOpen, onClose, variant }) {
  const [lensHandle, setLensHandle] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [cid, setCid] = useState("");
  const [profiles, setProfiles] = useState([]);
  const { address } = useAccount();
  const toast = useToast();

  async function fetchProfiles() {
    try {
      let response = await getProfiles({ ownedBy: [`${address}`], limit: 10 });
      setProfiles(response.data.profiles.items);
    } catch (error) {
      console.log("fetchProfiles ERROR:", error);
    }
  }

  async function login() {
    try {
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      localStorage.setItem("lens_auth_token", accessToken);
      profiles[0]?.handle && onClose();
      toast({
        title: "Lens is authenticated!",
        position: "top",
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log("Error signing in: ", err);
      onClose();
      toast({
        title: "Authentication error",
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = {
        handle: lensHandle,
      };
      const response = await createProfile(request);
      console.log("CREATED PROFILE!", response);
      localStorage.setItem("lens_handle", `${lensHandle}.test`);
      onClose();

      toast({
        title: "Lens handle created!",
        position: "top",
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log("ERROR", error);
      onClose();
      toast({
        title: "Error creating Lens handle",
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [address]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Heading as="h2" size="xl">
                Welcome to Pixeed!
              </Heading>{" "}
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {variant === "create-profile" ? (
              <form onSubmit={handleSubmit}>
                <Text mb="8px">Choose Lens Handle</Text>
                <InputGroup>
                  <InputLeftAddon children="@" />
                  <Input
                    placeholder="Enter Lens Handle"
                    value={lensHandle}
                    onChange={(e) => setLensHandle(e.target.value)}
                  />
                  <InputRightAddon children=".test" />
                </InputGroup>

                <Box my={4}>
                  <button className="btn-primary w-full" type="submit">
                    Create Profile
                  </button>
                </Box>
              </form>
            ) : (
              <Center>
                <button onClick={() => login()} className="btn-primary">
                  Authenticate Lens
                </button>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
