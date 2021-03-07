import Layout from "@/components/schedule-layout";
import { StringOrNumber } from "@chakra-ui/utils";
import { Fade, useBreakpointValue } from "@chakra-ui/react";

import {
  HiBriefcase,
  HiChevronDoubleRight,
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

  const [currentOption, setCurrentOption] = React.useState<
    StringOrNumber | undefined
  >(null);

  return (
    <>
      <Layout scheduleId={null}>
        <Box as="section" py="12">
          <Box
            rounded={{ lg: "lg" }}
            bg={mode("white", "gray.700")}
            shadow={{ base: "none", md: "lg" }}
            overflow="hidden"
          >
            <Box
              position={{ base: "fixed", sm: "relative" }}
              width="full"
              maxWidth="full"
              bgColor={mode("white", "white")}
              px="0"
              marginX="auto"
              top="0"
            >
              <Flex align="center" justify="space-between" px="6" py="4">
                <ScheduleRow
                  schedulePhotoUrl={schedulePhotoUrl}
                  scheduleOwnerDisplayName={scheduleOwnerDisplayName}
                  scheduleId={scheduleId}
                  scheduleTitle={scheduleTitle}
                  arrowDirection={ArrowDirection.back}
                  hideTitleOnSmall={true}
                ></ScheduleRow>

                <Button
                  colorScheme="blue"
                  minW="20"
                  // rightIcon={<HiChevronDoubleRight />}
                >
                  Select
                </Button>
              </Flex>
              <Divider />
            </Box>

            <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
              <Box minW="full" mx="auto">
                <ButtonRadioGroup
                  onChange={(value) => {
                    setCurrentOption(value);
                  }}
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
                      value: "analytiarstcs",
                    },

                    {
                      label: "Basic Member",
                      description: "Free",
                      icon: <HiCursorClick />,
                      value: "intranet",
                    },
                  ]}
                />
              </Box>
            </Stack>
          </Box>
        </Box>

        <Fade hidden in={currentOption != undefined}>
          <Box
            position="fixed"
            insetX="0"
            insetY="0"
            w="full"
            h="50px"
            marginX="0"
            overflow="hidden"
            align="center"
            rounded="lg"
            p="40px"
            color="white"
            mt="4"
            bg="teal.500"
            // rounded="md"
            shadow="md"
          >
            Fade
          </Box>
        </Fade>
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
