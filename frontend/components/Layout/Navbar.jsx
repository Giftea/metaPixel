import { Stack, Avatar} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LensLogin from "./LensLogin";

const Navbar = () => {
  const router = useRouter();
  
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
        <LensLogin />
        <Avatar
          name="Gift Uhiene"
          onClick={() => router.push("/profile")}
        />
      </Stack>
    </Stack>
  );
};

export default Navbar;
