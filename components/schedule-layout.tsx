import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { ChakraProvider } from "@chakra-ui/react";
import { FIRScheduleMember } from "@superfitapp/superfitjs";

interface ScheduleLayoutProps {
  scheduleId?: string;
  hideHeaderMobile?: boolean;
  scheduleMember?: FIRScheduleMember;
  children: any;
}

function ScheduleLayout({
  scheduleId,
  hideHeaderMobile = false,
  scheduleMember,
  children,
}: ScheduleLayoutProps) {
  return (
    <ChakraProvider>
      <Box
        mx="auto"
        maxW={{ base: "xl", md: "4xl" }}
        py={{ base: "4", md: "6" }}
      >
        <GuestHeaderNav
          hideHeaderMobile={hideHeaderMobile}
          scheduleId={scheduleId}
          scheduleMember={scheduleMember}
        ></GuestHeaderNav>
        <main>{children}</main>
      </Box>
    </ChakraProvider>
  );
}

export default ScheduleLayout;
