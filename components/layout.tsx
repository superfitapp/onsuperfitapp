import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
function Layout({ children }) {
  return (
    <Box mx="auto" maxW={{ base: "xl", md: "4xl" }} py={{ base: "4", md: "6" }}>
      <GuestHeaderNav></GuestHeaderNav>
      <main>{children}</main>
    </Box>
  );
}

export default Layout;
