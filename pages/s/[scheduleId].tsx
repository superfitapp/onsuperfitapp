import Layout from "../../components/layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
} from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../../partials/BigMedia";
import { TagBelt } from "../../partials/TagBelt";
import { OwnerWithSocial } from "../../partials/OwnerWithSocial";
import { ScheduledActivity } from "../../partials/ScheduledActivity";
import { getSchedule, ShowFIRScheduleResponse } from "../../lib/db-public";
import { PhotoType } from "@superfitapp/superfitjs";
import {
  ShowScheduleViewModel,
  createShowScheduleViewModel,
} from "../../utils/view-models";

function Schedule(vm?: ShowScheduleViewModel) {
  const schedule = vm?.data?.schedule;
  if (!schedule) {
    return (
      <Layout>
        <div>No schedule</div>
      </Layout>
    );
  }

  const scheduleTitle = schedule.title;
  const scheduleAbout = schedule.profile?.about;
  const schedulePhotoUrl = vm.photoUrl;

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
          <SimpleGrid columns={[1, 1, 3]} spacing="40px">
            <ScheduledActivity></ScheduledActivity>
            <ScheduledActivity></ScheduledActivity>
            <ScheduledActivity></ScheduledActivity>
            <ScheduledActivity></ScheduledActivity>
            <ScheduledActivity></ScheduledActivity>
            <ScheduledActivity></ScheduledActivity>
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
      props: null,
      revalidate: 1,
    };
  }

  let showSchedule = await getSchedule(scheduleId);

  if (!showSchedule) {
    return {
      props: null,
    };
  }

  return {
    props: createShowScheduleViewModel(showSchedule),
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Schedule;
