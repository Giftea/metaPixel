import { Stack, Avatar, useDisclosure, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LensLogin from "./LensLogin";
import { getProfiles } from "../../lensCalls";
import { useAccount } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import UploadImage from "../Modals/UploadImage";
import ProfileSelectModal from "../Modals/ProfileSelectModal";
import VerifyLensModal from "../Modals/VerifyLensModal";
import SuccessModal from "../Modals/SuccessModal";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProfileSelect,
    onOpen: onOpenProfileSelect,
    onClose: onCloseProfileSelect,
  } = useDisclosure();

  const {
    isOpen: isOpenVerifyLens,
    onOpen: onOpenVerifyLens,
    onClose: onCloseVerifyLens,
  } = useDisclosure();

  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [txHash, setTxHash] = useState(null);

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

  const handleProfileSelect = useCallback(
    (profile) => {
      setProfile(profile);
      onCloseProfileSelect();
      onOpenVerifyLens();
      console.log(isOpenSuccess)
    },
    [onCloseProfileSelect, onOpenVerifyLens]
  );

  const handleLensVerify = useCallback(
    ({ hash }) => {
      setTxHash(hash);
      onOpenSuccess();
      onCloseVerifyLens();
    },
    [onCloseVerifyLens, onOpenSuccess]
  );

  useEffect(() => {
    fetchProfile(address);
    onOpenSuccess()
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
      zIndex={10}
      bg="#fff"
      boxShadow="md"
    >
      <Link href="/" className="text-2xl">
        <Text fontSize="4xl">Pixeed</Text>
      </Link>
      <Stack
        justifyContent="space-between"
        alignItems={"center"}
        direction={"row"}
      >
        {isConnected && (
          <>
            {/* <button className="btn-primary" onClick={() => onOpen()}>
              Upload Photo
            </button> */}
            <Tooltip label="Verify to start uploading images">
              <button
                className="btn-primary"
                onClick={() => onOpenProfileSelect()}
              >
                Verify Your Lens Account
              </button>
            </Tooltip>
          </>
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
      <ProfileSelectModal
        isOpen={isOpenProfileSelect}
        onClose={onCloseProfileSelect}
        onSelect={handleProfileSelect}
      />
      <VerifyLensModal
        isOpen={isOpenVerifyLens}
        onClose={onCloseVerifyLens}
        onSelect={handleProfileSelect}
        profile={profile}
        onVerify={handleLensVerify}
      />
      <SuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        modalState={isOpenSuccess}
        txHash={txHash}
        profile={profile}
      />
    </Stack>
  );
};

export default Navbar;
