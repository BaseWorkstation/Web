import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import AddMember from "./components/AddMember";
import MembersTable from "./components/MembersTable";
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
        <HStack justify="space-between" color="blue.800">
          <Heading fontSize="xl">
            {data.isTeamOwner ? "Manage" : "View"} Users{" "}
            {data.currentTeam?.name ? "-" : ""} {data.currentTeam?.name}
          </Heading>

          {data.currentTeam && data.isTeamOwner && <AddMember {...data} />}
        </HStack>

        <Box pt={8}>
          <MembersTable {...data} />
        </Box>
      </Stack>
    </AccountLayout>
  );
}
