import { Center, Stack, VStack } from "@chakra-ui/react";
import { Logo } from "components/Logo";
import ChooseService from "./components/ChooseService";
import ConfirmPin from "./components/ConfirmPin";
import ScanQR from "./components/ScanQR";
import ShowAttendant from "./components/ShowAttendant";
import useCheckInHook from "./useCheckInHook";

export default function CheckIn() {
  const {
    stage,
    handleScanResult,
    workspace,
    handleSubmitPin,
    workspaceServices,
    handleSubmitService,
  } = useCheckInHook();

  return (
    <Center bg="gray.50" minH="100vh" py={[16, 20]}>
      <VStack w="full" spacing={16}>
        <Logo />

        <VStack w="full" spacing={8}>
          <Stack
            w="full"
            maxW={["full", "sm"]}
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            rounded={20}
            pt={9}
            pb={6}
          >
            {stage === "SCAN_QR" && (
              <ScanQR handleScanResult={handleScanResult} />
            )}

            {stage === "CONFIRM_PIN" && (
              <ConfirmPin
                workspace={workspace}
                handleSubmitPin={handleSubmitPin}
              />
            )}

            {stage === "CHOOSE_SERVICE" && (
              <ChooseService
                workspaceServices={workspaceServices}
                handleSubmitService={handleSubmitService}
              />
            )}

            {stage === "SHOW_ATTENDANT" && <ShowAttendant />}
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}