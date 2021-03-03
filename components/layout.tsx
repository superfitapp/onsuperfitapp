// import Nav from "@/components/nav";
// import Footer from "@/components/footer";
// import Scripts from "@/components/scripts";
import { useEffect } from "react";

function Layout({ children }) {
  useEffect;
  return (
    <>
      {/* <Nav
        user={user}
        loading={loading}
        containerClass="container-fluid"
        navClassList={navClassList}
      ></Nav> */}

      <main>{children}</main>
      {/* <Footer
        footerSectionClassList={footerSectionClassList}
        user={user}
        loading={loading}
        footerClassList="bg-dark"
      ></Footer>

      <Scripts></Scripts> */}
    </>
  );
}

export default Layout;
