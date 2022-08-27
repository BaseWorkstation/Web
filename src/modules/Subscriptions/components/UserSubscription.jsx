import React from "react";
import { Box, HStack, Stack, StackDivider, Text } from "@chakra-ui/react";
import SubscriptionPlans from "components/SubscriptionPlans/SubscriptionPlans";

export default function UserSubscription({ currentPlan, handleChoosePlan }) {
  return (
    <Stack spacing={[4, 8]} w="full" divider={<StackDivider />}>
      {currentPlan && (
        <Text>
          You're currently subscribed to the{" "}
          <Box as="span" fontWeight="bold" color="primary.500">
            {currentPlan?.name}
          </Box>{" "}
          Plan. To change your plan select from an option below
        </Text>
      )}
      <HStack w="full" justify="center">
        <SubscriptionPlans
          currentPlanId={currentPlan?.id}
          onSelect={(planCode, reference) =>
            handleChoosePlan(planCode, reference, "User")
          }
        />
      </HStack>
    </Stack>
  );
}
