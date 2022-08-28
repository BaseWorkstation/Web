import {
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import TeamSubscription from "./components/TeamSubscription";
import UserSubscription from "./components/UserSubscription";
import useSubscriptionsHook from "./useSubscriptionsHook";

export default function Subscriptions() {
  const {
    isTeamOwner,
    currentUserPlan,
    handleChooseUserPlan,
    currentTeamPlan,
    teamLoading,
    teamMembers,
    handleChooseTeamPlan,
  } = useSubscriptionsHook();

  return (
    <AccountLayout>
      <Stack
        border="1px solid"
        bg="white"
        borderColor="gray.200"
        rounded={16}
        minH="lg"
        p={[5, 5, 8]}
      >
        <Tabs pos="relative" variant="soft-rounded">
          <TabList
            border="1px solid"
            borderColor="gray.200"
            w={["full", "full", "fit-content"]}
            rounded={8}
          >
            <Tab
              rounded={8}
              color="gray.500"
              fontSize={["md", "md", "lg"]}
              px={[3, 8]}
              _selected={{ bg: "rgba(0, 171, 231, 0.15);", color: "blue.800" }}
            >
              My Subscription
            </Tab>
            {isTeamOwner && (
              <Tab
                rounded={8}
                color="gray.500"
                fontSize={["md", "md", "lg"]}
                px={[3, 8]}
                _selected={{
                  bg: "rgba(0, 171, 231, 0.15);",
                  color: "blue.800",
                }}
              >
                My Team Subscription
              </Tab>
            )}
          </TabList>

          <TabPanels>
            <TabPanel px={0} pt={[5, 5]}>
              <HStack w="full" justify="center">
                <UserSubscription
                  currentPlan={currentUserPlan}
                  handleChoosePlan={handleChooseUserPlan}
                />
              </HStack>
            </TabPanel>
            {isTeamOwner && (
              <TabPanel px={0} pt={[5, 5]}>
                <HStack w="full" justify="center">
                  <TeamSubscription
                    teamLoading={teamLoading}
                    teamMembers={teamMembers}
                    currentPlan={currentTeamPlan}
                    handleChoosePlan={handleChooseTeamPlan}
                  />
                </HStack>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Stack>
    </AccountLayout>
  );
}
