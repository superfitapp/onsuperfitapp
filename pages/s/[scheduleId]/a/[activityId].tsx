import Error from "next/error";
import Layout from "@/components/schedule-layout";
import { isIOS, osVersion } from "react-device-detect";
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
  VStack,
  Spinner,
  AspectRatio,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  ExpandedIndex,
  Badge,
  Circle,
  Link,
} from "@chakra-ui/react";
import { BiHeartCircle, BiRightArrowAlt } from "react-icons/bi";
import * as React from "react";
import { ListItem } from "@/partials/ListItem";
import { List } from "@/partials/List";

import {
  getShowActivity,
  ShowFIRActivityResponse,
  ShowFIRScheduleResponse,
} from "@/lib/db-public";
import ReactPlayer from "react-player/lazy";

import {
  createShowActivityViewModel,
  ActivityViewModel,
  ShowScheduleViewModel,
  createShowScheduleViewModel,
} from "@/utils/ViewModels";
import { Props } from "framer-motion/types/types";
import { BigMedia } from "@/partials/BigMedia";
import { ArrowDirection, ScheduleRow } from "@/partials/ScheduleRow";
import { AccessLevel } from "@superfitapp/superfitjs";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { routerLoading } from "@/utils/router-loading";

import { FaLock } from "react-icons/fa";
import { createThemeFromSchedule } from "@/styles/theme";
import { LoadingPlaceholder } from "@/partials/LoadingPlaceholder";
import { NextSeo } from "next-seo";

