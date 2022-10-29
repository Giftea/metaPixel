import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-[white] text-[#333]">
      <h1 className="text-2xl">Pixeed</h1>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
