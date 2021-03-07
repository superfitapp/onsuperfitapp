import Layout from "@/components/schedule-layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
} from "@chakra-ui/react";

import { withPageAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import * as React from "react";
import { useRouter } from "next/router";
import { useFetchUser } from "@/lib/firUser";

export default function ConnectCheckout() {
  const router = useRouter();

  const { user, loading } = useFetchUser({ required: true });

  if (typeof window !== "undefined") {
    const returnTo = localStorage.getItem("returnTo");
    if (returnTo && returnTo != "/") {
      localStorage.setItem("returnTo", "/");
      router.push(returnTo);
    }
  }
  return (
    <>
      {`loading: ${loading}`}
      <Layout>
        <Box
          as="section"
          bg={mode("gray.50", "inherit")}
          my={{ base: "2", md: "8" }}
          rounded="md"
          px={{ base: "6", md: "8" }}
        ></Box>
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    return { props: { customProp: "bar" } };
  },
});
