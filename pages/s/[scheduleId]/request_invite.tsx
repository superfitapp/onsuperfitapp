import Layout from "@/components/schedule-layout";
import { Center, Spinner } from "@chakra-ui/react";

import { Box, useColorModeValue as mode } from "@chakra-ui/react";

import * as React from "react";
import {
    createShowScheduleViewModel
} from "@/utils/ViewModels";
import Error from "next/error";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { fetchShowSchedule } from "@/lib/schedule";

export interface RequestInviteProps {
    scheduleId: string;
}

export default function RequestInviteSchedule(
    props: RequestInviteProps,
    notFound: boolean
) {
    if (!props.scheduleId && notFound == true) {
        if (notFound) {
            return <Error statusCode={404} />;
        }
    }

    // Do nothing, wait to redirect.

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
        if (!scheduleId || !session?.user?.sub) {
            return {
                notFound: true,
            };
        }

        const data = await fetchShowSchedule({
            scheduleId: scheduleId as string,
            fetchRecentActivities: true,
        });

        const vm = createShowScheduleViewModel(
            scheduleId as string,
            data.schedule,
            data.scheduleMember
        );

        if (vm?.userIsPaidMember) {
            return {
                props: {},
                redirect: {
                    permanent: true,
                    destination: `/s/${scheduleId}`,
                },
            };
        }

        await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/request_invite_to_schedule`, {
            method: "POST",
            body: JSON.stringify({
                scheduleId: scheduleId
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            })
        });

        return {
            props: {},
            redirect: {
                permanent: true,
                destination: `/s/${scheduleId}`,
            },
        };
    },
});
