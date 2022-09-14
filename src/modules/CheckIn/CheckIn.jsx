import { Center, Stack, VStack } from "@chakra-ui/react";
import HowItWorks from "components/HowItWorks/HowItWorks";
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
    pin,
    setPin,
    handleSubmitPin,
    showScanning,
    workspaceServices,
    handleSubmitService,
    isCheckingIn,
    forgotPinDisclosure,
    handleRequestPin,
  } = useCheckInHook();

  return (
    <Center bg="gray.50" minH="100vh" pt={[6, 12]} pb={[16, 20]}>
      <VStack w="full" spacing={6}>
        <Logo maxW={81} />

        <VStack>
          <HowItWorks />

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
                <ScanQR
                  handleScanResult={handleScanResult}
                  showScanning={showScanning}
                />
              )}

              {stage === "CONFIRM_PIN" && (
                <ConfirmPin
                  workspace={workspace}
                  pin={pin}
                  setPin={setPin}
                  handleSubmitPin={handleSubmitPin}
                  forgotPinDisclosure={forgotPinDisclosure}
                  handleRequestPin={handleRequestPin}
                />
              )}

              {stage === "CHOOSE_SERVICE" && (
                <ChooseService
                  workspaceServices={workspaceServices}
                  handleSubmitService={handleSubmitService}
                  isCheckingIn={isCheckingIn}
                />
              )}

              {stage === "SHOW_ATTENDANT" && <ShowAttendant />}
            </Stack>
          </VStack>
        </VStack>
      </VStack>
    </Center>
  );
}
