import {
  Flex,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import "moment-timezone";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { AiOutlineCalendar } from "react-icons/ai";
import Moment from "react-moment";
import TeamActivities from "./components/TeamActivities";
import UserActivities from "./components/UserActivities";
import useActivitiesHook from "./useActivitiesHook";

export default function AccountActivities() {
  const {
    currentMonth,
    selectedMonth,
    setSelectedMonth,
    teamLoading,
    team,
    isTeamOwner,
    teamActivities,
    userActivities,
    userLoading,
  } = useActivitiesHook();

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
            w={["fit-content"]}
            rounded={8}
          >
            <Flex
              pos="absolute"
              right={[0, 0, 10]}
              top={[63, 4]}
              left={[0, "auto"]}
            >
              <HStack>
                <Input
                  variant={["flushed", "filled"]}
                  type="month"
                  max={currentMonth}
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                />
              </HStack>
            </Flex>
            <Tab
              rounded={8}
              color="gray.500"
              fontSize={["sm", "md", "lg"]}
              px={[3, 8]}
              _selected={{ bg: "rgba(0, 171, 231, 0.15);", color: "blue.800" }}
            >
              My Recent Activity
            </Tab>
            {isTeamOwner && (
              <Tab
                rounded={8}
                color="gray.500"
                fontSize={["sm", "md", "lg"]}
                px={[3, 8]}
                _selected={{
                  bg: "rgba(0, 171, 231, 0.15);",
                  color: "blue.800",
                }}
              >
                My Team Activity
              </Tab>
            )}
          </TabList>

          <TabPanels>
            <TabPanel px={0} pt={[50, 8]}>
              <UserActivities
                userLoading={userLoading}
                userActivities={userActivities}
              />
            </TabPanel>
            {isTeamOwner && (
              <TabPanel px={0} pt={[50, 8]}>
                <TeamActivities
                  teamLoading={teamLoading}
                  team={team}
                  teamActivities={teamActivities}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Stack>
    </AccountLayout>
  );
}
