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
} from "@chakra-ui/react";
import Error from "next/error";

import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../../partials/BigMedia";
import { TagBelt } from "../../partials/TagBelt";
import { OwnerWithSocial } from "../../partials/OwnerWithSocial";
import { ScheduledActivity } from "../../partials/ScheduledActivity";
import { getSchedule, ShowFIRScheduleResponse } from "../../lib/db-public";
import {
  ShowScheduleViewModel,
  createShowScheduleViewModel,
} from "../../utils/ViewModels";
import { Props } from "framer-motion/types/types";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { lookup } from "node:dns";

export interface ScheduleProps extends Props {
  scheduleId: string;
  data: ShowFIRScheduleResponse;
}

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  if (!scheduleId) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  let scheduleData = await getSchedule(scheduleId);
  if (!scheduleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      scheduleId: scheduleId,
      data: scheduleData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

function Schedule(props: ScheduleProps, notFound: boolean) {
  const schedule = props.data?.schedule;

  if (!props.scheduleId || !schedule) {
    if (notFound == true) {
      return <Error statusCode={404} />;
    }

    return (
      <ScheduleLayout scheduleId={vm?.scheduleId}>
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

  const { user } = useUser();
  var vm: ShowScheduleViewModel | undefined;

  try {
    const { data } = useSWR<ShowFIRScheduleResponse>(
      user
        ? `/api/schedule/${props.scheduleId}`
        : `/api/show/schedule/${props.scheduleId}`,
      fetcher,
      {
        initialData: props.data,
      }
    );

    if (data) {
      vm = createShowScheduleViewModel(props.scheduleId, data);
    }
  } catch (error) {
    console.log(error);
  }

  var activities = vm?.data?.activities;
  var scheduleTitle = schedule?.title;
  const scheduleAbout = schedule?.profile?.about;
  const schedulePhotoUrl = vm?.photoUrl;

  return (
    <>
      <ScheduleLayout scheduleId={vm?.scheduleId}>
        <Box
          as="section"
          bg={mode("gray.50", "inherit")}
          my={{ base: "2", md: "8" }}
          rounded="md"
          px={{ base: "4", md: "8" }}
          py={{ base: "6", md: "8" }}
        >
          <Box>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 24rem" }}
              columnGap={{ base: "12", lg: "20" }}
              rowGap="10"
            >
              {schedulePhotoUrl && (
                <BigMedia
                  alt="Getting Started with Chakra"
                  src={schedulePhotoUrl}
                />
              )}

              <Flex direction="column" h="full">
                <Box flex="1">
                  {/* <TagBelt type="Workout" tags={["bodyweight", "at-home"]} /> */}
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

                <Box mt="8">
                  <OwnerWithSocial
                    mt="8"
                    name={`Created by ${vm?.data.schedule?.ownerDisplayName}`}
                    image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGFkeSUyMHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    role="Developer Advocate"
                  ></OwnerWithSocial>
                </Box>
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
            {activities.map((activity) => {
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

export default Schedule;
