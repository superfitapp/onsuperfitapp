import Layout from "@/components/schedule-layout";
import { StringOrNumber } from "@chakra-ui/utils";

import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  HStack,
  useColorModeValue as mode,
  Center,
  Spinner,
} from "@chakra-ui/react";

import * as React from "react";
import {
  createShowScheduleViewModel,
  ShowScheduleViewModel,
} from "@/utils/ViewModels";
import Error from "next/error";
import { ArrowDirection, ScheduleRow } from "@/partials/ScheduleRow";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { isIOS, OsTypes, osVersion } from "react-device-detect";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Steps } from "@/partials/steps/Steps";
import { Step } from "@/partials/steps/Step";
import { StepContent } from "@/partials/steps/StepContent";
import { useSteps } from "@/partials/steps/useSteps";
import { ShowFIRScheduleResponse } from "@/lib/db-public";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import ScheduleLayout from "@/components/schedule-layout";
import { CheckoutScheduleProps } from "./checkout";

export interface ScheduleChecklistProps {
  scheduleId: string;
  data: ShowFIRScheduleResponse;
}

enum ScheduleChecklistItem {
  UpgradeToPremium,
  ConfirmMembership,
  InviteOnly,
  YouAreMember,
  DownloadApp,
  BookmarkSchedule,
}

export default function ScheduleChecklist(
  props: ScheduleChecklistProps,
  notFound: boolean
) {
  const { user } = useUser();

  const {
    nextStep,
    prevStep,
    reset,
    activeStep,
    showLoading,
    isLoading,
  } = useSteps({
    initialStep: 0,
  });
  console.log("isIOS????", isIOS);
  console.log("osVersion", osVersion);
  console.log("OsTypes", OsTypes);

  const { data } = useSWR<ShowFIRScheduleResponse>(
    user
      ? `/api/schedule/${props.scheduleId}`
      : `/api/show/schedule/${props.scheduleId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  var vm: ShowScheduleViewModel = null;

  if (data) {
    vm = createShowScheduleViewModel(
      props.scheduleId,
      data.schedule,
      data.scheduleMember
    );
  } else {
    if (!props.scheduleId || !data?.schedule) {
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
  }

  const scheduleTitle = vm?.scheduleTitle;
  const schedulePhotoUrl = vm?.photoUrl;
  const scheduleId = vm?.scheduleId;
  const scheduleOwnerDisplayName = vm?.ownerDisplayName;
  var steps: ScheduleChecklistItem[] = [];

  // can sign up
  if (vm.canSignUp) {
    if (!vm.userIsScheduleMember && vm.joinScheduleFreeCta) {
      // can join free
      steps.push(ScheduleChecklistItem.ConfirmMembership);
    } else if (!vm.userIsScheduleMember && vm.joinSchedulePaidCta) {
      // can join paying
      steps.push(ScheduleChecklistItem.UpgradeToPremium);
    }
  } else {
    steps.push(ScheduleChecklistItem.InviteOnly);
  }

  return (
    <>
      <Layout scheduleId={null} hideHeaderMobile={true}>
        <Box as="section" py={{ base: "2", md: "8" }}>
          {osVersion}
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
              </Flex>
              <Divider />
            </Box>

            {/*  */}
            <Box
              maxW="2xl"
              mx="auto"
              py={{ base: 12, md: 20 }}
              px={{ base: "6", md: "8" }}
            >
              <Steps activeStep={activeStep}>
                <Step title={`Confirm Free Membership`}>
                  <StepContent>
                    <Stack shouldWrapChildren spacing="4">
                      <Text>
                        Join{" "}
                        <Text fontWeight="medium" as="span">
                          {vm.scheduleTitle}
                        </Text>{" "}
                        and unlock access to members-only workouts.
                      </Text>
                      <HStack>
                        <Button isDisabled variant="ghost">
                          Back
                        </Button>
                        <Button
                          isLoading={isLoading}
                          onClick={async () => {
                            showLoading(true);
                            await new Promise((r) => setTimeout(r, 2000));
                            showLoading(false);
                            nextStep();
                          }}
                        >
                          Confirm
                        </Button>
                      </HStack>
                    </Stack>
                  </StepContent>
                </Step>
                <Step title="Download the iOS app (optional)">
                  <StepContent>
                    <Stack shouldWrapChildren spacing="4">
                      <Text>
                        Get the full workout experience on the SuperFit mobile
                        app (iOS/iPad/Mac)
                      </Text>
                      <HStack>
                        <Button onClick={prevStep} variant="ghost">
                          Back
                        </Button>
                        <Button onClick={nextStep} isLoading={isLoading}>
                          Next
                        </Button>
                      </HStack>
                    </Stack>
                  </StepContent>
                </Step>
                <Step title="Upgrade to Premium">
                  <StepContent>
                    <Stack shouldWrapChildren spacing="4">
                      <Text>
                        Try out different ad text to see what brings in the most
                        customers, and learn how to enhance your ads using
                        features like ad extensions. If you run into any
                        problems with your ads, find out how to tell if
                        they&apos;re running and how to resolve approval issues.
                      </Text>
                      <HStack>
                        <Button onClick={prevStep} variant="ghost">
                          Back
                        </Button>
                        <Button isLoading={isLoading} onClick={nextStep}>
                          Finish
                        </Button>
                      </HStack>
                    </Stack>
                  </StepContent>
                </Step>
              </Steps>
              {activeStep === 3 && (
                <HStack py="16" spacing="4" shouldWrapChildren>
                  <Text>All steps completed - you&apos;re finished</Text>
                  <Button
                    onClick={reset}
                    variant="link"
                    verticalAlign="baseline"
                  >
                    Reset
                  </Button>
                </HStack>
              )}
            </Box>
            {/*  */}
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params, req, res }: GetServerSidePropsContext) {
    const session = getSession(req, res);

    const { scheduleId } = params;
    if (!scheduleId) {
      return {
        notFound: true,
      };
    }

    // let data = await fetchShowSchedule(
    //   scheduleId as string,
    //   true,
    //   session?.user?.sub
    // );

    var props: CheckoutScheduleProps = null;

    // if (!data) {
    //   return {
    //     notFound: true,
    //   };
    // }

    props = {
      scheduleId: scheduleId as string,
    };

    return {
      props: props,
    };
  },
});
