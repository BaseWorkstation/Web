import React from "react";
import { Box, Stack, StackDivider, Text } from "@chakra-ui/react";
import SubscriptionPlans from "components/SubscriptionPlans/SubscriptionPlans";

export default function TeamSubscription({ currentPlan, handleChoosePlan }) {
  return (
    <Stack spacing={[4, 8]} divider={<StackDivider />}>
      {currentPlan && (
        <Text>
          You're currently subscribed to the{" "}
          <Box as="span" fontWeight="bold" color="primary.500">
            {currentPlan?.name}
          </Box>{" "}
          Plan. To change your plan select from an option below
        </Text>
      )}

      <SubscriptionPlans
        currentPlanId={currentPlan?.id}
        onSelect={(planCode, reference) =>
          handleChoosePlan(planCode, reference, "Team")
        }
      />
    </Stack>
  );
}
