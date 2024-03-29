import { Box } from "@chakra-ui/react";
import { GuestHeaderNav } from "../partials/GuestHeaderNav";
import { ChakraProvider } from "@chakra-ui/react";
import { FIRScheduleMember } from "@superfitapp/superfitjs";

interface ScheduleLayoutProps {
  canJoin: boolean;
  scheduleId?: string;
  hideHeaderMobile?: boolean;
  scheduleMember?: FIRScheduleMember;
  userTheme?: any;
  children: any;
}

function ScheduleLayout({
  canJoin,
  scheduleId,
  hideHeaderMobile = false,
  scheduleMember,
  userTheme,
  children,
}: ScheduleLayoutProps) {
  return (
    <ChakraProvider theme={userTheme}>
      <Box
        mx="auto"
        maxW={{ base: "xl", md: "4xl" }}
        py={{ base: "4", md: "6" }}
      >
        <GuestHeaderNav
          canJoin={canJoin}
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
