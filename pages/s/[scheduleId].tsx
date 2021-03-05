import Layout from "../../components/layout";
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

import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../../partials/BigMedia";
import { TagBelt } from "../../partials/TagBelt";
import { OwnerWithSocial } from "../../partials/OwnerWithSocial";
import { ScheduledActivity } from "../../partials/ScheduledActivity";
import { getSchedule } from "../../lib/db-public";
import {
  ShowScheduleViewModel,
  createShowScheduleViewModel,
} from "../../utils/view-models";
import { Props } from "framer-motion/types/types";
import Error from "next/error";

export interface ScheduleProps extends Props {
  vm?: ShowScheduleViewModel;
  notFound: boolean;
}

function Schedule(props: ScheduleProps) {
  const schedule = props.vm?.data?.schedule;

  if (!schedule) {
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

  const scheduleTitle = schedule.title;
  const scheduleAbout = schedule.profile?.about;
  const schedulePhotoUrl = props.vm?.photoUrl;
  const activities = props.vm?.data?.activities;

  return (
    <>
      <Layout>
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
                  <TagBelt type="Workout" tags={["bodyweight", "at-home"]} />
                  <Heading size="xl" mt="6" mb="4">
                    {scheduleTitle}
                  </Heading>
                  <Text
                    fontSize="lg"
                    color={mode("gray.600", "gray.400")}
                    lineHeight="tall"
                  >
                    {scheduleAbout}
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
                  activity={activity}
                  schedule={schedule}
                ></ScheduledActivity>
              );
            })}
          </SimpleGrid>
        </Box>
      </Layout>
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

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  if (!scheduleId) {
    return {
      props: {
        notFound: true,
      },
      revalidate: 1,
    };
  }

  let showSchedule = await getSchedule(scheduleId);

  if (!showSchedule) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      vm: createShowScheduleViewModel(showSchedule),
      notFound: false,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Schedule;
