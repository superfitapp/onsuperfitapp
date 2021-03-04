import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";
import { GuestMobileNav } from "./GuestMobileNav";
import { NavLink } from "./NavLink";
import { SuperFitIcon } from "./SuperFitIcon";

export const GuestHeaderNav = () => {
  return (
    <Box
      as="header"
      bg={mode("white", "gray.800")}
      rounded="2xl"
      borderWidth="1px"
      borderColor="gray.100"
      mx={{ base: "2", md: "0" }}
      boxShadow="sm"
    >
      <Box maxW="7xl" mx="auto" py="2" px={{ base: "6", md: "8" }}>
        <Flex as="nav" justify="space-between">
          <HStack spacing="8">
            <Box as="a" href="#" rel="home"></Box>
            {/* <Center marginEnd={6}> */}
              {/* <SuperFitIcon iconColor="blue.600" /> */}
            {/* </Center> */}
            <NavLink.Desktop>Built on SuperFit</NavLink.Desktop>
          </HStack>
          <Flex align="center">
            <HStack spacing="8" display={{ base: "none", md: "flex" }}>
              <NavLink.Desktop>Log in </NavLink.Desktop>
              <Button colorScheme="blue" rounded="2xl">
                Join
              </Button>
            </HStack>
            <Box ml="5">
              <GuestMobileNav />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
