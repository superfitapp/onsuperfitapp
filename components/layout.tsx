import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { GuestMobileNav } from "../partials/GuestMobileNav";

function Layout({ children }) {
  return (
    <Box mx="auto" maxW={{ base: "xl", md: "4xl" }} py={{ base: "4", md: "6" }}>
      <GuestHeaderNav></GuestHeaderNav>
      <main>{children}</main>
      {/* <Footer
        footerSectionClassList={footerSectionClassList}
        user={user}
        loading={loading}
        footerClassList="bg-dark"
      ></Footer>

      <Scripts></Scripts> */}
    </Box>
  );
}

export default Layout;
