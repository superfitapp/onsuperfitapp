import Layout from "@/components/schedule-layout";
import Confetti from "react-dom-confetti";
import { routerLoading } from "@/utils/router-loading";
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
  useBoolean,
  Link,
  useBreakpointValue,
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
import { isIOS, osVersion } from "react-device-detect";
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
import { useEffect } from "react";
import { useRouter } from "next/router";

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
}

export default function ScheduleChecklist(
  props: ScheduleChecklistProps,
  notFound: boolean
) {
  const { user } = useUser();
  const router = useRouter();
  var steps: ScheduleChecklistItem[] = [];
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
  const [confettiShown, setConfetti] = useBoolean(false);
  const { data } = useSWR<ShowFIRScheduleResponse>(
    `/api/schedule/${props.scheduleId}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  var vm: ShowScheduleViewModel = null;

  const confirmMembership = async () => {
    showLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    nextStep();
    showLoading(false);
    setConfetti.off();
    setConfetti.on();
  };

  let confettiOnce = false;

  const {
    isLoading: routerIsLoading,
    effect: routerEffect,
    onDestroy: routerOnDestroy,
  } = routerLoading(router);

  useEffect(() => {
    routerEffect();
    setTimeout(() => {
      if (user && !confettiOnce) {
        setConfetti.off();
        setConfetti.on();
        confettiOnce = true;
      }
    }, 1000);

    return () => {
      routerOnDestroy();
    };
  }, []);

  if (data) {
    console.log("data.scheduleMember", data.scheduleMember);
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

  // can sign up
  if (vm.canSignUp) {
    if (!vm.userIsScheduleMember) {
      if (vm.joinScheduleFreeCta) {
        // can join free
        steps.push(ScheduleChecklistItem.ConfirmMembership);
      } else if (vm.joinSchedulePaidCta) {
        // can join paying
        steps.push(ScheduleChecklistItem.UpgradeToPremium);
      }
    } else {
      // can join paying
      steps.push(ScheduleChecklistItem.YouAreMember);
    }
  } else {
    steps.push(ScheduleChecklistItem.InviteOnly);
  }

  steps.push(ScheduleChecklistItem.DownloadApp);

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

            <Box
              maxW="2xl"
              mx="auto"
              py={{ base: 12, md: 20 }}
              px={{ base: "6", md: "8" }}
            >
              <Steps activeStep={activeStep}>
                {steps.map((step, stepIndex) => {
                  const revealedText = vm?.userIsPaidMember
                    ? `You are a premium member!`
                    : `You are a free member!`;

                  switch (step) {
                    case ScheduleChecklistItem.InviteOnly:
                      return (
                        <Step title={`${vm.scheduleTitle} is invite-only.`}>
                          <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                              <HStack>
                                <Button
                                  variant="outline"
                                  isLoading={routerIsLoading}
                                  onClick={async () => {
                                    router.push(`/s/${props.scheduleId}`);
                                  }}
                                >
                                  Go Back
                                </Button>
                              </HStack>
                            </Stack>
                          </StepContent>
                        </Step>
                      );

                    case ScheduleChecklistItem.UpgradeToPremium:
                      return (
                        <Step title={`Become a Premium Member`}>
                          <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                              <Text>
                                Unlock{" "}
                                <Text fontWeight="medium" as="span">
                                  {vm.scheduleTitle} Premium
                                </Text>{" "}
                                for all members-only content.
                              </Text>
                              <HStack>
                                <Button
                                  variant="solid"
                                  colorScheme="green"
                                  isLoading={routerIsLoading}
                                  onClick={async () => {
                                    router.push(`/s/${props.scheduleId}/join`);
                                  }}
                                >
                                  Get Premium
                                </Button>
                              </HStack>
                            </Stack>
                          </StepContent>
                        </Step>
                      );

                    case ScheduleChecklistItem.YouAreMember:
                      return (
                        <Step
                          key={stepIndex}
                          title={
                            activeStep == stepIndex ? revealedText : "Complete"
                          }
                        >
                          <StepContent>
                            <>
                              <Box position="fixed" w="full" h="full">
                                <Confetti
                                  active={confettiShown}
                                  config={{
                                    angle: 360,
                                    spread: 360,
                                    startVelocity: 30,
                                    elementCount: 100,
                                    dragFriction: 0.09,
                                    duration: 3000,
                                    stagger: 5,
                                    width: "17px",
                                    height: "22px",
                                    colors: [
                                      "#a864fd",
                                      "#29cdff",
                                      "#78ff44",
                                      "#ff718d",
                                      "#fdff6a",
                                    ],
                                  }}
                                />
                              </Box>
                              <Stack shouldWrapChildren spacing="4">
                                <Text fontSize="md">
                                  Follow me on social media
                                </Text>

                                <HStack>
                                  {/* <Button
                                    display={
                                      activeStep == 0 ? "none" : "inherit"
                                    }
                                    onClick={prevStep}
                                    isDisabled={activeStep == 0}
                                    variant="ghost"
                                  >
                                    Back
                                  </Button> */}
                                  <Button
                                    isLoading={isLoading}
                                    onClick={nextStep}
                                  >
                                    Next
                                  </Button>
                                </HStack>
                              </Stack>
                            </>
                          </StepContent>
                        </Step>
                      );
                      break;
                    case ScheduleChecklistItem.ConfirmMembership:
                      return (
                        <Step key={step} title={`Confirm Free Membership`}>
                          <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                              <Text>
                                Join{" "}
                                <Text fontWeight="medium" as="span">
                                  {vm.scheduleTitle}
                                </Text>{" "}
                                and unlock members-only content.
                              </Text>
                              <HStack>
                                <Button
                                  onClick={prevStep}
                                  isDisabled={activeStep == 0}
                                  variant="ghost"
                                >
                                  Back
                                </Button>
                                <Button
                                  isLoading={isLoading}
                                  onClick={confirmMembership}
                                >
                                  Confirm
                                </Button>
                              </HStack>
                            </Stack>
                          </StepContent>
                        </Step>
                      );

                    case ScheduleChecklistItem.DownloadApp:
                      return (
                        <Step
                          key={step}
                          title="Download the iOS app (optional)"
                        >
                          <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                              <Text fontSize="lg">
                                Access this schedule on SuperFit for{" "}
                                <Link
                                  fontWeight="semibold"
                                  target="javascript:void();"
                                  color="#4abf85"
                                  href="https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126"
                                >
                                  iPhone, iPad and Mac
                                </Link>
                                .
                              </Text>
                              <Text fontSize="md" as="span">
                                (Also— use the same email you signed in with
                                here 👍)
                              </Text>
                              <HStack>
                                <Button onClick={prevStep} variant="ghost">
                                  Back
                                </Button>
                                <Button
                                  onClick={nextStep}
                                  isLoading={isLoading}
                                >
                                  Next
                                </Button>
                              </HStack>
                            </Stack>
                          </StepContent>
                        </Step>
                      );
                  }
                })}
              </Steps>
              {activeStep === steps.length && (
                <HStack py="16" spacing="4" shouldWrapChildren>
                  <Text>All steps completed - you&apos;re finished 🎉</Text>
                  <Button
                    onClick={prevStep}
                    variant="link"
                    verticalAlign="baseline"
                  >
                    Back
                  </Button>
                </HStack>
              )}
            </Box>
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

    var props: CheckoutScheduleProps = null;

    props = {
      scheduleId: scheduleId as string,
    };

    return {
      props: props,
    };
  },
});
