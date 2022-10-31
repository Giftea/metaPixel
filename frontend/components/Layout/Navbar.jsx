import { Stack, Avatar, Button, IconButton } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";

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
        w="35%"
      >
        <Link href="/about">About</Link>
        <Link href="/license">License</Link>
        <ConnectButton />
        <Button onClick={() => router.push("/upload")}>Upload</Button>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Avatar src="https://bit.ly/broken-link" />}
            variant="outline"
            bg="none"
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            _expanded={{ bg: "none" }}
            border="none"
          />
          <MenuList>
            <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => router.push("/profile/settings")}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default Navbar;
