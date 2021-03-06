import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { ChakraProvider } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <ChakraProvider>
      <Box
        mx="auto"
        maxW={{ base: "xl", md: "4xl" }}
        py={{ base: "4", md: "6" }}
      >
        <GuestHeaderNav></GuestHeaderNav>
        <main>{children}</main>
      </Box>
    </ChakraProvider>
  );
}

export default Layout;
