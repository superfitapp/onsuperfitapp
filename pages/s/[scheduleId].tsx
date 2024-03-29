import ScheduleLayout from "../../components/schedule-layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
  Center,
  Spinner,
  Button,
  Fade,
  Spacer,
} from "@chakra-ui/react";
import Error from "next/error";

import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../../partials/BigMedia";
import { OwnerWithSocial } from "../../partials/OwnerWithSocial";
import { ScheduledActivityCellItem } from "../../partials/ScheduledActivityCellItem";
import { ShowFIRScheduleResponse } from "../../lib/db-public";
import {
  createShowScheduleViewModel,
  ScheduleAccessOptionEnum,
  ShowScheduleViewModel,
} from "../../utils/ViewModels";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FIRActivity } from "@superfitapp/superfitjs";
import { fetchShowSchedule } from "@/lib/schedule";
import { routerLoading } from "@/utils/router-loading";
import { useRouter } from "next/router";
import { BiRightArrowAlt } from "react-icons/bi";
import { createThemeFromSchedule } from "@/styles/theme";
import { NextSeo } from "next-seo";

export interface ScheduleProps {
  scheduleId: string;
  data: ShowFIRScheduleResponse;
}

function SchedulePage(props: ScheduleProps, notFound: boolean) {
  const router = useRouter();
  const { user } = useUser();

  const {
    isLoading,
    effect: routerEffect,
    onDestroy: routerOnDestroy,
  } = routerLoading(router);

  const key = user
    ? `/api/schedule/${props.scheduleId}?fetchRecentActivities=true`
    : `/api/show/schedule/${props.scheduleId}?fetchRecentActivities=true`

  const options = {
    initialData: props.data,
    revalidateOnMount: user != undefined,
    revalidateOnFocus: false,
  }

  const { data, isValidating } = useSWR<ShowFIRScheduleResponse>(
    key,
    fetcher,
    options
  );

  React.useEffect(() => {
    routerEffect();
    return () => {
      routerOnDestroy();
    };
  }, []);

  var activities: FIRActivity[] = props.data?.activities || [];
  var schedule = data?.schedule || props?.data?.schedule
  var scheduleTitle = schedule?.title;
  const scheduleAbout = schedule?.profile?.about;
  var schedulePhotoUrl: string = null;
  var ownerDisplayName: string = null;

  const scheduleMember = data?.scheduleMember || props?.data?.scheduleMember
  const latestInviteRequest = data?.latestInviteRequest || props?.data?.latestInviteRequest
  var vm: ShowScheduleViewModel = null

  if (schedule) {
    vm = createShowScheduleViewModel(
      props.scheduleId,
      schedule,
      scheduleMember,
      latestInviteRequest
    );
  }

  schedulePhotoUrl = vm?.photoUrl;
  ownerDisplayName = schedule?.ownerDisplayName;
  // const canJoinScheduleCta = vm?.joinSchedulePaidCta || vm?.joinScheduleFreeCta;
  const userTheme = createThemeFromSchedule(data?.schedule);

  /*
   *  Empty State
   */
  if (!props.scheduleId || !schedule) {
    if (notFound == true) {
      return <Error statusCode={404} />;
    }

    return (
      <ScheduleLayout canJoin={false} scheduleId={props.scheduleId}>
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
              color="primary"
              size="xl"
            />
          </Center>
        </Box>
      </ScheduleLayout>
    );
  }

  return (
    <>
      <NextSeo
        title={scheduleTitle}
        description={scheduleAbout}
        titleTemplate="%s | Built on SuperFit"
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/s/${props.scheduleId}`}
        openGraph={{
          type: "website",
          locale: "en_IE",
          // url: baseUrl,
          title: scheduleTitle,
          description: scheduleAbout,
          site_name: scheduleTitle,
          images: [
            {
              url: schedulePhotoUrl,
              width: 800,
              height: 500,
              alt: `${scheduleTitle} Image`,
            },
          ],
        }}
      />
      <ScheduleLayout
        canJoin={!vm?.accessOption.isCta()}
        scheduleId={props?.scheduleId}
        scheduleMember={data?.scheduleMember}
        userTheme={userTheme}
      >
        <Box
          as="section"
          textAlign={{ base: "center", md: "initial" }}
          bg={mode("gray.50", "inherit")}
          my={{ base: "2", md: "8" }}
          rounded="md"
          px={{ base: "4", md: "8" }}
          py={{ base: "6", md: "8" }}
        >
          <Box>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 24rem" }}
              columnGap={{ base: "16", lg: "20" }}
              rowGap="4"
            >
              {schedulePhotoUrl && (
                <Box className="test" pos="relative" maxH="400px">
                  <BigMedia
                    alt={`Photo of fitness schedule: ${scheduleTitle}`}
                    src={schedulePhotoUrl}
                    zIndex={1}
                    boxShadow={{ base: "xl", md: "dark-lg" }}
                    mx="auto"
                    maxH="400px"
                    rounded={{ base: "lg", md: "xl" }}
                    w={{ base: "100px", md: "100%" }}
                    h={{ base: "100px", md: "100%" }}
                  />
                  <Box
                    zIndex="0"
                    position="absolute"
                    display={{ base: "none", md: "initial" }}
                    w={{ base: "100px", md: "100%" }}
                    h={{ base: "100px", md: "100%" }}
                    top={{ base: "-2", sm: "-2" }}
                    left={{ base: "2", md: "2" }}
                    boxShadow={{ base: "xl", md: "dark-lg" }}
                    bgColor="primaryAlpha.900"
                    rounded={{ base: "full", sm: "xl" }}
                  />
                </Box>
              )}

              <Flex
                direction="column"
                h="full"
                align={{ base: "center", md: "initial" }}
              >
                <Box flex="1">
                  <Heading size="xl" mt="4" mb="4">
                    {scheduleTitle}
                  </Heading>
                  <Text
                    fontSize="lg"
                    color={mode("gray.800", "gray.400")}
                    lineHeight="tall"
                  >
                    {scheduleAbout}
                  </Text>
                </Box>

                <Fade in={!isValidating}>
                  {vm?.showScheduleCta && (
                    <Button
                      my="3"
                      loadingText="Loading Plans"
                      isLoading={isLoading}
                      borderWidth="2px"
                      p="6"
                      isDisabled={!vm?.accessOption.isCta()}
                      borderColor="primaryAlpha.100"
                      bgColor="primaryAlpha.100"
                      _hover={{
                        bg: mode("primary", "primaryAlpha.800"),
                        textColor: "white",
                      }}
                      color="primary"
                      variant="solid"
                      minH={{ base: "10", md: "12" }}
                      onClick={() => {
                        switch (vm?.accessOption.option) {
                          case ScheduleAccessOptionEnum.inviteRequired:
                            router.push(`/s/${props.scheduleId}/request_invite`);
                            break
                          default:
                            router.push(`/s/${props.scheduleId}/join`);
                        }
                      }}
                      rightIcon={vm?.accessOption.isCta() ? <BiRightArrowAlt /> : null}
                    >
                      {vm?.showScheduleCta}
                    </Button>
                  )}
                </Fade>
                <Spacer></Spacer>

                {ownerDisplayName && (
                  <Box mt="8">
                    <OwnerWithSocial
                      mt="8"
                      name={ownerDisplayName}
                      profile={schedule.profile}
                      iconColor={vm?.socialIconsColor}
                    ></OwnerWithSocial>
                  </Box>
                )}
              </Flex>
            </Grid>
          </Box>
        </Box>

        <Box
          as="section"
          mx="auto"
          rounded="lg"
          maxW={{ base: "xl", md: "4xl" }}
          px={{ base: "6", md: "0" }}
          py={{ base: "6", md: "8" }}
        >
          <SimpleGrid
            columns={[1, 1, 3]}
            spacing={{ base: "20px", md: "40px" }}
          >
            {activities &&
              activities?.map((activity) => {
                return (
                  <ScheduledActivityCellItem
                    key={activity.id}
                    activity={activity}
                    schedule={schedule}
                  ></ScheduledActivityCellItem>
                );
              })}
          </SimpleGrid>
        </Box>
      </ScheduleLayout>
    </>
  );
}

export default SchedulePage;

// This function gets called at build time.
export async function getStaticPaths() {
  // Don't prerender any schedule pages.
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  var props: ScheduleProps | undefined = {
    scheduleId: scheduleId,
    data: null,
  };

  if (!scheduleId) {
    return {
      props: props,
      notFound: true,
      revalidate: 1,
    };
  }

  var data = await fetchShowSchedule({
    scheduleId: scheduleId,
    fetchRecentActivities: true,
  });

  if (!data) {
    return {
      props: props,
      notFound: true,
    };
  }

  props = {
    scheduleId: scheduleId,
    data: data,
  };

  return {
    props: props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
