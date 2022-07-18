import {
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
  const { handleChoosePlan } = useSubscriptionsHook();
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
            <Tab
              rounded={8}
              color="gray.500"
              fontSize={["md", "md", "lg"]}
              px={[3, 8]}
              _selected={{ bg: "rgba(0, 171, 231, 0.15);", color: "blue.800" }}
            >
              My Team Subscription
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0} pt={[5, 5]}>
              <UserSubscription handleChoosePlan={handleChoosePlan} />
            </TabPanel>
            <TabPanel px={0} pt={[5, 5]}>
              <TeamSubscription handleChoosePlan={handleChoosePlan} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </AccountLayout>
  );
}