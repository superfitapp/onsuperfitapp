import "iframe-resizer/js/iframeResizer.contentWindow";
import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { BigMedia } from "../../partials/BigMedia";
import { OwnerWithSocial } from "../../partials/OwnerWithSocial";
import { ScheduledActivity } from "../../partials/ScheduledActivity";
import { ShowFIRScheduleResponse } from "../../lib/db-public";
import {
  createShowScheduleViewModel,
  ShowScheduleViewModel,
} from "../../utils/ViewModels";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FIRActivity } from "@superfitapp/superfitjs";
import { fetchShowSchedule } from "@/lib/schedule";
import { routerLoading } from "@/utils/router-loading";
import { useRouter } from "next/router";
import { BiRightArrowAlt } from "react-icons/bi";
import SchedulePage, { ScheduleProps } from "pages/s/[scheduleId]";

// This function gets called at build time
export async function getStaticPaths() {
  // don't prerender any schedule pages
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { scheduleId } = params;
  var props: ScheduleProps | undefined = null;

  if (!scheduleId) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  var data = await fetchShowSchedule({
    scheduleId: scheduleId,
    fetchRecentActivities: true,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  props = {
    scheduleId: scheduleId,
    data: data,
  };

  return {
    props: props,
    notFound: false,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

const EmbeddedSchedule = (props: ScheduleProps) => {
  return (
    <SchedulePage
      scheduleId={props?.scheduleId}
      data={props?.data}
    ></SchedulePage>
  );
};

export default EmbeddedSchedule;
