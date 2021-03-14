import {
  Box,
  BoxProps,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import ReactPlayer from "react-player";
import { PlayButton } from "./PlayButton";

interface BigMediaProps extends BoxProps {
  src: string;
  alt: string;
  videoSrc?: string;
}

export const BigMedia = (props: BigMediaProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    onOpen();
  };

  const { src, alt, videoSrc, ...rest } = props;
  return (
    <Box
      pos="relative"
      cursor={videoSrc ? "pointer" : "inherit"}
      as="button"
      onClick={() => {
        if (videoSrc) {
          openModal();
        }
      }}
      className="group"
      overflow="hidden"
      {...rest}
    >
      <Img
        w="full"
        h="full"
        objectFit="cover"
        htmlWidth="672"
        htmlHeight="448"
        src={src}
        alt={alt}
        transition="all 0.2s"
        rounded="inherit"
        _groupHover={{ transform: "scale(1.05)" }}
      />

      {videoSrc && (
        <>
          <PlayButton size={{ base: "5", sm: "20" }} />

          <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ReactPlayer width="100%" height="100%" controls url={videoSrc} />
              <ModalCloseButton color="white" />
              {/* <ModalBody>
                
              </ModalBody> */}
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};
