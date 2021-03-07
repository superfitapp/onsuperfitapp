import {
  Box,
  StackProps,
  HStack,
  Img,
  Stack,
  Text,
  Link,
  useColorModeValue,
  VisuallyHidden,
  Center,
} from "@chakra-ui/react";

import * as React from "react";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { TextWithIcon } from "../partials/TextWithIcon";
import { VerifiedBadge } from "../partials/VerifiedBadge";

interface OwnerWithSocialProps extends StackProps {
  image: string;
  name: string;
  role: string;
}

export const OwnerWithSocial = (props: OwnerWithSocialProps) => {
  const { image, name, role, ...rest } = props;
  return (
    <Stack
      spacing={{ base: "8", md: "4" }}
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      align="flex-start"
    >
      <Stack
        direction="row"
        flex="1"
        spacing="3"
        align={{ base: "flex-start", md: "center" }}
      >
        {/* <Img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzU5fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Melinda Turner"
          objectFit="cover"
          rounded="full"
          shadow="md"
          w="12"
          h="12"
        /> */}
        <Box flex="1">
          <Stack
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            mb={{ base: "3", md: "1" }}
            color={useColorModeValue("gray.800", "gray.400")}
            spacing="3"
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <Text
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.500", "gray.200")}
            >
              {name}
            </Text>

            <HStack mt="0" spacing="2">
              <Link
                isExternal
                useColorModeValue={useColorModeValue("blue.600", "blue.300")}
                href=""
              >
                <VisuallyHidden>{`${name}'s Twitter page`}</VisuallyHidden>
                <Center w="40px" h="40px" bg="rgba(0,0,0,0.05)" rounded="full">
                  <FaTwitter aria-hidden />
                </Center>
              </Link>
              <Link
                isExternal
                useColorModeValue={useColorModeValue("blue.600", "blue.300")}
                href=""
              >
                <VisuallyHidden>{`${name}'s Twitter page`}</VisuallyHidden>
                <Center w="40px" h="40px" bg="rgba(0,0,0,0.05)" rounded="full">
                  <FaInstagram aria-hidden />
                </Center>
              </Link>
              <Link
                isExternal
                useColorModeValue={useColorModeValue("blue.600", "blue.300")}
                href=""
              >
                <VisuallyHidden>{`${name}'s Twitter page`}</VisuallyHidden>
                <Center w="40px" h="40px" bg="rgba(0,0,0,0.05)" rounded="full">
                  <FaLinkedinIn aria-hidden />
                </Center>
              </Link>
            </HStack>
            {/* <VerifiedBadge /> */}
          </Stack>
        </Box>
      </Stack>
      {/* <HStack spacing="4">
<Button
  variant="outline"
  leftIcon={<Box as={HiPencil} fontSize="lg" />}
>
  Edit
</Button>
<Button
  colorScheme="blue"
  leftIcon={<Box as={HiCheck} fontSize="lg" />}
>
  Approve
</Button>
</HStack> */}
    </Stack>
  );
};
