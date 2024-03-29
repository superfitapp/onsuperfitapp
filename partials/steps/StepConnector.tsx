import { Box, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { useStep } from "./useStep";

export const StepConnector = () => {
  const { isCompleted } = useStep();
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box
      borderStartWidth="1px"
      borderStartColor={isCompleted ? accentColor : "inherit"}
      height="6"
      mb="2"
      ms="4"
      ps="4"
    />
  );
};
