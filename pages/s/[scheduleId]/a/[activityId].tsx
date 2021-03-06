import Error from "next/error";
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
  AspectRatio,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  ExpandedIndex,
} from "@chakra-ui/react";
import { BiRightArrowAlt, BiRightArrowCircle } from "react-icons/bi";
import * as React from "react";
import { ListItem } from "@/partials/ListItem";
import { List } from "@/partials/List";
import { getShowActivity } from "@/lib/db-public";
import ReactPlayer from "react-player";

import {
  createShowActivityViewModel,
  ActivityViewModel,
} from "@/utils/ViewModels";
import { Props } from "framer-motion/types/types";
import { BigMedia } from "@/partials/BigMedia";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
import "dayjs/locale/en"; // import locale
dayjs.locale("en"); // use locale

function ScheduleActivity(props: ScheduledActivityProps) {
  var scheduledDateString: string | undefined = null;
  var scheduledDateRelative: string | undefined = null;

  if (props.vm?.scheduledDateTimestamp) {
    const scheduledDate = new Date(props.vm.scheduledDateTimestamp);

    scheduledDateString = dayjs(scheduledDate).calendar(null, {
      sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
      nextDay: "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
      nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
      lastDay: "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[Last] dddd", // Last week ( Last Monday at 2:30 AM )
      sameElse: "MMMM DD, YYYY", // Everything else ( 7/10/2011 )
    });
    scheduledDateRelative = dayjs(scheduledDate).fromNow();
  }

  let instructionsBlockMap =
    props?.vm?.instructionSetViewModel?.instructionsBlockMap;

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
            <Grid templateColumns={{ base: "1fr", md: "360px 1fr" }} gap="48px">
              <Box>
                <AspectRatio ratio={16 / 9}>
                  <Box>
                    <VStack
                      // minHeight="100px"
                      rounded="md"
                      // direction="column-reverse"
                      direction="column"
                      align="stretch"
                      py={{ base: "4", md: "4" }}
                      position="relative"
                      justify="flex-end"
                      // justify="flex"
                      zIndex={1}
                      w="full"
                      h="full"
                      mx="auto"
                      px={{ base: "4", md: "4" }}
                    >
                      <HStack
                        align="baseline"
                        // justify="space-between"
                        justify="flex-end"
                        fontSize="sm"
                        color={mode("gray.100", "gray.800")}
                      >
                        <Center
                          bg="rgba(0,0,0,0.3)"
                          rounded="lg"
                          py="1"
                          px="2"
                          fontSize="xs"
                        >
                          <Text
                          textTransform="uppercase" 
                            fontSize="sm"
                            fontWeight="medium"
                          >
                            {props.vm.activityType}
                          </Text>
                        </Center>
                      </HStack>
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
                      <Box>
                        <Img
                          src={activityPhotoUrl}
                          alt={`Activity image of ${activityTitle}`}
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

                <Flex
                  mt="4"
                  // bgColor="gray.200"
                  align="stretch"
                  justify="space-between"
                  alignItems="start"
                >
                  <VStack align="stretch" spacing="0">
                    <Heading
                      size="md"
                      letterSpacing="tight"
                      fontWeight="medium"
                    >
                      {activityTitle}
                    </Heading>

                    {scheduledDateString && (
                      <Text
                        mb="8"
                        fontSize="lg"
                        fontWeight="regular"
                        color={mode("gray.500", "gray.200")}
                      >
                        {scheduledDateString}
                      </Text>
                    )}
                  </VStack>
                  <Center rounded="lg" bg="rgba(0,0,0,0.05)">
                    <Text py="1" px="2" fontSize="lg" fontWeight="medium">
                      $50
                    </Text>
                  </Center>
                </Flex>

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
                  bg={{ md: mode("white", "gray.700") }}
                  py={{ base: "4", md: "8" }}
                  px={{ base: "0", md: "8" }}
                >
                  {scheduledDateRelative && (
                    <Heading
                      as="h6"
                      size="sm"
                      color={mode("gray.500", "gray.200")}
                      pb="3"
                    >
                      <Text textTransform="capitalize">
                        {scheduledDateRelative}
                      </Text>
                    </Heading>
                  )}

                  <Text fontSize="md" fontWeight="regular">
                    {activityAbout}
                  </Text>

                  <HStack
                    rounded="xl"
                    as="a"
                    href={`/s/${props.vm.scheduleId}`}
                    backgroundColor={{ base: "gray.100", md: "inherit" }}
                    _hover={{ bg: mode("gray.200", "gray.200") }}
                    px="2"
                    py="2"
                    spacing="4"
                    mt="6"
                  >
                    {props.vm.schedulePhotoUrl && (
                      <Img
                        alt="{author}"
                        w="12"
                        h="12"
                        rounded="full"
                        objectFit="cover"
                        src={props.vm.schedulePhotoUrl}
                      />
                    )}

                    <Flex
                      as="button"
                      direction="column"
                      alignItems="flex-start"
                    >
                      {props.vm.scheduleTitle && (
                        <Text fontStyle="medium" fontWeight="medium">
                          {props.vm.scheduleTitle}
                        </Text>
                      )}

                      {props.vm.scheduleOwnerDisplayName && (
                        <Text color={mode("gray.600", "gray.400")}>
                          From @{props.vm.scheduleOwnerDisplayName}
                        </Text>
                      )}
                    </Flex>
                    <Spacer></Spacer>

                    <Center color="gray.500">
                      <BiRightArrowCircle />
                    </Center>
                  </HStack>
                </Box>
              </Box>

              <Accordion allowToggle>
                <VStack
                  // divider={<StackDivider borderColor="gray.200" />}
                  spacing={{ base: "6", md: "8" }}
                  align="stretch"
                >
                  {props.vm.videoThumbnailUrl && (
                    <BigMedia
                      alt={`Workout video for ${props.vm?.title}`}
                      src={props.vm.videoThumbnailUrl}
                    />
                  )}

                  <Box>
                    <List spacing="12">
                      {instructionsBlockMap &&
                        props.vm.instructionSetViewModel.orderedInstructionBlocks.map(
                          (block) => {
                            const length = Object.keys(block.instructions)
                              .length;
                            return (
                              <>
                                <ListItem
                                  key={block.uniqueId}
                                  title=""
                                  fontSize="large"
                                  // subTitle={`${length} Exercise${
                                  //   length > 1 ? "s" : ""
                                  // }`}
                                  subTitle=""
                                  icon={
                                    <Center>
                                      <Box
                                        fontWeight="bold"
                                        fontSize="sm"
                                        as="span"
                                      >
                                        {block.repeatCount}x
                                      </Box>
                                    </Center>
                                  }
                                >
                                  <VStack
                                    // divider={
                                    //   <StackDivider borderColor="gray.200" />
                                    // }
                                    spacing={{ base: "4", md: "2" }}
                                    align="stretch"
                                    w="full"
                                  >
                                    {instructionsBlockMap[block.uniqueId] &&
                                      instructionsBlockMap[block.uniqueId].map(
                                        (viewModel) => {
                                          return (
                                            <AccordionItem>
                                              {({ isExpanded }) => (
                                                <>
                                                  <h2>
                                                    <AccordionButton
                                                      px="1"
                                                      justifyContent="space-between"
                                                      rounded="xl"
                                                    >
                                                      <Flex
                                                        // flexDirection="row"
                                                        alignItems="center"
                                                        align="stretch"
                                                        w="full"
                                                        justifyContent="space-around"

                                                        // py="1"
                                                      >
                                                        <VStack
                                                          alignItems="flex-start"
                                                          me="2"
                                                        >
                                                          {viewModel.instruction
                                                            .exercise.title && (
                                                            <Text
                                                              textAlign="start"
                                                              fontSize="md"
                                                              color="gray.800"
                                                              fontStyle="medium"
                                                              fontWeight="medium"
                                                            >
                                                              {
                                                                viewModel
                                                                  .instruction
                                                                  .exercise
                                                                  .title
                                                              }
                                                            </Text>
                                                          )}

                                                          {viewModel.instructionPrompt && (
                                                            <Text
                                                              fontSize="large"
                                                              color="gray.700"
                                                            >
                                                              {
                                                                viewModel.instructionPrompt
                                                              }
                                                            </Text>
                                                          )}
                                                        </VStack>
                                                        <Spacer></Spacer>

                                                        {props.vm
                                                          .schedulePhotoUrl && (
                                                          <AspectRatio
                                                            minWidth="100px"
                                                            display={
                                                              isExpanded
                                                                ? "none"
                                                                : "inherit"
                                                            }
                                                            ratio={16 / 9}
                                                          >
                                                            <Img
                                                              alt={`Exercise thumbnail image for ${viewModel.instruction.exercise.title}`}
                                                              rounded="md"
                                                              objectFit="cover"
                                                              src={
                                                                viewModel.thumbnailUrl
                                                              }
                                                            />
                                                          </AspectRatio>
                                                        )}
                                                        <AccordionIcon
                                                          color="gray.500"
                                                          ms="1"
                                                        />
                                                      </Flex>
                                                    </AccordionButton>
                                                  </h2>
                                                  <AccordionPanel p={0}>
                                                    <AspectRatio
                                                      mt="2"
                                                      w="100%"
                                                      h="100%"
                                                    >
                                                      <ReactPlayer
                                                        width="100%"
                                                        height="100%"
                                                        controls
                                                        url={
                                                          viewModel.muxUrl ||
                                                          viewModel.youtubeUrl
                                                        }
                                                        playing={isExpanded}
                                                      />
                                                    </AspectRatio>
                                                  </AccordionPanel>
                                                </>
                                              )}
                                            </AccordionItem>
                                          );
                                        }
                                      )}
                                  </VStack>
                                </ListItem>
                              </>
                            );
                          }
                        )}
                    </List>
                  </Box>
                </VStack>
              </Accordion>
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
    let showActivity = await getShowActivity(activityId, scheduleId);

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
