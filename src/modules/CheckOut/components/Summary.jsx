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
import { convertMinutesToHHMMSS, separateWithComma } from "utils/helpers";

export default function Summary({
  checkoutDetails,
  currentCheckIn,
  currentUserPlan,
  currentTeamPlan,
  method,
  setMethod,
  handleSubmitMethod,
}) {
  console.log(checkoutDetails);

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
            <Text fontWeight={500}>{checkoutDetails?.workstation?.name}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Location:
            </Text>
            <Text fontWeight={500}>
              {" "}
              {checkoutDetails?.workstation?.street},{" "}
              {checkoutDetails?.workstation?.city},{" "}
              {checkoutDetails?.workstation?.state}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Total Time Used:
            </Text>
            <Text fontWeight={500}>
              {convertMinutesToHHMMSS(checkoutDetails?.total_minutes_spent)}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold" color="primary.500">
              Amount:
            </Text>
            <Text fontWeight={500}>
              {" "}
              N
              {separateWithComma(
                checkoutDetails?.total_value_of_minutes_spent_in_naira
              )}{" "}
              (N
              {separateWithComma(
                checkoutDetails?.space_price_per_minute_at_the_time
              )}
              /min)
            </Text>
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