function ScheduleActivity(props: ScheduledActivityProps, notFound: boolean) {
  const router = useRouter();

  const { user } = useUser();
  var activityViewModel: ActivityViewModel = null;
  var scheduleViewModel: ShowScheduleViewModel = null;

  if (!props.data) {
    if (notFound == true) {
      return <Error statusCode={404} />;
    } else {
      return (
        <>
          <NextSeo
            canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/s/${props.scheduleId}/a/${props.activityId}`}
            additionalMetaTags={[
              {
                name: "apple-itunes-app",
                content:
                  "app-clip-bundle-id=com.superfit.superfit.Clip,app-id=GXS8378HLM",
              },
            ]}
          ></NextSeo>
          <Layout scheduleId={props.scheduleId}>
            <LoadingPlaceholder></LoadingPlaceholder>
          </Layout>
        </>
      );
    }
  }

  var data: ShowFIRActivityResponse = props.data;
  if (user) {
    const { data: swrData } = useSWR<ShowFIRActivityResponse>(
      `/api/schedule/${props.scheduleId}/activity/${props.activityId}`,
      fetcher,
      {
        initialData: props.data,
        revalidateOnMount: true,
      }
    );

    data = swrData;
  }

  const {
    isLoading,
    effect: routerEffect,
    onDestroy: routerOnDestroy,
  } = routerLoading(router);

  React.useEffect(() => {
    routerEffect();
    return () => {
      routerOnDestroy();
    };
  }, []);

  if (data) {
    activityViewModel = createShowActivityViewModel(data);
    scheduleViewModel = createShowScheduleViewModel(
      props.scheduleId,
      data.schedule,
      data.scheduleMember
    );
  }

  const tipLink = isIOS
    ? `venmo://paycharge?txn=pay&recipients=leojkwan&amount=9.99&note=Just%20Testing%20heh`
    : `https://venmo.com/leojkwan`;

  var scheduledDateString = activityViewModel?.scheduledDateString || null;
  var scheduledDateRelative = activityViewModel?.scheduledDateRelative || null;

  let instructionsBlockMap =
    activityViewModel?.instructionSetViewModel?.instructionsBlockMap || null;

  const activityTitle = activityViewModel?.title || null;
  const activityAbout = activityViewModel?.description || null;
  const activityPhotoUrl = activityViewModel?.photoUrl || null;

  const userTheme = createThemeFromSchedule(data.schedule);

  return (
    <>
      <NextSeo
        title={activityTitle}
        description={activityAbout}
        titleTemplate="%s | Built on SuperFit"
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/s/${props.scheduleId}/a/${props.activityId}`}
        additionalMetaTags={[
          {
            name: "apple-itunes-app",
            content:
              "app-clip-bundle-id=com.superfit.superfit.Clip,app-id=GXS8378HLM",
          },
        ]}
        openGraph={{
          type: "website",
          locale: "en_IE",
          title: activityTitle,
          description: activityAbout,
          site_name: activityTitle,
          images: [
            {
              url: activityPhotoUrl,
              width: 800,
              height: 500,
              alt: `Image of ${activityTitle} from ${scheduleViewModel.scheduleTitle}`,
            },
          ],
        }}
      />
      <Layout
        scheduleId={activityViewModel?.scheduleId}
        scheduleMember={data.scheduleMember}
        userTheme={userTheme}
      >
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
                      rounded="md"
                      direction="column"
                      align="stretch"
                      py={{ base: "4", md: "4" }}
                      position="relative"
                      justify="flex-end"
                      zIndex={1}
                      w="full"
                      h="full"
                      mx="auto"
                      px={{ base: "4", md: "4" }}
                    >
                      <HStack
                        align="baseline"
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
                            fontSize="xs"
                            fontWeight="semibold"
                          >
                            {activityViewModel?.activityType}
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
                  align="stretch"
                  justify="space-between"
                  alignItems="start"
                >
                  <VStack align="stretch" spacing="0">
                    {scheduledDateString && (
                      <Text
                        // fontSize="sm"
                        // fontWeight="semibold"
                        color={mode("gray.500", "gray.200")}
                      >
                        {scheduledDateString}
                      </Text>
                    )}
                    <Text
                      fontSize="xl"
                      letterSpacing="tight"
                      fontWeight="medium"
                    >
                      {activityTitle}
                    </Text>
                  </VStack>
                  <Center rounded="lg" bg="rgba(0,0,0,0.05)">
                    <Text
                      hidden
                      py="1"
                      px="2"
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      $50
                    </Text>
                  </Center>
                </Flex>

                <ScheduleRow
                  mb={{ base: "4", md: "12" }}
                  mt={{ base: "2", md: "4" }}
                  schedulePhotoUrl={activityViewModel?.schedulePhotoUrl}
                  scheduleOwnerDisplayName={
                    activityViewModel?.scheduleOwnerDisplayName
                  }
                  scheduleId={activityViewModel?.scheduleId}
                  scheduleTitle={activityViewModel?.scheduleTitle}
                  arrowDirection={ArrowDirection.forward}
                ></ScheduleRow>

                {(!scheduleViewModel?.userIsPaidMember || false) &&
                  scheduleViewModel?.joinSchedulePaidCta &&
                  props?.data?.accessLevel != AccessLevel.all && (
                    <Button
                      loadingText="Loading Plans"
                      isLoading={isLoading}
                      size="lg"
                      colorScheme="blue"
                      minH="14"
                      onClick={() => {
                        router.push(`/s/${props.scheduleId}/join`);
                      }}
                      rightIcon={<BiRightArrowAlt />}
                    >
                      {scheduleViewModel?.joinSchedulePaidCta}
                    </Button>
                  )}

                <Box
                  rounded="lg"
                  mt={{ base: "8", md: "12", lg: "16" }}
                  as="blockquote"
                  bg={{ md: mode("white", "gray.700") }}
                  py={{ base: "4", md: "6" }}
                  px={{ base: "0", md: "6" }}
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

                  <Text
                    as="p"
                    whiteSpace="pre-line"
                    orientation="vertical"
                    fontSize="md"
                    fontWeight="regular"
                  >
                    {activityAbout}
                  </Text>
                </Box>
              </Box>

              <VStack spacing={{ base: "6", md: "8" }} align="stretch">
                {props?.data?.accessLevel == AccessLevel.all && (
                  <Flex hidden w="full" mx="auto" justifyContent="center">
                    <HStack
                      className="group"
                      as="a"
                      href={tipLink}
                      ps="2"
                      pr="4"
                      mt={{ base: "4", md: "0" }}
                      py="1"
                      bg={mode(
                        "rgb(255, 255, 255, 0.7)",
                        "rgb(255, 255, 255, 0.4)"
                      )}
                      rounded="full"
                      fontSize="sm"
                      display="inline-flex"
                    >
                      <BiHeartCircle color="rgb(255, 78, 78)" size="30" />

                      <Text>
                        This activity is{" "}
                        <Text as="span" fontWeight="medium">
                          free of charge
                        </Text>
                      </Text>
                      <Box
                        aria-hidden
                        transition="0.2s all"
                        _groupHover={{ transform: "translateX(2px)" }}
                        as={BiRightArrowAlt}
                        display="inline-block"
                      />
                      <Text
                        textColor={mode("rgb(255, 78, 78)", "rgb(255, 78, 78)")}
                        fontWeight="semibold"
                      >
                        Send Tip
                      </Text>
                    </HStack>
                  </Flex>
                )}

                <Flex hidden w="full" mx="auto" justifyContent="center">
                  <HStack
                    className="group"
                    as="a"
                    href="#"
                    pr="3"
                    py="1"
                    mx="auto"
                    bg={mode("gray.200", "gray.700")}
                    rounded="full"
                    fontSize="sm"
                    mt="3"
                    display="inline-flex"
                  >
                    <Badge
                      p="2"
                      variant="solid"
                      rounded="full"
                      textTransform="capitalize"
                    >
                      <FaLock></FaLock>
                    </Badge>
                    <Box fontWeight="medium">Content is Locked</Box>
                  </HStack>
                </Flex>

                {activityViewModel?.videoThumbnailUrl && (
                  <BigMedia
                    alt={`Workout video for ${activityViewModel?.title}`}
                    src={activityViewModel?.videoThumbnailUrl}
                    videoSrc={
                      activityViewModel?.customMuxUrl ||
                      activityViewModel?.youtubeLink
                    }
                  />
                )}

                <Accordion allowToggle>
                  <Box>
                    <List spacing="12">
                      {instructionsBlockMap &&
                        activityViewModel?.instructionSetViewModel.orderedInstructionBlocks.map(
                          (block) => {
                            return (
                              <>
                                <ListItem
                                  key={`${block.uniqueId}`}
                                  title=""
                                  // fontSize="large"
                                  // subTitle={`${length} Exercise${
                                  //   length > 1 ? "s" : ""
                                  // }`}
                                  subTitle=""
                                  color="green"
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
                                    spacing={{ base: "4", md: "2" }}
                                    align="stretch"
                                    w="full"
                                  >
                                    {instructionsBlockMap[block.uniqueId] &&
                                      instructionsBlockMap[block.uniqueId].map(
                                        (viewModel) => {
                                          return (
                                            <AccordionItem
                                              key={`${viewModel.instruction?.uniqueId}`}
                                            >
                                              {({ isExpanded }) => (
                                                <>
                                                  <h2>
                                                    <AccordionButton
                                                      px="1"
                                                      justifyContent="space-between"
                                                      rounded="xl"
                                                    >
                                                      <Flex
                                                        alignItems="center"
                                                        align="stretch"
                                                        w="full"
                                                        justifyContent="space-around"
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

                                                        {viewModel.thumbnailUrl && (
                                                          <>
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
                                                            <AccordionIcon
                                                              color="gray.500"
                                                              ms="1"
                                                            />
                                                          </>
                                                        )}
                                                      </Flex>
                                                    </AccordionButton>
                                                  </h2>

                                                  {viewModel.thumbnailUrl && (
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
                                                  )}
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
                </Accordion>
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
  scheduleId: string;
  activityId: string;
  data: ShowFIRActivityResponse;
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

  var props: ScheduledActivityProps = null;

  let data = await getShowActivity(activityId, scheduleId);

  if (!data) {
    return {
      props: props,
      notFound: true,
      revalidate: 0,
    };
  }

  props = {
    scheduleId: scheduleId,
    activityId: activityId,
    data: data,
  };

  return {
    props: props,
    notFound: false,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
