import {
  Box,
  Button,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Spinner from "components/Spinner/Spinner";
import Link from "next/link";
import Moment from "react-moment";
import "moment-timezone";
import { separateWithComma } from "utils/helpers";

export default function TeamActivities({ teamLoading, teams, teamActivities }) {
  if (teamLoading) return <Spinner />;

  if (!teams.length) return <NoTeamView />;

  if (!teamActivities.data.length)
    return (
      <Text textAlign="center">
        When your team members check in to workspaces, you will see it here
      </Text>
    );

  const totalAmount = teamActivities.data.reduce((accumulator, object) => {
    return accumulator + Number(object.total_value_of_minutes_spent_in_naira);
  }, 0);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead color="primary.500">
            <Tr>
              <Th
                textTransform="capitalize"
                fontSize="md"
                color="primary.500"
                pl={0}
              >
                Workspace
              </Th>

              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                User
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Check In
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Check Out
              </Th>
              <Th
                textTransform="capitalize"
                fontSize="md"
                color="primary.500"
                isNumeric
              >
                Amount spent
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamActivities.data.map(
              ({
                id,
                user,
                workstation,
                check_in_time,
                check_out_time,
                total_value_of_minutes_spent_in_naira,
              }) => (
                <Tr key={id}>
                  <Td py={8} pl={0}>
                    {workstation.name}
                  </Td>
                  <Td textTransform="capitalize" py={8}>
                    {user.first_name} {user.last_name}
                  </Td>
                  <Td py={8}>
                    {check_in_time ? (
                      <Moment format="hh:mm a">
                        {new Date(check_in_time)}
                      </Moment>
                    ) : (
                      ""
                    )}
                  </Td>
                  <Td py={8}>
                    {check_out_time ? (
                      <Moment format="hh:mm a">
                        {new Date(check_out_time)}
                      </Moment>
                    ) : (
                      ""
                    )}
                  </Td>
                  <Td py={8} isNumeric>
                    N{separateWithComma(total_value_of_minutes_spent_in_naira)}
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack spacing={16} pt={12} justify="flex-end">
        <Text fontWeight="bold" color="primary.500" fontSize="lg">
          TOTAL SPENT
        </Text>
        <Text fontWeight="bold" color="primary.500" fontSize="lg">
          N{separateWithComma(totalAmount)}
        </Text>
      </HStack>
    </Box>
  );
}

const NoTeamView = () => (
  <VStack my={20} spacing={8}>
    <Image src="/illustrations/team.svg" boxSize={126} />
    <Text fontWeight={500} textAlign="center">
      Create a team to check their activities here
    </Text>
    <Link href="/account/team/new">
      <Button colorScheme="primary" w={250} size="lg" h="56px">
        Create team
      </Button>
    </Link>
  </VStack>
);
