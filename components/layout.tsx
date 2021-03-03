// import Nav from "@/components/nav";
// import Footer from "@/components/footer";
// import Scripts from "@/components/scripts";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { GuestMobileNav } from "../partials/GuestMobileNav";

function Layout({ children }) {
  useEffect;
  return (
    <Box mx="auto" maxW={{ base: "xl", md: "4xl" }} py={{ base: "6", md: "8" }}>
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
