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
import { ScheduledActivity } from "../../partials/ScheduledActivity";
import { ShowFIRScheduleResponse } from "../../lib/db-public";
import {
  createShowScheduleViewModel,
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

export interface ScheduleProps {
  scheduleId: string;
  data: ShowFIRScheduleResponse;
}

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  var props: ScheduleProps | undefined = null;

  if (!scheduleId) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  var data = await fetchShowSchedule({
    scheduleId: scheduleId,
    fetchRecentActivities: true,
  });

  // if (data.schedule?.photo?.customPhotoFirPath) {
  // const url = await fetchThumbnail(
  //   ThumbnailSize.fiveTwelve,
  //   data.schedule?.photo?.customPhotoFirPath
  // );
  // }

  if (!data) {
    return {
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

function SchedulePage(props: ScheduleProps, notFound: boolean) {
  const schedule = props.data?.schedule;
  const router = useRouter();
  const { user } = useUser();

  const {
    isLoading,
    effect: routerEffect,
    onDestroy: routerOnDestroy,
  } = routerLoading(router);

  const { data, isValidating } = useSWR<ShowFIRScheduleResponse>(
    user
      ? `/api/schedule/${props.scheduleId}?fetchRecentActivities=true`
      : `/api/show/schedule/${props.scheduleId}?fetchRecentActivities=true`,
    fetcher,
    {
      initialData: props.data,
      revalidateOnMount: user != undefined,
      revalidateOnFocus: false,
    }
  );

  React.useEffect(() => {
    routerEffect();
    return () => {
      routerOnDestroy();
    };
  }, []);

  if (!props.scheduleId || !schedule) {
    if (notFound == true) {
      return <Error statusCode={404} />;
    }

    return (
      <ScheduleLayout scheduleId={props.scheduleId}>
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
      </ScheduleLayout>
    );
  }

  var activities: FIRActivity[] = props.data?.activities || [];
  var scheduleTitle = schedule?.title;
  const scheduleAbout = schedule?.profile?.about;
  var schedulePhotoUrl: string = null;
  var ownerDisplayName: string = null;

  let vm: ShowScheduleViewModel = null;

  if (data) {
    vm = createShowScheduleViewModel(
      props.scheduleId,
      data.schedule,
      data.scheduleMember
    );

    schedulePhotoUrl = vm?.photoUrl;
    ownerDisplayName = data.schedule?.ownerDisplayName;
  }

  return (
    <>
      <ScheduleLayout
        scheduleId={props?.scheduleId}
        scheduleMember={data?.scheduleMember}
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
                <Box pos="relative">
                  <BigMedia
                    alt={`Photo of fitness schedule: ${scheduleTitle}`}
                    src={schedulePhotoUrl}
                    zIndex={1}
                    boxShadow={{ base: "xl", md: "dark-lg" }}
                    mx="auto"
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
                    bg={mode("blue.600", "blue.300")}
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
                  {(!vm.userIsPaidMember || false) && vm?.joinSchedulePaidCta && (
                    <Button
                      my="3"
                      loadingText="Loading Plans"
                      isLoading={isLoading}
                      // size="lg"
                      colorScheme="blue"
                      variant="outline"
                      minH={{ base: "10", md: "12" }}
                      onClick={() => {
                        router.push(`/s/${props.scheduleId}/join`);
                      }}
                      rightIcon={<BiRightArrowAlt />}
                    >
                      {vm?.joinSchedulePaidCta}
                    </Button>
                  )}
                </Fade>
                <Spacer></Spacer>

                {ownerDisplayName && (
                  <Box mt="8">
                    <OwnerWithSocial
                      mt="8"
                      name={`Created by ${ownerDisplayName}`}
                      image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGFkeSUyMHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      role="Developer Advocate"
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
                  <ScheduledActivity
                    key={activity.id}
                    activity={activity}
                    schedule={schedule}
                  ></ScheduledActivity>
                );
              })}
          </SimpleGrid>
        </Box>
      </ScheduleLayout>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // don't prerender any schedule pages
  return {
    paths: [],
    fallback: true,
  };
}

export default SchedulePage;
