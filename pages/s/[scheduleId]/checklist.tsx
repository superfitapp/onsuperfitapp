import Layout from "@/components/schedule-layout";
import { StringOrNumber } from "@chakra-ui/utils";

import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  Fade,
  HStack,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import * as React from "react";
import {
  createShowScheduleViewModel,
  ShowScheduleViewModel,
} from "@/utils/ViewModels";
import Error from "next/error";
import { ArrowDirection, ScheduleRow } from "@/partials/ScheduleRow";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { fetchShowSchedule } from "@/lib/schedule";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Steps } from "@/partials/steps/Steps";
import { Step } from "@/partials/steps/Step";
import { StepContent } from "@/partials/steps/StepContent";
import { useSteps } from "@/partials/steps/useSteps";

export interface JoinScheduleProps {
  scheduleId: string;
  vm: ShowScheduleViewModel;
}

export default function ScheduleChecklist(
  props: JoinScheduleProps,
  notFound: boolean
) {
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

  if (!props.vm && notFound == true) {
    if (notFound) {
      return <Error statusCode={404} />;
    }
  }

  const scheduleTitle = props.vm?.scheduleTitle;
  const schedulePhotoUrl = props.vm?.photoUrl;
  const scheduleId = props.vm?.scheduleId;
  const scheduleOwnerDisplayName = props.vm?.ownerDisplayName;

  const [currentOption, setCurrentOption] = React.useState<
    StringOrNumber | undefined
  >(null);

  return (
    <>
      <Layout scheduleId={null} hideHeaderMobile={true}>
        <Box as="section" py={{ base: "2", md: "8" }}>
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
                          {props.vm.scheduleTitle}
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

    props = {
      scheduleId: scheduleId as string,
      vm: vm,
    };

    return {
      props: props,
    };
  },
});
