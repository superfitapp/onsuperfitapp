import Error from "next/error";
import ScheduleLayout from "@/components/schedule-layout";
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
  AspectRatio,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Badge,
  Link,
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import * as React from "react";
import { ListItem } from "@/partials/ListItem";
import { List } from "@/partials/List";
import { useUser } from '@auth0/nextjs-auth0';

import { getShowActivity, ShowFIRActivityResponse } from "@/lib/db-public";
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
import { useRouter } from "next/router";
import { routerLoading } from "@/utils/router-loading";
import { CustomSelect } from "@/partials/dropdown-select/CustomSelect";
import { FaLock } from "react-icons/fa";
import { createThemeFromSchedule } from "@/styles/theme";
import { LoadingPlaceholder } from "@/partials/LoadingPlaceholder";
import { NextSeo } from "next-seo";
import { Option } from "@/partials/dropdown-select/Option";
import { CheckoutResponse } from "@/lib/checkout-response";
import getStripe from "@/utils/stripe";
import fetcher from "@/utils/fetcher";


enum HighFive {
  One = "1 🙌",
  Two = "2 🙌 ",
  Three = "3 🙌",
  Four = "4 🙌",
}

function ScheduleActivity(props: ScheduledActivityProps, notFound: boolean) {
  const router = useRouter();
  const [selectedTipOption, setSelectedTipOption] = React.useState<
    string | null | undefined
  >(HighFive.One);

  function sendTipGift(amount: number) {
    router.push(
      `/s/${props.scheduleId}/a/${props.activityId}/checkout?tipAmount=${amount * 100}`
    );
  }

  const { user, error } = useUser();

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


  const key = user
  ? `/api/schedule/${props.scheduleId}/activity/${props.activityId}`
  : `/api/show/schedule/${props.scheduleId}/activity/${props.activityId}`


  const options = {
    initialData: props.data,
    revalidateOnMount: user != undefined,
    revalidateOnFocus: false,
  }

  const { data } = useSWR<ShowFIRActivityResponse>(
    key,
    fetcher,
    options
  );
  // const activityData = props.data
  const activityData = data || props.data
    
  var activityViewModel: ActivityViewModel = null;
  var scheduleViewModel: ShowScheduleViewModel = null;

  if (activityData && activityData.schedule) {
    activityViewModel = createShowActivityViewModel(activityData);
    scheduleViewModel = createShowScheduleViewModel(
      props.scheduleId,
      activityData.schedule,
      activityData.scheduleMember
    );
  }

  const canJoinScheduleCta =
    scheduleViewModel?.joinSchedulePaidCta ||
    scheduleViewModel?.joinScheduleFreeCta;

  const scheduledDateString = activityViewModel?.scheduledDateString || null;

  let instructionsBlockMap =
    activityViewModel?.instructionSetViewModel?.instructionsBlockMap || null;

  const activityTitle = activityViewModel?.title || null;
  const activityAbout = activityViewModel?.description || null;
  const activityPhotoUrl = activityViewModel?.photoUrl || null;

  const userTheme = createThemeFromSchedule(activityData?.schedule);
  const accessOptions = activityViewModel?.accessOptions;

  function selectAccessOption(option: AccessLevel) {
    switch (option) {
      case AccessLevel.paidMembers:
      case AccessLevel.members:
        router.push(`/s/${props.scheduleId}/join`);
        break
      case AccessLevel.oneTimePurchase:
        router.push(`/s/${props.scheduleId}/a/${props.activityId}/checkout`);
    }
  }

  let highFiveAmount = 5;
  switch (selectedTipOption) {
    case HighFive.One:
      highFiveAmount = 5;
      break;
    case HighFive.Two:
      highFiveAmount = 10;
      break;
    case HighFive.Three:
      highFiveAmount = 15;
      break;
    case HighFive.Four:
      highFiveAmount = 20;
      break;
  }

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
                  "app-clip-bundle-id=com.superfit.superfit.Clip,app-id=GXS8378HLM,app-clip-display=card",
              },
            ]}
          ></NextSeo>
          <ScheduleLayout canJoin={false} scheduleId={props.scheduleId}>
            <LoadingPlaceholder></LoadingPlaceholder>
          </ScheduleLayout>
        </>
      );
    }
  }

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
              "app-clip-bundle-id=com.superfit.superfit.Clip,app-id=GXS8378HLM,app-clip-display=card",
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
              alt: `Image of ${activityTitle} from ${scheduleViewModel?.scheduleTitle}`,
            },
          ],
        }}
      />
      <ScheduleLayout
        canJoin={canJoinScheduleCta != undefined}
        scheduleId={activityViewModel?.scheduleId}
        scheduleMember={activityData?.scheduleMember}
        userTheme={userTheme}
      >
        <Box
          as="section"
          my={{ base: "2", md: "8" }}
          py={{ base: "8", md: "12" }}
          rounded="md"
          bg={mode("gray.50", "gray.800")}
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
                      justify="flex-end"
                      zIndex={1}
                      position="relative"
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
                      {/* placeholder */}
                      {!activityPhotoUrl && (
                        <Box
                          background="#f1f4f8"
                          position="absolute"
                          w="full"
                          h="full"
                        ></Box>
                      )}
                      {activityPhotoUrl && (
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
                      )}
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
                      <Text color={mode("gray.500", "gray.200")}>
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

                {/* not a paid member and schedule allows joining */}
                <HStack align="stretch" spacing="5">
                  {accessOptions &&
                    accessOptions.map((vm) => {
                      return (
                        <Button
                          height="min-content"
                          loadingText="Loading"
                          isLoading={isLoading}
                          size="md"
                          borderWidth="2px"
                          py="4"
                          px="6"
                          borderColor="primaryAlpha.100"
                          bgColor="primaryAlpha.100"
                          _hover={{
                            bg: mode("primary", "primaryAlpha.800"),
                            textColor: "white",
                          }}
                          color="primary"
                          variant="solid"
                          onClick={() => selectAccessOption(vm.option)}
                          rightIcon={<BiRightArrowAlt />}
                        >
                          <Text
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {vm.cta}
                          </Text>
                        </Button>
                      );
                    })}
                </HStack>
                {activityAbout && (
                  <Box
                    rounded="lg"
                    mt={{ base: "8", md: "12", lg: "16" }}
                    as="blockquote"
                    bg={{ md: mode("white", "gray.700") }}
                    py={{ base: "4", md: "6" }}
                    px={{ base: "0", md: "6" }}
                  >
                    <Heading
                      as="h6"
                      size="sm"
                      color={mode("gray.500", "gray.200")}
                      pb="3"
                    >
                      <Text textTransform="capitalize">Details</Text>
                    </Heading>

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
                )}
              </Box>

              <VStack spacing={{ base: "2", md: "8" }} align="stretch">
                {activityViewModel && activityViewModel.isTipEnabled && (
                  <Flex w="full" mx="auto" justifyContent="center">
                    <VStack
                      // alignItems="start"
                      mt={{ base: "4", md: "0" }}
                      mb={{ base: "4", md: "0" }}
                      py={{ base: "4", sm: "6" }}
                      px={{ base: "6", sm: "12" }}
                      borderColor={mode("primaryAlpha.400", "primaryAlpha.100")}
                      bgColor="white"
                      borderWidth="2px"
                      rounded="xl"
                      fontSize="sm"
                      display="inline-flex"
                      spacing="5"
                    >
                      <Text
                        as="h3"
                        fontSize="md"
                        fontWeight="medium"
                        textColor="gray.500"
                      >
                        Support me and{" "}
                        <Link
                          color="primary"
                          href={`${process.env.NEXT_PUBLIC_BASE_URL}/s/${props.scheduleId}`}
                        >
                          {scheduleViewModel.scheduleTitle}
                        </Link>
                      </Text>

                      <HStack fontSize="lg" display="inline-flex">
                        <CustomSelect
                          fontSize="lg"
                          textColor="primaryAlpha.800"
                          name="Fruit"
                          value={selectedTipOption}
                          placeholder="Gift a High-Five 🙌"
                          onChange={setSelectedTipOption}
                        >
                          <Option value={HighFive.One} />
                          <Option value={HighFive.Two} />
                          <Option value={HighFive.Three} />
                          <Option value={HighFive.Four} />
                        </CustomSelect>

                        <Box
                          aria-hidden
                          transition="0.2s all"
                          _groupHover={{ transform: "translateX(2px)" }}
                          as={BiRightArrowAlt}
                          display="inline-block"
                        />

                        <Button
                          height="min-content"
                          loadingText="Loading"
                          isLoading={isLoading}
                          size="md"
                          borderWidth="2px"
                          rounded="full"
                          py="4"
                          px={{ base: "4", md: "8" }}
                          borderColor="primaryAlpha.100"
                          _hover={{
                            bg: mode("primary", "primaryAlpha.500"),
                            textColor: "white",
                          }}
                          color="secondary"
                          variant="outline"
                          onClick={() => sendTipGift(highFiveAmount)}
                        >
                          <Text
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            Gift ${highFiveAmount}
                          </Text>
                        </Button>
                      </HStack>
                    </VStack>
                  </Flex>
                )}

                {activityViewModel?.videoThumbnailUrl && (
                  <>
                    <Heading
                      as="h6"
                      size="sm"
                      color={mode("gray.500", "gray.200")}
                    >
                      <Text textTransform="capitalize">Activity Preview</Text>
                    </Heading>
                    <BigMedia
                      alt={`Workout video for ${activityViewModel?.title}`}
                      src={activityViewModel?.videoThumbnailUrl}
                      videoSrc={
                        activityViewModel?.customMuxUrl ||
                        activityViewModel?.youtubeLink
                      }
                    />
                  </>
                )}

                {/* Content is locked */}
                <Flex
                  display={activityData?.hasAccess ? "none" : "inherit"}
                  w="full"
                  mx="auto"
                  justifyContent="center"
                >
                  <HStack
                    className="group"
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
      </ScheduleLayout>
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
