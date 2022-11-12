import { Stack, Avatar, IconButton } from "@chakra-ui/react";
import { CustomConnectButton } from "../ConnectButton";
import Link from "next/link";
import { useRouter } from "next/router";
import LensLogin from "./LensLogin";
import { getDefaultProfile } from "../../utils/getDefaultProfile";
import { useAccount } from "wagmi";

const Navbar = () => {
  const router = useRouter();
  const { address } = useAccount();

  const handleGetProfile = async () => {
    let response = await getDefaultProfile(address);
    if (response.data.defaultProfile?.handle) {
      router.push(`/profile/${response.data.defaultProfile.handle}`);
    } else {
      router.push(`/create-profile`);
    }
  };
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
        <CustomConnectButton />
        <LensLogin />
        <IconButton onClick={handleGetProfile}>
          <Avatar src="https://bit.ly/broken-link" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Navbar;
