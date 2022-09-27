import {
  Box,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Thead,
  Button,
  Text,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export default function JoinedTeams({
  handleJoinTeam,
  isJoiningTeam,
  joinedTeams,
  inviteeTeams,
}) {
  return (
    <Box>
      <HStack justify="space-between" color="blue.800">
        <Heading fontSize="xl">View Joined Teams</Heading>
      </HStack>

      <Box pt={8}>
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
                  Team Name
                </Th>

                <Th
                  textTransform="capitalize"
                  fontSize="md"
                  color="primary.500"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {joinedTeams.map((team) => (
                <Tr key={team.id}>
                  <Td textTransform="capitalize" py={4} pl={0}>
                    <HStack spacing={4}>
                      <Avatar
                        size="sm"
                        name={team.name}
                        src={team.logo?.file_path}
                      />
                      <Text fontWeight="bold">{team.name}</Text>
                    </HStack>
                  </Td>
                  <Td py={4}>
                    <Text color="green.500">Joined</Text>
                  </Td>
                </Tr>
              ))}
              {inviteeTeams.map((team) => (
                <Tr key={team.id}>
                  <Td textTransform="capitalize" py={4} pl={0}>
                    <HStack spacing={4}>
                      <Avatar
                        size="sm"
                        name={team.name}
                        src={team.logo?.file_path}
                      />
                      <Text fontWeight="bold">{team.name}</Text>
                    </HStack>
                  </Td>
                  <Td py={4}>
                    <HStack>
                      <Button
                        fontWeight={500}
                        colorScheme="default"
                        color="green.500"
                        variant="ghost"
                        iconSpacing={2}
                        isLoading={isJoiningTeam}
                        onClick={() => handleJoinTeam(team.id)}
                        leftIcon={<BsCheckLg />}
                      >
                        Accept
                      </Button>

                      <Button
                        fontWeight={500}
                        colorScheme="default"
                        color="red.400"
                        variant="ghost"
                        iconSpacing={2}
                        leftIcon={<IoClose />}
                      >
                        Reject
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
