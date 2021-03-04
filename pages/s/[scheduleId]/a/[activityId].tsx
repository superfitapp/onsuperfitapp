import Error from "next/error";
import {
  AiOutlineCoffee,
  AiOutlineSketch,
  AiOutlineWoman,
} from "react-icons/ai";
import { BsArrowRight, BsClockFill } from "react-icons/bs";

import Layout from "@/components/layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
  Img,
  HStack,
  Button,
  Center,
  Icon,
  VStack,
  StackDivider,
  Spinner,
  Stack,
  Link,
  AspectRatio,
  Badge,
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { ListItem } from "@/partials/ListItem";
import { List } from "@/partials/List";
import Head from "next/head";

import { getActivity } from "@/lib/db-public";
import { FaPlayCircle } from "react-icons/fa";
import {
  createShowActivityViewModel,
  ActivityViewModel,
} from "@/utils/view-models";
import { Placeholder } from "@/partials/Placeholder";
import { Props } from "framer-motion/types/types";

function ScheduleActivity(props: ScheduledActivityProps) {
  if (!props.vm) {
    if (props.notFound) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
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
              color="blue.500"
              size="xl"
            />
          </Center>
        </Box>
      </Layout>
    );
  }

  const scheduleTitle = props.vm.title;
  const scheduleAbout = props.vm.description;
  const schedulePhotoUrl = props.vm.photoUrl;

  return (
    <>
      <Layout>
        <Box
          as="section"
          my={{ base: "2", md: "8" }}
          py={{ base: "8", md: "12" }}
          rounded="md"
          bg={mode("gray.100", "gray.800")}
        >
          <Box
            maxW={{ base: "xl", md: "7xl" }}
            mx="auto"
            px={{ base: "6", md: "8" }}
          >
            <Grid templateColumns={{ base: "1fr", md: "360px 1fr" }} gap="64px">
              <Box>
                <Heading size="xl" letterSpacing="tight" fontWeight="extrabold">
                  Build SaaS with ease!
                </Heading>

                <AspectRatio minHeight="150px" ratio={16 / 9}>
                  <Box position="relative">
                    <VStack
                      rounded="md"
                      direction="column-reverse"
                      align="stretch"
                      py="4"
                      position="relative"
                      justify="flex-end"
                      zIndex={1}
                      w="full"
                      h="full"
                      mx="auto"
                      px={{ base: "6", md: "8" }}
                      color="white"
                    >
                      <Flex
                        align="baseline"
                        justify="space-between"
                        fontSize="sm"
                        color={mode("gray.600", "gray.400")}
                      >
                        <Badge variant="subtle" rounded="lg" py="0" px="2" colorScheme="green">
                          Default
                        </Badge>
                        <Link href="#">
                          <Box
                            as={BsClockFill}
                            display="inline-block"
                            me="2"
                            opacity={0.4}
                          />
                          3 min read
                        </Link>
                      </Flex>
                    </VStack>
                    <Flex
                      id="image-wrapper"
                      position="absolute"
                      insetX="0"
                      insetY="0"
                      w="full"
                      h="full"
                      overflow="hidden"
                      align="center"
                      rounded="lg"
                    >
                      <Box position="relative" w="full" h="full">
                        <Img
                          src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                          alt="Main Image"
                          w="full"
                          h="full"
                          objectFit="cover"
                          objectPosition="top bottom"
                          position="absolute"
                        />
                        <Box
                          position="absolute"
                          w="full"
                          h="full"
                          bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
                        />
                      </Box>
                    </Flex>
                  </Box>
                </AspectRatio>

                <Text mt="6" mb="8" fontSize="lg" fontWeight="medium">
                  At volutpat diam ut venenatis tellus. Sit amet consectetur.
                </Text>
                <Button
                  size="lg"
                  colorScheme="blue"
                  minH="14"
                  rightIcon={<BiRightArrowAlt />}
                >
                  Get Started now
                </Button>

                <Box
                  rounded="lg"
                  mt={{ base: "16", md: "24", lg: "16" }}
                  as="blockquote"
                  bg={{ lg: mode("white", "gray.700") }}
                  p={{ lg: "8" }}
                >
                  {/* {logo} */}
                  <Text mt="4" fontSize="lg" lineHeight="tall">
                    Description
                  </Text>
                  <HStack spacing="4" mt="8">
                    <Img
                      alt="{author}"
                      w="12"
                      h="12"
                      rounded="full"
                      objectFit="cover"
                      src="https://images.unsplash.com/photo-1531078215167-91fcfe45b39e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2598&q=80"
                    />
                    <Box>
                      <Text as="cite" fontStyle="normal" fontWeight="bold">
                        "Susan Mana"
                      </Text>
                      <Text color={mode("gray.600", "gray.400")}>
                        "Executive director"
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>

              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={{ base: "6", md: "8" }}
                align="stretch"
              >
                <Center
                  bg={mode("white", "gray.700")}
                  shadow="lg"
                  minH={{ base: "320px", lg: "480px" }}
                  rounded="lg"
                >
                  {/* Replace this with your screenshot */}
                  <Box as={FaPlayCircle} fontSize="90px" color="gray.300" />
                </Center>

                <Box>
                  <List spacing="12">
                    <ListItem
                      title="Have a Coffee Break with Chakra UI"
                      subTitle="Posted by Mark Chandler"
                      icon={<Icon as={AiOutlineCoffee} boxSize="6" />}
                    >
                      <Placeholder />
                    </ListItem>
                    <ListItem
                      title="Women in Tech learning Chakra UI"
                      subTitle="Posted by Christian Schröter"
                      icon={<Icon as={AiOutlineWoman} boxSize="6" />}
                    >
                      <Placeholder />
                    </ListItem>
                    <ListItem
                      title="Using Chakra UI in Sketch"
                      subTitle="Posted by Segun Adebayo"
                      icon={<Icon as={AiOutlineSketch} boxSize="6" />}
                    >
                      <Placeholder />
                    </ListItem>
                  </List>
                </Box>
              </VStack>
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default ScheduleActivity;

export interface ScheduledActivityProps extends Props {
  vm?: ActivityViewModel;
  notFound?: boolean;
}

// This function gets called at build time
export async function getStaticPaths() {
  // don't prerender any schedule pages
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  const { activityId } = params;

  if (!scheduleId || !activityId) {
    return {
      props: {
        vm: false,
        notFound: true,
      },
      revalidate: 0,
    };
  }

  try {
    let showActivity = await getActivity(activityId, scheduleId);

    if (!showActivity) {
      return {
        props: {
          vm: false,
          notFound: true,
        },
        revalidate: 0,
      };
    }

    return {
      props: {
        vm: createShowActivityViewModel(showActivity),
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    };
  } catch {
    return {
      props: {
        vm: false,
        notFound: true,
      },
      revalidate: false,
    };
  }
}
