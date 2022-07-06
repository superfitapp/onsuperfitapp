import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { NavLink } from "./NavLink";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { FIRScheduleMember } from "@superfitapp/superfitjs";
import { isPayingMember } from "@/utils/schedule-member";

interface GuestHeaderNavProps {
  canJoin: boolean;
  scheduleId?: string;
  hideHeaderMobile: boolean;
  scheduleMember?: FIRScheduleMember;
}

export const GuestHeaderNav = ({
  canJoin,
  scheduleId,
  hideHeaderMobile = false,
  scheduleMember,
}: GuestHeaderNavProps) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const login = async () => {
    try {
      if (typeof window !== "undefined") {
        if (router.asPath != "/") {
          router.push(`/api/auth/login?returnTo=${router.asPath}`);
          return
        }
      }
      // default
      router.push("/api/auth/login");
    } catch (error) {
      //
    }
  };

  var memberStatus = "Test"
  if (scheduleMember) {
    memberStatus = isPayingMember(scheduleMember) ? "Premium" : scheduleMember.memberRole
  }

  return (
    <Box
      visibility={{
        base: hideHeaderMobile ? "hidden" : "inherit",
        sm: "inherit",
      }}
      as="header"
      bg={mode("white", "gray.800")}
      rounded="2xl"
      borderWidth="1px"
      borderColor="gray.100"
      mx={{ base: "2", md: "0" }}
      boxShadow="sm"
    >
      <Box maxW="7xl" mx="auto" py="2" px={{ base: "2", md: "6" }}>
        <Flex as="nav" justify="space-between">
          <HStack spacing="2">
            <Image
              src="https://superfitapp.com/img/brand.svg"
              alt="SuperFit Logo Mark"
              height="45"
              width="45"
            />
            <NavLink.Desktop fontWeight="semibold" href="/">
              <Heading size="sm">Built on SuperFit</Heading>
            </NavLink.Desktop>
          </HStack>

          {isLoading && (
            <Button
              color={mode("gray.500", "gray.200")}
              as={Button}
              variant="ghost"
              loading={isLoading.toString()}
            ></Button>
          )}

          {!user && !isLoading && (
            <HStack spacing="3" display="flex">
              <Button
                onClick={login}
                variant="ghost"
                color={mode("gray.500", "gray.200")}
                rounded="2xl"
              >
                Log in
              </Button>
              {canJoin && (
                <Button
                  display={{ base: "none", md: "block" }}
                  onClick={() => {
                    router.push(`/s/${scheduleId}/join`);
                  }}
                  color="primaryAlpha.800"
                  variant="ghost"
                  rounded="lg"
                >
                  Join
                </Button>
              )}
            </HStack>
          )}

          {user && (
            <Flex zIndex={99}>
              <Menu placement="bottom-end">
                <MenuButton
                  color={mode("gray.600", "gray.200")}
                  as={Button}
                  variant="ghost"
                  leftIcon={
                    <Avatar
                      borderColor={mode("gray.500", "inherit")}
                      size="sm"
                      name={`Avatar of ${user.name || user.nickname}`}
                      src={user.picture}
                    />
                  }
                >
                  <Center justifyItems="center">
                    {scheduleMember && (
                      <Badge
                        py="1"
                        px="1"
                        variant="subtle"
                        color={mode("gray.600", "gray.200")}
                      >
                        <Text textTransform="uppercase" size="xs">
                          {memberStatus}
                        </Text>
                      </Badge>
                    )}
                  </Center>
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/api/auth/logout");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
