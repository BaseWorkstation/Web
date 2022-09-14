import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Spinner from "components/Spinner/Spinner";
import Moment from "react-moment";
import "moment-timezone";
import { separateWithComma } from "utils/helpers";

export default function UserActivities({ userActivities, userLoading }) {
  if (userLoading) return <Spinner />;

  if (!userActivities.data.length)
    return (
      <Text textAlign="center">
        When you start checking in to workspaces, you will see them here
      </Text>
    );

  const totalAmount = userActivities.data.reduce((accumulator, object) => {
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
                Check In
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Check Out
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Time spent
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
            {userActivities.data.map(
              ({
                id,
                workstation,
                check_in_time,
                check_out_time,
                total_value_of_minutes_spent_in_naira,
                total_minutes_spent,
              }) => (
                <Tr key={id}>
                  <Td textTransform="capitalize" py={8}>
                    {workstation.name}
                  </Td>
                  <Td py={8}>
                    {check_in_time ? (
                      <Moment format="DD MMM YYYY, hh:mm a">
                        {new Date(check_in_time.split(" ").join("T"))}
                      </Moment>
                    ) : (
                      ""
                    )}
                  </Td>
                  <Td py={8}>
                    {check_out_time ? (
                      <Moment format="DD MMM YYYY, hh:mm a">
                        {new Date(check_out_time.split(" ").join("T"))}
                      </Moment>
                    ) : (
                      <Text color="gray">Still checked in</Text>
                    )}
                  </Td>
                  <Td py={8}>{total_minutes_spent} minutes</Td>
                  <Td py={8} isNumeric>
                    ₦{separateWithComma(total_value_of_minutes_spent_in_naira)}
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
          ₦{separateWithComma(totalAmount)}
        </Text>
      </HStack>
    </Box>
  );
}
