import * as React from "react";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  AspectRatio,
  Stack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { StackProps } from "@chakra-ui/react";
import { FIRActivity, ShowFIRSchedule } from "@superfitapp/superfitjs";
import { createShowActivityViewModel } from "@/utils/view-models";
import { ShowFIRActivityResponse } from "@/lib/db-public";

interface ScheduledActivityProps extends StackProps {
  activity: FIRActivity;
  schedule: ShowFIRSchedule;
}

export const ScheduledActivity = (props: ScheduledActivityProps) => {
  const x: ShowFIRActivityResponse = {
    activity: props.activity,
    schedule: props.schedule,
  };

  const vm = createShowActivityViewModel(x);
  const scheduleId = props.activity.scheduleInfo.id;
  const path = `/s/${scheduleId}/a/${props.activity.id}`;

  return (
    <LinkBox>
      <Stack
        align={{ base: "center", md: "normal" }}
        direction={{ base: "row", md: "column" }}
        rounded="md"
        spacing={{ base: "4", md: "0" }}
        flex="1"
      >
        <AspectRatio minWidth="150px" ratio={16 / 9}>
          <Image objectFit="cover" borderRadius="sm" src={vm.thumbnailUrl} />
        </AspectRatio>
        <Box>
          {/* Tags */}
          <Flex align="baseline" mt={2}>
            <Badge colorScheme="pink">Plus</Badge>
            <Text
              ml={2}
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="pink.800"
            >
              Verified &bull; Cape Town
            </Text>
          </Flex>
          <LinkOverlay href={path}>
            <Text mt={2} fontSize="lg" fontWeight="regular" lineHeight="short">
              {vm.title}
            </Text>
          </LinkOverlay>
        </Box>
      </Stack>
    </LinkBox>
  );
};
