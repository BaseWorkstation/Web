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
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ConfirmOTP({
  checkoutDetails,
  handleSubmitOTP,
  isConfirmingOTP,
}) {
  const [otp, setOTP] = useState("");

  const onSubmitOTP = async (event) => {
    event.preventDefault();
    handleSubmitOTP(otp);
  };

  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <Stack color="blue.800" pb={4} px={6}>
        <Heading textAlign="center" fontSize="2xl">
          Confirm Payment
        </Heading>
      </Stack>
      <VStack as="form" onSubmit={onSubmitOTP} pt={8} px={4}>
        <VStack>
          <Text fontSize="xl" fontWeight={700}>
            Enter OTP
          </Text>
          <Text textAlign="center" color="blue.800">
            An OTP has been sent to {checkoutDetails?.workstation?.name}. Enter
            the otp to allow you check out
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
          isLoading={isConfirmingOTP}
          loadingText="Checking..."
          h={57}
          type="submit"
        >
          Confirm OTP
        </Button>
      </VStack>
    </Stack>
  );
}
