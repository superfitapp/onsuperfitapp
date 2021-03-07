import Layout from "../../../components/schedule-layout";
import {
  HiBriefcase,
  HiChevronDoubleRight,
  HiChevronRight,
  HiCursorClick,
  HiPlus,
} from "react-icons/hi";

import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import * as React from "react";
import { getSchedule } from "../../../lib/db-public";
import {
  ShowScheduleViewModel,
  createShowScheduleViewModel,
} from "../../../utils/ViewModels";
import { Props } from "framer-motion/types/types";
import Error from "next/error";
import { Placeholder } from "@/partials/Placeholder";
import { ButtonRadioGroup } from "@/partials/ButtonRadioGroup";
import { ArrowDirection, ScheduleRow } from "@/partials/ScheduleRow";

export interface ScheduleProps extends Props {
  vm?: ShowScheduleViewModel;
  notFound: boolean;
}

function JoinSchedule(props: ScheduleProps, notFound: boolean) {
  const schedule = props.vm?.data?.schedule;

  if (!schedule && notFound) {
    if (notFound) {
      return <Error statusCode={404} />;
    }
  }

  const scheduleTitle = schedule.title;
  const schedulePhotoUrl = props.vm?.photoUrl;
  const scheduleId = props.vm.scheduleId;
  const scheduleOwnerDisplayName = props.vm.data.schedule.ownerDisplayName;

  return (
    <>
      <Layout scheduleId={null}>
        <Box as="section" py="12">
          {/* <Box maxW={{ base: "xl", md: "7xl" }} mx="auto"> */}
          <Box
            rounded={{ lg: "lg" }}
            bg={mode("white", "gray.700")}
            // maxW="3xl"
            mx="auto"
            shadow={{ base: "none", md: "lg" }}
            overflow="hidden"
          >
            <Flex align="center" justify="space-between" px="6" py="4">
              <ScheduleRow
                schedulePhotoUrl={schedulePhotoUrl}
                scheduleOwnerDisplayName={scheduleOwnerDisplayName}
                scheduleId={scheduleId}
                scheduleTitle={scheduleTitle}
                arrowDirection={ArrowDirection.back}
              ></ScheduleRow>

              <Text hidden as="h3" fontWeight="semibold" fontSize="lg">
                <Text as="span" fontWeight="light">
                  {" "}
                </Text>
                {scheduleTitle}
              </Text>
              <Button
                colorScheme="blue"
                minW="20"
                rightIcon={<HiChevronDoubleRight />}
              >
                Sign Up
              </Button>
            </Flex>
            <Divider />

            <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
              <Box minW="full" mx="auto">
                <ButtonRadioGroup
                  defaultValue="analytics"
                  options={[
                    {
                      label: "Premium Monthly",
                      description: "$20/month",
                      icon: <HiBriefcase />,
                      value: "analytics",
                    },
                    {
                      label: "Premium Yearly",
                      description: "$20/year",
                      icon: <HiBriefcase />,
                      value: "analytics",
                    },
                    
                    {
                      label: "Basic Member",
                      description:
                        "Free",
                      icon: <HiCursorClick />,
                      value: "intranet",
                    },
                  ]}
                />
              </Box>

              {/* <Placeholder></Placeholder> */}
            </Stack>
          </Box>
        </Box>
        {/* </Box> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { scheduleId } = params;
  if (!scheduleId) {
    return {
      notFound: true,
    };
  }

  let showSchedule = await getSchedule(scheduleId);

  if (!showSchedule) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      vm: createShowScheduleViewModel(scheduleId, showSchedule),
      notFound: false,
    },
  };
}

export default JoinSchedule;
