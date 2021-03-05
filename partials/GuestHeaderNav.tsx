import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { NavLink } from "./NavLink";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export const GuestHeaderNav = () => {
  const { user, error, isLoading } = useUser();
  const userLoading = isLoading;
  const router = useRouter();

  const login = async () => {
    try {
      if (typeof window !== "undefined") {
        if (router.asPath != "/") {
          localStorage.setItem("returnTo", router.asPath);
        }
      }
      router.push("/api/auth/login");
    } catch (error) {
      //
    }
  };

  return (
    <Box
      as="header"
      bg={mode("white", "gray.800")}
      rounded="2xl"
      borderWidth="1px"
      borderColor="gray.100"
      mx={{ base: "2", md: "0" }}
      boxShadow="sm"
    >
      <Box maxW="7xl" mx="auto" py="2" px={{ base: "6", md: "8" }}>
        <Flex as="nav" justify="space-between">
          <HStack spacing="4">
            <Image
              src="https://superfitapp.com/img/brand.svg"
              alt="SuperFit Logo Mark"
              className="avatar-img rounded-circle"
              height="45"
              width="45"
            />
            <NavLink.Desktop href="https://superfitapp.com">
              Built on SuperFit
            </NavLink.Desktop>
          </HStack>

          {userLoading && (
            <Button
              color={mode("gray.600", "gray.200")}
              as={Button}
              variant="ghost"
              loading={userLoading.toString()}
            ></Button>
          )}

          {!user && !userLoading && (
            <HStack spacing="3" display={{ base: "none", md: "flex" }}>
              <Button
                onClick={login}
                variant="ghost"
                color={mode("gray.500", "gray.200")}
                rounded="2xl"
              >
                Log in
              </Button>
              <Button onClick={login} colorScheme="blue" rounded="2xl">
                Join
              </Button>
            </HStack>
          )}

          {user && (
            <Flex align="center">
              <Menu placement="bottom-end">
                <MenuButton
                  color={mode("gray.600", "gray.200")}
                  as={Button}
                  variant="ghost"
                  leftIcon={
                    <Avatar size="sm" name="Dan Abrahmov" src={user.picture} />
                  }
                >
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem onClick={() => router.push("/api/auth/logout")}>
                      Logout
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
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
