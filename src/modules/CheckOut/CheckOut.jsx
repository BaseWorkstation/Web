import { Button, Center, Stack, Text, VStack } from "@chakra-ui/react";
import { Logo } from "components/Logo";
import Link from "next/link";
import ChooseService from "./components/ChooseService";
import ConfirmOTP from "./components/ConfirmOTP";
import ConfirmPin from "./components/ConfirmPin";
import ShowConfirmation from "./components/ShowConfirmation";
import Summary from "./components/Summary";
import useCheckOutHook from "./useCheckOutHook";

export default function CheckIn() {
  const {
    stage,
    checkoutDetails,
    currentCheckIn,
    currentUserPlan,
    currentTeamPlan,
    pin,
    setPin,
    method,
    setMethod,
    handleSubmitMethod,
    handleSubmitPin,
    isConfirmingOTP,
    handleSubmitOTP,
    isCheckedIn,
    isCheckingOut,
  } = useCheckOutHook();

  if (!isCheckedIn)
    return (
      <Center flexDir="column" minH="100vh">
        <Text mb={4}>You are currently not checked in to any space</Text>
        <Link href="/check-in">
          <Button size="lg" colorScheme="primary">
            Check in now
          </Button>
        </Link>
      </Center>
    );

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
            {stage === "CONFIRM_PIN" && (
              <ConfirmPin
                workspace={currentCheckIn?.workstation}
                isCheckingOut={isCheckingOut}
                pin={pin}
                setPin={setPin}
                handleSubmitPin={handleSubmitPin}
              />
            )}

            {stage === "SHOW_SUMMARY" && (
              <Summary
                checkoutDetails={checkoutDetails}
                currentCheckIn={currentCheckIn}
                currentUserPlan={currentUserPlan}
                currentTeamPlan={currentTeamPlan}
                method={method}
                setMethod={setMethod}
                handleSubmitMethod={handleSubmitMethod}
              />
            )}

            {stage === "CONFIRM_OTP" && (
              <ConfirmOTP
                checkoutDetails={checkoutDetails}
                isConfirmingOTP={isConfirmingOTP}
                handleSubmitOTP={handleSubmitOTP}
              />
            )}

            {stage === "SHOW_CONFIRMATION" && <ShowConfirmation />}
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}
