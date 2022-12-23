import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { FC, memo, useEffect} from "react";
import LensAvatar from "../LensAvatar";
import confetti from "canvas-confetti";
import ProfileCard from "../ProfileCard";
import VerifiedIcon from "../Icons/VerifiedIcon";

const SuccessModal = ({
  isOpen,
  onClose,
  profile,
  txHash,
  modalState,
}) => {
  if (!txHash) return;

  function shootConfetti() {
    var duration = 6 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 2,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#FFD700", "#00FF00"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  }

  useEffect(() => {
    if (!modalState) return;

    shootConfetti();
  }, [modalState]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
      <ModalContent>
        <ModalHeader>
          <div className="flex gap-x-1.5 p-2 pr-4 bg-183c4a/[5%] rounded-full ">
            <div className="relative w-8 h-8">
              <LensAvatar className="w-8 h-8 rounded-full" profile={profile} />
              <span className="rounded-full absolute -bottom-1.5 -right-1.5">
                <VerifiedIcon
                  width={18}
                  height={18}
                  border="text-[#F5F6F6] !w-5 !-mt-[2.1px]"
                />
              </span>
            </div>

            <div className="font-rubik">
              <p className="text-14">{profile.name}</p>
              <p className="text-11 opacity-50">@{profile.handle}</p>
            </div>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <Center>
            <div className="grid gap-y-8">
              <div className="max-w-[440px] grid gap-y-4">
                <div className="grid place-items-center gap-y-6">
                  <h3 className="text-24 px-6">
                    Your profile is now verified!
                  </h3>
                  <p className="text-12 font-rubik text-center px-6">
                    Supported frontends will now show your profile as verified.
                    Thanks for{" "}
                    <span className="text-green-500 font-medium">
                      making Lens more human
                    </span>
                    !
                  </p>

                  <ProfileCard
                    verified
                    className="w-full rounded-2xl border border-dfe2e3"
                    profile={profile}
                  />
                </div>
              </div>
            </div>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(SuccessModal);
