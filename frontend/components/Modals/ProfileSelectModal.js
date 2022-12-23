import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/react";
import useProfiles from "../../hooks/useProfiles";
import { FC, memo, useCallback, useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";

const ProfileSelectModal = ({ isOpen, onClose, onSelect }) => {
  const { profiles } = useProfiles();
  const [selectedId, setSelectedId] = useState();

  const selectProfile = useCallback(() => {
    onSelect(profiles.find(({ id }) => id === selectedId));
  }, [profiles, onSelect, selectedId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#F2F0F4" textAlign={"center"}>
          Verify your <span style={{ color: "#625da0" }}>Lens profile</span>{" "}
          belongs to a human with World ID
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          {profiles?.length > 0 ? (
            <>
              <div className="rounded-xl border border-dfe2e3 overflow-clip divide-y divide-dfe2e3">
                {profiles?.map((profile, index) => (
                  <ProfileCard
                    key={index}
                    profile={profile}
                    onSelect={setSelectedId}
                    selected={selectedId === profile.id}
                    verified={profile.onChainIdentity.worldcoin.isHuman}
                  />
                ))}
              </div>

              <Button
                size="medium"
                variant="dark"
                disabled={!selectedId}
                onClick={selectProfile}
                className="btn-primary w-full mt-10"
              >
                Select Profile
              </Button>
            </>
          ) : (
            <p className="font-rubik text-858494 text-center">
              You don&apos;t seem to have a Lens profile yet!
            </p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(ProfileSelectModal);
