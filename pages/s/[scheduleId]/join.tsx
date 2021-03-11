import Layout from "@/components/schedule-layout";
import { StringOrNumber } from "@chakra-ui/utils";
import { Fade, useBreakpointValue } from "@chakra-ui/react";

import { HiUserCircle, HiOutlineLockOpen, HiOutlineStar } from "react-icons/hi";

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
import {
  createShowScheduleViewModel,
  ShowScheduleViewModel,
} from "@/utils/ViewModels";
import Error from "next/error";
import { ButtonRadioGroup } from "@/partials/ButtonRadioGroup";
import { ArrowDirection, ScheduleRow } from "@/partials/ScheduleRow";
import { ScheduleProps } from "../[scheduleId]";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { fetchShowSchedule } from "@/lib/schedule";
import { useRouter } from "next/router";
import { MdSubscriptions } from "react-icons/md";
import { BsPersonCheckFill } from "react-icons/bs";

export interface JoinScheduleProps {
  scheduleId: string;
  vm: ShowScheduleViewModel;
}

function JoinSchedule(props: JoinScheduleProps, notFound: boolean) {
  // const router = useRouter();

  if (!props.vm && notFound == true) {
    if (notFound) {
      return <Error statusCode={404} />;
    }
  }

  // if (props?.vm.userIsPaidMember && props.scheduleId) {
  //   // already a PAID member, go back to schedule page
  //   router.push(`/s/${props.scheduleId}`);
  // }

  const confirmButtonPressed = () => {
    //
  };

  const scheduleTitle = props.vm?.scheduleTitle;
  const schedulePhotoUrl = props.vm?.photoUrl;
  const scheduleId = props.vm?.scheduleId;
  const scheduleOwnerDisplayName = props.vm?.ownerDisplayName;

  const [currentOption, setCurrentOption] = React.useState<
    StringOrNumber | undefined
  >(null);

  var options: {
    label: string;
    description: string;
    icon: any;
    value: string;
  }[] = [];

  if (props.vm.canSignUp) {
    if (props.vm.joinSchedulePaidCta && props.vm.premiumPriceTitle) {
      options.push({
        label: `${props.vm.premiumPriceTitle}`,
        description: `Premium membership- cancel anytime`,
        icon: <HiOutlineStar />,
        value: "premium",
      });
    }

    if (props.vm.joinScheduleFreeCta) {
      options.push({
        label: "Free Member",
        description: "No credit card required",
        icon: <HiUserCircle />,
        value: "free",
      });
    }
  }

  return (
    <>
      <Layout scheduleId={null}>
        <Box
          as="section"
          shadow={{ base: "none", md: "lg" }}
          rounded={{ lg: "lg" }}
          bg={mode("white", "gray.700")}
          overflow="hidden"
        >
          <Box py="8">
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
                  onClick={confirmButtonPressed}
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
                  defaultValue="premium"
                  options={options}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({
  params,
  req,
  res,
}: GetServerSidePropsContext) {
  const session = getSession(req, res);

  const { scheduleId } = params;
  if (!scheduleId) {
    return {
      notFound: true,
    };
  }

  let data = await fetchShowSchedule(
    scheduleId as string,
    true,
    session?.user?.sub
  );

  var props: JoinScheduleProps = null;

  if (!data) {
    return {
      notFound: true,
    };
  }

  const vm = createShowScheduleViewModel(
    scheduleId as string,
    data.schedule,
    data.scheduleMember
  );

  if (vm.userIsPaidMember) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/s/${scheduleId}`,
      },
    };
  }

  props = {
    scheduleId: scheduleId as string,
    vm: vm,
  };

  return {
    props: props,
  };
}

export default JoinSchedule;
