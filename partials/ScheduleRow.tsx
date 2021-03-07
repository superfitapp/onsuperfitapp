import { Avatar, BoxProps, Circle, StackProps } from "@chakra-ui/react";
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

interface ScheduleRowProps extends StackProps {
  scheduleId: string;
  schedulePhotoUrl: string;
  scheduleTitle: string;
  scheduleOwnerDisplayName: string;
  arrowDirection: ArrowDirection;
  hideTitleOnSmall?: boolean;
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
  hideTitleOnSmall,
  ...rest
}: ScheduleRowProps) => (
  <HStack
    rounded="xl"
    as="a"
    href={`/s/${scheduleId}`}
    _hover={{ bg: mode("gray.200", "gray.300") }}
    py="2"
    spacing="4"
    {...rest}
  >
    {arrowDirection == ArrowDirection.back && (
      <Center color="gray.500">
        <BiArrowBack />
      </Center>
    )}
    {schedulePhotoUrl && (
      <Avatar
        display={{ base: hideTitleOnSmall ? "none" : "inherit", sm: "inherit" }}
        alt="{author}"
        width="12"
        height="12"
        rounded="full"
        objectFit="cover"
        src={schedulePhotoUrl}
      />
    )}

    <Flex as="button" flexDirection="column">
      {scheduleTitle && (
        <Text fontWeight="medium" align="start" noOfLines={{ base: 1, sm: 2 }}>
          {scheduleTitle}
        </Text>
      )}

      {scheduleOwnerDisplayName && (
        <Text
          color={mode("gray.600", "gray.400")}
          align="start"
          noOfLines={{ base: 1, sm: 2 }}
        >
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
