import Layout from "@/components/schedule-layout";
import { StringOrNumber } from "@chakra-ui/utils";
import auth0 from "@auth0/nextjs-auth0";

import { HiUserCircle, HiOutlineStar } from "react-icons/hi";

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
import { routerLoading } from "@/utils/router-loading";

export interface JoinScheduleProps {
  scheduleId: string;
  vm: ShowScheduleViewModel;
}

function JoinSchedule(props: JoinScheduleProps, notFound: boolean) {
  const router = useRouter();

  if (!props.vm && notFound == true) {
    if (notFound) {
      return <Error statusCode={404} />;
    }
  }

  const scheduleTitle = props.vm?.scheduleTitle;
  const schedulePhotoUrl = props.vm?.photoUrl;
  const scheduleId = props.vm?.scheduleId;
  const scheduleOwnerDisplayName = props.vm?.ownerDisplayName;

  var options: {
    label: string;
    description: string;
    icon: any;
    value: string;
  }[] = [];

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

  const confirmButtonPressed = () => {
    switch (currentOption) {
      case "free":
        router.push(`/s/${props.scheduleId}/checklist`);
        break;
      case "premium":
        router.push(`/s/${props.scheduleId}/checkout`);
        break;
    }
  };

  let defaultValue: string = null;

  // move code to view model
  if (props.vm.canSignUp) {
    if (props.vm.joinSchedulePaidCta && props.vm.premiumPriceTitle) {
      options.push({
        label: `Premium membership`,
        description: `${props.vm.premiumPriceTitle} - cancel anytime`,
        icon: <HiOutlineStar />,
        value: "premium",
      });
      defaultValue = "premium";
    }

    if (props.vm.joinScheduleFreeCta) {
      options.push({
        label: "Free Member",
        description: "No credit card required",
        icon: <HiUserCircle />,
        value: "free",
      });

      if (options.length == 1) {
        defaultValue = "free";
      }
    }
  }

  const [currentOption, setCurrentOption] = React.useState<
    StringOrNumber | undefined
  >(defaultValue);

  return (
    <>
      <Layout scheduleId={null} hideHeaderMobile={true}>
        <Box
          as="section"
          my={{ base: "2", md: "8" }}
          shadow={{ base: "none", md: "xl" }}
          rounded={{ lg: "lg" }}
          bg={mode("white", "gray.700")}
          overflow="hidden"
        >
          <Box>
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
                  loadingText="Loading"
                  isLoading={isLoading}
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
