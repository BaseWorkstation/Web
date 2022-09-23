import {
  Box,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import AddMember from "./components/AddMember";
import MembersTable from "./components/MembersTable";
import TeamInvites from "./components/TeamInvites";
import useViewTeamHook from "./useViewTeamHook";

export default function ViewTeam() {
  const data = useViewTeamHook();

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
        <Tabs variant="soft-rounded">
          <TabList
            border="1px solid"
            borderColor="gray.200"
            w={["fit-content"]}
            rounded={8}
          >
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
              My Team
            </Tab>
            {data.hasJoinedTeam && (
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
                My Joined Team
              </Tab>
            )}
            {data.hasInvitations && (
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
                My Invitations
              </Tab>
            )}
          </TabList>

          <TabPanels>
            <TabPanel px={0} pt={[50, 7]}>
              <HStack justify="space-between" color="blue.800">
                <Heading fontSize="xl">
                  {data.currentTeam ? "Manage Users" : ""}{" "}
                  {data.currentTeam?.name ? "-" : ""} {data.currentTeam?.name}
                </Heading>

                {data.currentTeam && data.isTeamOwner && (
                  <AddMember {...data} />
                )}
              </HStack>

              <Box pt={8}>
                <MembersTable {...data} />
              </Box>
            </TabPanel>
            {data.hasJoinedTeam && (
              <TabPanel px={0} pt={[50, 8]}>
                <HStack justify="space-between" color="blue.800">
                  <Heading fontSize="xl">
                    View Users {data.currentTeam?.name ? "-" : ""}{" "}
                    {data.currentTeam?.name}
                  </Heading>
                </HStack>

                <Box pt={8}></Box>
              </TabPanel>
            )}
            {data.hasInvitations && (
              <TabPanel px={0} pt={[50, 8]}>
                <TeamInvites inviteeTeams={data.teamInvitations} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Stack>
    </AccountLayout>
  );
}
