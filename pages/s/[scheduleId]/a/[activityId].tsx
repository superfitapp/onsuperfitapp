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
  Spacer,
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { ListItem } from "@/partials/ListItem";
import { List } from "@/partials/List";
import Head from "next/head";

import { getActivity } from "@/lib/db-public";
import {
  createShowActivityViewModel,
  ActivityViewModel,
} from "@/utils/view-models";
import { Placeholder } from "@/partials/Placeholder";
import { Props } from "framer-motion/types/types";
import { BigMedia } from "@/partials/BigMedia";

function ScheduleActivity(props: ScheduledActivityProps) {
  if (!props.vm) {
    if (props.notFound) {
      return <Error statusCode={404} />;
    } else {
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
  }

  const activityTitle = props.vm.title;
  const activityAbout = props.vm.description;
  const activityPhotoUrl = props.vm.photoUrl;

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
                <AspectRatio ratio={16 / 9}>
                  <Box>
                    <VStack
                      minHeight="100px"
                      rounded="md"
                      direction="column-reverse"
                      align="stretch"
                      py={{ base: "6", md: "4" }}
                      position="relative"
                      justify="flex-end"
                      zIndex={1}
                      w="full"
                      h="full"
                      mx="auto"
                      px={{ base: "8", md: "8" }}
                      color="white"
                    >
                      <Flex
                        align="baseline"
                        justify="space-between"
                        fontSize="sm"
                        color={mode("gray.100", "gray.800")}
                      >
                        <Badge
                          variant="subtle"
                          rounded="lg"
                          py="0"
                          px="2"
                          colorScheme="green"
                        >
                          Default
                        </Badge>
                        <Text fontSize="medium" fontWeight="extrabold">
                          $50
                        </Text>
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
                          src={activityPhotoUrl}
                          alt="Main Image"
                          w="full"
                          h="full"
                          objectFit="cover"
                          objectPosition="top bottom"
                        />
                        <Box position="absolute" w="full" h="full" />
                      </Box>
                    </Flex>
                  </Box>
                </AspectRatio>

                <Heading
                  mt="4"
                  size="lg"
                  letterSpacing="tight"
                  fontWeight="bold"
                >
                  {activityTitle}
                </Heading>

                <Text
                  mb="8"
                  fontSize="lg"
                  fontWeight="regular"
                  color={mode("gray.500", "gray.200")}
                >
                  Tuesday, March 4 2020
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
                  mt={{ base: "8", md: "12", lg: "16" }}
                  as="blockquote"
                  bg={{ lg: mode("white", "gray.700") }}
                  p={{ lg: "8" }}
                >
                  <Heading
                    as="h6"
                    size="sm"
                    color={mode("gray.600", "gray.200")}
                    pb="3"
                  >
                    This Thursday
                  </Heading>
                  <Text fontSize="md" fontWeight="regular">
                    {activityAbout}
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
                      <Text fontStyle="medium" fontWeight="medium">
                        Iyoha Agho
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
                {props.vm.videoThumbnailUrl && (
                  <BigMedia
                    alt="Getting Started with Chakra"
                    src={props.vm.videoThumbnailUrl}
                  />
                )}

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
