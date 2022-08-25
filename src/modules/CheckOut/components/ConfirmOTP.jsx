import {
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  StackDivider,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function ConfirmOTP({
  workspace,
  otp,
  setOTP,
  handleSubmitOTP,
  isCheckingOut,
}) {
  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <Stack color="blue.800" pb={4} px={6}>
        <Heading textAlign="center" fontSize="2xl">
          Check out of {workspace?.name}
        </Heading>
      </Stack>
      <VStack as="form" onSubmit={handleSubmitOTP} pt={8} px={0}>
        <VStack>
          <Text fontSize="xl" fontWeight={700}>
            Enter OTP
          </Text>
          <Text textAlign="center" color="blue.800">
            An OTP has been sent to Venia Business Hub. Enter the otp to allow
            you check out
          </Text>
        </VStack>

        <HStack pt={97} pb={20} spacing={10}>
          <PinInput
            value={otp}
            onChange={setOTP}
            variant="flushed"
            focusBorderColor="primary.500"
            size="lg"
            type="number"
            mask
            otp
            autoFocus
          >
            {[0, 1, 2, 3].map((index) => (
              <PinInputField
                required
                key={index}
                borderBottom="2px solid"
                borderBottomColor="gray.500"
              />
            ))}
          </PinInput>
        </HStack>

        <Button
          size="lg"
          colorScheme="primary"
          fontWeight={500}
          w={250}
          isLoading={isCheckingOut}
          loadingText="Checking out..."
          h={57}
          type="submit"
        >
          Check Out
        </Button>
      </VStack>
    </Stack>
  );
}
