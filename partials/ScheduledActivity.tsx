import * as React from "react";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  AspectRatio,
  Stack,
  Center,
} from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import { StackProps } from "@chakra-ui/react";

interface ScheduledActivityProps extends StackProps {
  image: string;
  name: string;
  role: string;
}

export const ScheduledActivity = () => {
  return (
    <Stack
      align={{ base: "center", md: "normal" }}
      direction={{ base: "row", md: "column" }}
      rounded="md"
      spacing="0"
      flex="1"
    >
      <AspectRatio minWidth="150px" ratio={16 / 9}>
        <Image
          objectFit="cover"
          borderRadius="sm"
          src="https://bit.ly/2k1H1t6"
        />
      </AspectRatio>
      {/* </Center> */}

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
        <Text mt={2} fontSize="lg" fontWeight="regular" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
      </Box>
    </Stack>
  );
};
