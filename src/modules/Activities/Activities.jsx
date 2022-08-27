import {
  Flex,
  HStack,
  Icon,
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
    selectedDay,
    setSelectedDay,
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
            w={["full", "full", "fit-content"]}
            rounded={8}
          >
            <Flex
              pos="absolute"
              right={[0, 0, 10]}
              top={[73, 4]}
              left={[0, "auto"]}
            >
              <Menu isLazy placement="bottom-end" gutter={4}>
                {({ onClose }) => (
                  <>
                    <MenuButton as={HStack} cursor="pointer">
                      <HStack>
                        <Icon
                          color="primary.500"
                          size="sm"
                          variant="default"
                          as={AiOutlineCalendar}
                          fontSize="lg"
                        />
                        <Text fontWeight={500} fontSize="sm">
                          <Moment format="MMMM D, YYYY ">{selectedDay}</Moment>
                        </Text>
                      </HStack>
                    </MenuButton>
                    <MenuList p={4}>
                      <DayPicker
                        onDayClick={(day) => {
                          setSelectedDay(day);
                          onClose();
                        }}
                        selectedDays={selectedDay}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        disabledDays={{ after: new Date() }}
                        hideOnDayClick={true}
                      />
                    </MenuList>
                  </>
                )}
              </Menu>
            </Flex>
            <Tab
              rounded={8}
              color="gray.500"
              fontSize={["md", "md", "lg"]}
              px={[3, 8]}
              _selected={{ bg: "rgba(0, 171, 231, 0.15);", color: "blue.800" }}
            >
              My Recent Activity
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
