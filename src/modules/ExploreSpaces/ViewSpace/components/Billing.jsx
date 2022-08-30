import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { separateWithComma } from "utils/helpers";

export default function BillingRate({ rate }) {
  const { price_per_minute, price_per_hour } = rate;

  return (
    <Stack spacing={6}>
      <Text fontSize={["lg", "lg", "xl"]} color="blue.800" fontWeight="bold">
        Billing Rate
      </Text>
      <HStack align="flex-start" spacing={5}>
        <Icon as={AiOutlineClockCircle} color="primary.500" fontSize={21} />
        <Stack spacing={[1, 1, 0]}>
          <Text fontWeight={["bold", "bold", 500]}>
            Minute Charge: N{separateWithComma(price_per_minute?.amount)}
            /min.
          </Text>
          {price_per_minute?.min_amount && (
            <Text color="gray.600" fontSize={["xs", "xs", "sm"]}>
              Minimum charge N{separateWithComma(price_per_minute?.min_amount)}
            </Text>
          )}
        </Stack>
      </HStack>

      {/* {price_per_hour && (
        <HStack align="flex-start" spacing={5}>
          <Icon as={AiOutlineClockCircle} color="primary.500" fontSize={21} />
          <Stack spacing={[1, 1, 0]}>
            <Text fontWeight={["bold", "bold", 500]}>
              Hourly Charge: N{separateWithComma(price_per_hour?.amount)}
              /hr.
            </Text>
            {price_per_hour?.min_amount && (
              <Text color="gray.600" fontSize={["xs", "xs", "sm"]}>
                Minimum charge N{separateWithComma(price_per_hour?.min_amount)}
              </Text>
            )}
          </Stack>
        </HStack>
      )} */}
    </Stack>
  );
}
