import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getProfiles } from "../../lensCalls";
import AuthenticateModal from "../Modals/AuthenticateModals";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const CustomConnectButton = () => {
  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();

  async function fetchProfiles(userAddress) {
    try {
      let response = await getProfiles({
        ownedBy: [`${userAddress}`],
        limit: 10,
      });
      console.log("fetchProfiles RESPONSE", response);
      setProfiles(response.data.profiles.items);
    } catch (error) {
      console.log("fetchProfiles ERROR:", error);
    }
  }

  useEffect(() => {
    fetchProfiles(address);
  }, [address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn-primary"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    className="btn-outline"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {/* {profiles[0]?.handle} */}
                  </button>

                  <AuthenticateModal
                    variant="create-profile"
                    isOpen={isOpen}
                    onClose={onClose}
                  />
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
// {account.displayName}

// 5778430

/*
{ 
      profileId: "0x01", 
      metadata: "ipfs://Qmeu6u6Ta5qeCf6mw3zVoe9pMus96cX6eZT6dnRQKDStBL" 
  }
*/
