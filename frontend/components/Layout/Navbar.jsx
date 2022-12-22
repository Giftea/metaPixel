import { Stack, Avatar, useDisclosure, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LensLogin from "./LensLogin";
import { getProfiles } from "../../lensCalls";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import UploadImage from "../Modals/UploadImage";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { address } = useAccount();
  const [profile, setProfile] = useState({});
  const [imgUrl, setImgUrl] = useState("");

  async function fetchProfile(useraddress) {
    try {
      let response = await getProfiles({
        ownedBy: [`${useraddress}`],
        limit: 10,
      });
      setProfile(response?.data?.profiles?.items[0]);
      if (response?.data) {
        const url = profile?.picture?.original?.url;
        const slice = url?.slice(url.lastIndexOf("/"), url?.length);
        setImgUrl(`https://lens.infura-ipfs.io/ipfs${slice}`);
      }
    } catch (error) {
      console.log("fetchProfiles ERROR:", error);
    }
  }

  useEffect(() => {
    fetchProfile(address);
  }, [address]);

  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      px={{ base: 6, md: 20 }}
      py={6}
      position="sticky"
      top={0}
      zIndex={1000}
      bg="#fff"
      boxShadow="md"
    >
      <Link href="/" className="text-2xl">
        <Text fontSize='4xl'>Pixeed</Text>
      </Link>

      <Stack
        justifyContent="space-between"
        alignItems={"center"}
        direction={"row"}
      >
        {address && (
          <button className="btn-primary" onClick={() => onOpen()}>
            Upload Photo
          </button>
        )}
        <LensLogin />
        {profile && (
          <Avatar
            src={imgUrl}
            name={profile?.name}
            onClick={() => router.push(`/profile/${profile?.handle}`)}
            border="2px solid #625DA0"
            cursor={"pointer"}
          />
        )}
      </Stack>
      <UploadImage isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Navbar;
