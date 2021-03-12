import { Box, BoxProps, Img } from "@chakra-ui/react";
import * as React from "react";
import { PlayButton } from "./PlayButton";

interface BigMediaProps extends BoxProps {
  src: string;
  alt: string;
}

export const BigMedia = (props: BigMediaProps) => {
  const { src, alt, ...rest } = props;
  return (
    <Box
      pos="relative"
      cursor="pointer"
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
      <PlayButton hidden size={{ base: "5", sm: "20" }} />
    </Box>
  );
};
