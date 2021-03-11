import Layout from "../components/schedule-layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
} from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../partials/BigMedia";
import { TagBelt } from "../partials/TagBelt";
import { OwnerWithSocial } from "../partials/OwnerWithSocial";
import { ScheduledActivity } from "../partials/ScheduledActivity";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const returnTo = localStorage.getItem("returnTo");
    if (returnTo && returnTo != "/") {
      localStorage.setItem("returnTo", "/");
      router.push(returnTo);
    }
  }
  return (
    <>
      <Layout>
        <Box
          as="section"
          bg={mode("gray.50", "inherit")}
          my={{ base: "2", md: "8" }}
          rounded="md"
          px={{ base: "6", md: "8" }}
        >
          <Box>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 24rem" }}
              columnGap={{ base: "12", lg: "20" }}
              rowGap="10"
            ></Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getInitialProps() {
  return {
    props: {},
    redirect: {
      permanent: true,
      destination: `https://superfitapp.com`,
    },
  };
}
