import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  StackProps,
  Box,
  Center,
} from "@chakra-ui/react";
import * as React from "react";

export interface ListItemProps extends StackProps {
  title: string;
  subTitle: string;
  icon?: React.ReactElement;
  isLastItem?: boolean;
}

export const ListItem = (props: ListItemProps) => {
  const { title, subTitle, icon, isLastItem, children, ...stackProps } = props;

  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Center
          bg={useColorModeValue("primaryAlpha.800", "primaryAlpha.500")}
          width="40px"
          height="40px"
          boxShadow="lg"
          rounded="lg"
          color={useColorModeValue("white", "black")}
        >
          {icon}
        </Center>
        {!isLastItem && (
          <Flex
            flex="1"
            borderRightColor="primaryAlpha.200"
            borderRightWidth="4px"
            mb="-12"
          ></Flex>
        )}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold">
            {title}
          </Heading>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {subTitle}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  );
};
