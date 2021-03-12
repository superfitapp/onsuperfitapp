import * as React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  LinkBox,
  LinkOverlay,
  chakra,
  AspectRatio,
  Center,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { StackProps } from "@chakra-ui/react";
import { FIRActivity, ShowFIRSchedule } from "@superfitapp/superfitjs";
import { createShowActivityViewModel } from "@/utils/ViewModels";
import { ShowFIRActivityResponse } from "@/lib/db-public";
import NextImage from "./NextImage";
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
        {vm.thumbnailUrl && (
          <AspectRatio ratio={16 / 9} minW={{ base: "150px", md: "auto" }}>
            <NextImage
              src={vm.thumbnailUrl}
              borderRadius="sm"
              w="auto"
              h="auto"
              layout="fill"
              objectFit="cover"
            />
          </AspectRatio>
        )}

        <Box>
          {/* Tags */}
          <HStack align="baseline" mt={2} spacing="1">
            <Text fontSize="xs" fontWeight="semibold" color="gray.500">
              {vm.scheduledDateRelative || ""}
            </Text>
            <HStack
              align="baseline"
              justify="flex-start"
              fontSize="xs"
              color={useColorModeValue("gray.600", "gray.300")}
            >
              <Center
                bg="rgba(0,0,0,0.05)"
                rounded="lg"
                py="0"
                px="2"
                fontSize="xs"
              >
                <Text fontSize="xs" fontWeight="semibold">
                  {vm?.activityType}
                </Text>
              </Center>
            </HStack>
          </HStack>
          <LinkOverlay href={path}>
            <Text mt={1} fontSize="lg" fontWeight="regular" lineHeight="short">
              {vm.title}
            </Text>
          </LinkOverlay>

          {/* <HStack
            align="baseline"
            justify="flex-start"
            fontSize="xs"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            <Center
              bg="rgba(0,0,0,0.05)"
              rounded="lg"
              py="1"
              px="2"
              fontSize="xs"
            >
              <Text
                // textTransform="uppercase"
                fontSize="xs"
                fontWeight="semibold"
              >
                {vm?.activityType}
              </Text>
            </Center>
          </HStack> */}
        </Box>
      </Stack>
    </LinkBox>
  );
};
