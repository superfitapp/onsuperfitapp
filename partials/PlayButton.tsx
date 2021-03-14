import { Circle, SquareProps } from "@chakra-ui/react";
import * as React from "react";
import { BsPlay, BsPlayFill } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";

export const PlayButton = (props: SquareProps) => {
  const { ...rest } = props;

  return (
    <Circle
      centerContent
      fontSize="3xl"
      bg="primaryAlpha.600"
      color="white"
      pos="absolute"
      top="50%"
      insetStart="50%"
      transform="translate(-50%, -50%)"
      {...rest}
    >
      <BsPlay />
    </Circle>
  );
};
