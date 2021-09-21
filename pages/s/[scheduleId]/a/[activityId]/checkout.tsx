import Layout from "@/components/schedule-layout";
import getStripe from "@/utils/stripe";
import { Center, Spinner } from "@chakra-ui/react";
import { Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import Error from "next/error";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { CheckoutResponse } from "@/lib/checkout-response";

export interface CheckoutActivityProps {
  scheduleId: string;
  activityId: string;
  tipAmount?: string;
}

export default function CheckoutActivity(
  props: CheckoutActivityProps,
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
    props.tipAmount
      ? `/api/schedule/${props.scheduleId}/activity/${props.activityId}/checkout?tipAmount=${props.tipAmount}`
      : `/api/schedule/${props.scheduleId}/activity/${props.activityId}/checkout`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  if (
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
            if (result.error) {
              throw result.error;
            }
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
          });
      })
      .catch((error) => {
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

export async function getServerSideProps({
  params,
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  {
    const session = getSession(req, res);

    const { scheduleId, activityId } = params;

    if (!scheduleId || !activityId) {
      return {
        notFound: true,
      };
    }

    var props: CheckoutActivityProps = {
      scheduleId: scheduleId as string,
      activityId: activityId as string,
      tipAmount: (query.tipAmount as string) || null,
    };

    return {
      props: props,
    };
  }
}
