import Layout from "../components/layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
} from "@chakra-ui/react";

import * as React from "react";
import { BigMedia } from "../partials/BigMedia";
import { TagBelt } from "../partials/TagBelt";
import { OwnerWithSocial } from "../partials/OwnerWithSocial";

export default function Home() {
  return (
    <>
      <Layout>
        <Box
          as="section"
          bg={mode("gray.50", "inherit")}
          my={{ base: "2", md: "8" }}
          mx="auto"
          rounded="md"
          maxW={{ base: "xl", md: "4xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "6", md: "8" }}
        >
          <Box>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 24rem" }}
              columnGap={{ base: "12", lg: "20" }}
              rowGap="10"
            >
              <BigMedia
                alt="Getting Started with Chakra"
                src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <Flex direction="column" h="full">
                <Box flex="1">
                  <TagBelt type="Video" tags={["react", "css-in-js"]} />
                  <Heading size="xl" mt="6" mb="4">
                    Getting Started with Chakra UI
                  </Heading>
                  <Text
                    fontSize="lg"
                    color={mode("gray.600", "gray.400")}
                    lineHeight="tall"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </Box>
              </Flex>
            </Grid>
          </Box>
          <Box mt="8">
            <OwnerWithSocial
              mt="8"
              name="Mike Hansonn"
              image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGFkeSUyMHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              role="Developer Advocate"
            ></OwnerWithSocial>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
