import {
  Box,
  StackProps,
  HStack,
  Stack,
  Text,
  Link,
  useColorModeValue,
  VisuallyHidden,
  Center,
} from "@chakra-ui/react";
import { ScheduleProfile } from "@superfitapp/superfitjs";

import * as React from "react";
import { BiLink } from "react-icons/bi";
import { FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

import { SiInstagram, SiTiktok } from "react-icons/si";

interface OwnerWithSocialProps extends StackProps {
  name?: string;
  iconColor: string;
  profile?: ScheduleProfile;
}

export const OwnerWithSocial = (props: OwnerWithSocialProps) => {
  const { name, profile, iconColor, ...rest } = props;

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
        <Box flex="1">
          <Stack
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            mb={{ base: "3", md: "1" }}
            color={useColorModeValue("gray.800", "gray.400")}
            spacing="3"
            alignItems="center"
          >
            {name && (
              <Text
                fontSize="md"
                fontWeight="medium"
                color={useColorModeValue("gray.500", "gray.200")}
              >
                Created by {name}
              </Text>
            )}

            <HStack mt="0" spacing="2">
              {profile?.email && (
                <Link
                  isExternal
                  color={iconColor}
                  href={`mailto:${profile?.email}`}
                >
                  <VisuallyHidden>{`${name}'s email`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <HiMail aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.twitterUsername && (
                <Link
                  isExternal
                  color={iconColor}
                  href={`https://twitter.com/${profile?.twitterUsername}`}
                >
                  <VisuallyHidden>{`${name}'s Twitter page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <FaTwitter aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.youtubeUrl && (
                <Link isExternal color={iconColor} href={profile?.youtubeUrl}>
                  <VisuallyHidden>{`${name}'s YouTube page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <FaYoutube aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.instagramUsername && (
                <Link
                  isExternal
                  color={iconColor}
                  href={`https://instagram.com/${profile?.instagramUsername}`}
                >
                  <VisuallyHidden>{`${name}'s Instagram page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <SiInstagram aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.tiktokUsername && (
                <Link
                  isExternal
                  color={iconColor}
                  href={`https://www.tiktok.com/@${profile?.tiktokUsername}`}
                >
                  <VisuallyHidden>{`${name}'s TikTok page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <SiTiktok aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.linkedinUsername && (
                <Link
                  isExternal
                  color={iconColor}
                  href={`https://linkedin.com/in/${profile?.linkedinUsername}`}
                >
                  <VisuallyHidden>{`${name}'s LinkedIn page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <FaLinkedin aria-hidden />
                  </Center>
                </Link>
              )}
              {profile?.websiteUrl && (
                <Link isExternal color={iconColor} href={profile?.websiteUrl}>
                  <VisuallyHidden>{`Custom website/personal page`}</VisuallyHidden>
                  <Center
                    w="40px"
                    h="40px"
                    bg="rgba(0,0,0,0.05)"
                    rounded="full"
                  >
                    <BiLink aria-hidden />
                  </Center>
                </Link>
              )}
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
