import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { ChakraProvider } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";
import fetcher from "@/utils/fetcher";
import firebase from "@/lib/firebase";
import { useEffect } from "react";

interface ScheduleLayoutProps {
  scheduleId?: string;
  children: any;
}

function ScheduleLayout({ children, scheduleId }: ScheduleLayoutProps) {
  return (
    <ChakraProvider>
      <Box
        mx="auto"
        maxW={{ base: "xl", md: "4xl" }}
        py={{ base: "4", md: "6" }}
      >
        <GuestHeaderNav scheduleId={scheduleId}></GuestHeaderNav>
        <main>{children}</main>
      </Box>
    </ChakraProvider>
  );
}

export default ScheduleLayout;
