import { Avatar, BoxProps, Circle, StackProps } from "@chakra-ui/react";
import * as React from "react";
import {
  Box,
  Text,
  useColorModeValue as mode,
  Flex,
  Grid,
  Heading,
  Img,
  HStack,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";

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
        width="12"
        height="12"
        rounded="full"
        objectFit="cover"
        src={schedulePhotoUrl}
      />
    )}

    <Flex as="button" flexDirection="column">
      {scheduleTitle && (
        <Heading
          color={mode("gray.700", "gray.600")}
          fontSize="md"
          fontWeight="medium"
          // align="start"
          alignContent="start"
          noOfLines={{ base: 1, sm: 2 }}
        >
          {scheduleTitle}
        </Heading>
      )}

      {scheduleOwnerDisplayName && (
        <Text
          color={mode("gray.600", "gray.400")}
          fontSize="sm"
          align="start"
          noOfLines={{ base: 1, sm: 2 }}
        >
          From {scheduleOwnerDisplayName}
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
