import {
  Box,
  BoxProps,
  Center,
  Spinner,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const LoadingPlaceholder = (props: BoxProps) => (
  <Box
    as="section"
    my={{ base: "2", md: "8" }}
    py={{ base: "8", md: "12" }}
    rounded="md"
    bg={mode("gray.100", "gray.800")}
  >
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primaryAlpha.800"
        size="xl"
      />
    </Center>
  </Box>
);
