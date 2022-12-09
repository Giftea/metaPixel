import { Stack, Avatar, useDisclosure } from "@chakra-ui/react";
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
  const [profiles, setProfiles] = useState();
  const [imgUrl, setImgUrl] = useState("");

  async function fetchProfiles(useraddress) {
    try {
      let response = await getProfiles({
        ownedBy: [`${useraddress}`],
        limit: 10,
      });
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
    fetchProfiles(address);
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
        Pixeed
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
        {profiles && (
          <Avatar
            src={imgUrl}
            name={profiles?.name}
            onClick={() => router.push(`/profile/${profiles?.handle}`)}
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
