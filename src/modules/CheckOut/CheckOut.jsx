import { Center, Stack, VStack } from "@chakra-ui/react";
import { Logo } from "components/Logo";
import ChooseService from "./components/ChooseService";
import ConfirmPin from "./components/ConfirmPin";
import ShowConfirmation from "./components/ShowConfirmation";
import Summary from "./components/Summary";
import useCheckOutHook from "./useCheckOutHook";

export default function CheckIn() {
  const {
    stage,
    workspace,
    currentCheckIn,
    currentUserPlan,
    currentTeamPlan,
    pin,
    setPin,
    method,
    setMethod,
    handleSubmitMethod,
    handleSubmitPin,
    workspaceServices,
    isCheckingOut,
  } = useCheckOutHook();

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
            {stage === "SHOW_SUMMARY" && (
              <Summary
                currentCheckIn={currentCheckIn}
                currentUserPlan={currentUserPlan}
                currentTeamPlan={currentTeamPlan}
                method={method}
                setMethod={setMethod}
                handleSubmitMethod={handleSubmitMethod}
              />
            )}

            {stage === "CONFIRM_PIN" && (
              <ConfirmPin
                workspace={currentCheckIn}
                isCheckingOut={isCheckingOut}
                pin={pin}
                setPin={setPin}
                handleSubmitPin={handleSubmitPin}
              />
            )}

            {stage === "SHOW_CONFIRMATION" && <ShowConfirmation />}
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}
