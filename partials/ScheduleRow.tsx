import { Avatar, Circle } from "@chakra-ui/react";
import * as React from "react";
import { BsPlayFill } from "react-icons/bs";
import Error from "next/error";
import Layout from "@/components/schedule-layout";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
  Img,
  HStack,
  Button,
  Center,
  VStack,
  Spinner,
  AspectRatio,
  Spacer,
} from "@chakra-ui/react";
import { ShowScheduleViewModel } from "@/utils/ViewModels";
import {
  BiArrowBack,
  BiRightArrow,
  BiRightArrowAlt,
  BiRightArrowCircle,
} from "react-icons/bi";

interface ScheduleRowProps {
  scheduleId: string;
  schedulePhotoUrl: string;
  scheduleTitle: string;
  scheduleOwnerDisplayName: string;
  arrowDirection: ArrowDirection;
}

export enum ArrowDirection {
  back = "back",
  forward = "forward",
}

export const ScheduleRow = ({
  scheduleId,
  schedulePhotoUrl,
  scheduleTitle,
  scheduleOwnerDisplayName,
  arrowDirection,
}: ScheduleRowProps) => (
  <HStack
    rounded="xl"
    as="a"
    href={`/s/${scheduleId}`}
    backgroundColor={{ base: "gray.100", md: "inherit" }}
    _hover={{ bg: mode("gray.200", "gray.200") }}
    px="2"
    py="2"
    spacing="4"
  >
    {arrowDirection == ArrowDirection.back && (
      <Center color="gray.500">
        <BiArrowBack />
      </Center>
    )}
    {schedulePhotoUrl && (
      <Avatar
        alt="{author}"
        width="12"
        height="12"
        rounded="full"
        objectFit="cover"
        src={schedulePhotoUrl}
      />
    )}

    <Flex as="button" direction="column" alignItems="flex-start">
      {scheduleTitle && (
        <Text fontStyle="medium" fontWeight="medium">
          {scheduleTitle}
        </Text>
      )}

      {scheduleOwnerDisplayName && (
        <Text color={mode("gray.600", "gray.400")}>
          From @{scheduleOwnerDisplayName}
        </Text>
      )}
    </Flex>
    <Spacer></Spacer>
    {arrowDirection == ArrowDirection.forward && (
      <Center color="gray.500">
        <BiRightArrowAlt />
      </Center>
    )}
  </HStack>
);
