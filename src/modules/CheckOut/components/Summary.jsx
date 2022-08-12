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
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Summary({
  currentCheckIn,
  currentUserPlan,
  currentTeamPlan,
  method,
  setMethod,
  handleSubmitMethod,
}) {
  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <Stack color="blue.800" pb={4} px={6}>
        <Heading textAlign="center" fontSize="2xl">
          Summary
        </Heading>
      </Stack>
      <VStack pt={8} px={0}>
        <Stack spacing={18} w="full" px={4}>
          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Base Name:
            </Text>
            <Text fontWeight={500}>{currentCheckIn?.name}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Location:
            </Text>
            <Text fontWeight={500}> 12, Adeniyi jones Av, Ikeja, Lagos</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Total Time Used:
            </Text>
            <Text fontWeight={500}> 01:00:05</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Amount:
            </Text>
            <Text fontWeight={500}> 2,500 ( N50/hr)</Text>
          </HStack>

          <Stack pt={6} pb={8}>
            <Text fontSize={20} fontWeight="bold" color="primary.500">
              Payment Methods
            </Text>

            <RadioGroup onChange={setMethod} value={method}>
              <Stack spacing={5}>
                <Radio size="lg" value="PAYG_cash">
                  Cash
                </Radio>
                {/* {currentUserPlan && (
                  <Radio size="lg" value="plan">
                    Plan Payment
                  </Radio>
                )}
                {currentTeamPlan && (
                  <Radio size="lg" value="team">
                    Team Payment
                  </Radio>
                )} */}
              </Stack>
            </RadioGroup>
          </Stack>
        </Stack>
        <Button
          size="lg"
          colorScheme="primary"
          fontWeight={500}
          w={250}
          isDisabled={!method}
          onClick={handleSubmitMethod}
          h={57}
        >
          Confirm Checkout
        </Button>
      </VStack>
    </Stack>
  );
}
