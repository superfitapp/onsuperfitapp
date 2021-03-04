import {
  Box,
  chakra,
  Flex,
  HTMLChakraProps,
  Icon,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface DesktopNavLinkProps extends HTMLChakraProps<"a"> {
  href: string;
}

const DesktopNavLink = (props: DesktopNavLinkProps) => {
  const { href, ...rest } = props;
  return (
    <chakra.a
      href={href}
      fontWeight="semibold"
      fontSize="md"
      color={mode("gray.400", "gray.100")}
      {...rest}
      _activeLink={{
        color: mode("blue.600", "blue.300"),
        fontWeight: "bold",
      }}
    />
  );
};

interface MobileNavLinkProps {
  icon: React.ElementType;
  children: React.ReactNode;
  href?: string;
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  const { icon, children, href } = props;
  return (
    <Flex
      as="a"
      href={href}
      m="-3"
      p="3"
      align="center"
      rounded="md"
      cursor="pointer"
      _hover={{ bg: mode("gray.50", "gray.600") }}
    >
      <Icon as={icon} color={mode("blue.600", "blue.400")} fontSize="xl" />
      <Box marginStart="3" fontWeight="medium">
        {children}
      </Box>
    </Flex>
  );
};

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
};
