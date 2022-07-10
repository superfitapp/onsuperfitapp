import Layout from "@/components/schedule-layout";
import getStripe from "@/utils/stripe";
import { Center, Fade, Spinner, useBreakpointValue } from "@chakra-ui/react";

import { Box, useColorModeValue as mode } from "@chakra-ui/react";

import * as React from "react";
import {
  createShowScheduleViewModel
} from "@/utils/ViewModels";
import Error from "next/error";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { ShowFIRScheduleResponse } from "@/lib/db-public";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CheckoutResponse } from "@/lib/checkout-response";
import { fetchShowSchedule } from "@/lib/schedule";

export interface CheckoutScheduleProps {
  scheduleId: string;
}

export default function CheckoutSchedule(
  props: CheckoutScheduleProps,
  notFound: boolean
) {
  if (!props.scheduleId && notFound == true) {
    if (notFound) {
      return <Error statusCode={404} />;
    }
  }

  const {
    data: response,
    error,
    isValidating,
  } = useSWR<CheckoutResponse>(
    `/api/schedule/${props.scheduleId}/checkout`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  if (
    // false &&
    response &&
    response.type == "checkout" &&
    response.sessionId &&
    response.connectStripeAccountId
  ) {
    getStripe(response.connectStripeAccountId)
      .then((stripe) => {
        stripe
          .redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as argument here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.sessionId,
          })
          .then(function (result) {
            // this.joinSchedulePaidLoading = false;
            // this.errorMessage = result.error.message;
            if (result.error) {
              throw result.error;
            }
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
          });
      })
      .catch((error) => {
        console.log(error);
        return <Error statusCode={404} />;
      });
  }

  return (
    <>
      <Layout canJoin={false} scheduleId={null} hideHeaderMobile={true}>
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

    let data = await fetchShowSchedule({
      scheduleId: scheduleId as string,
      fetchRecentActivities: false,
      userId: session?.user?.sub,
    });

    var props: CheckoutScheduleProps = null;

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

    var props: CheckoutScheduleProps = {
      scheduleId: scheduleId as string,
    };

    return {
      props: props,
    };
  },
});
