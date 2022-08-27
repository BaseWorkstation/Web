import {
  Box,
  Button,
  Icon,
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
import { AiOutlineDelete } from "react-icons/ai";
import DeleteMemberModal from "./DeleteMemberModal";

export default function MembersTable({
  isTeamOwner,
  teamMembers,
  currentTeam,
  teamLoading,
  openDeleteMemberConfirmation,
  ...rest
}) {
  if (teamLoading) return <Spinner />;

  if (!currentTeam) return <NoTeamView />;

  if (!teamMembers.data?.length && !teamMembers.unregistered_members?.length)
    return (
      <Text textAlign="center">
        When you add members to your team, they will appear here
      </Text>
    );

  return (
    <Box pt={0}>
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
                Name
              </Th>

              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Email address
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Last Active
              </Th>
              {isTeamOwner && (
                <Th
                  textTransform="capitalize"
                  fontSize="md"
                  color="primary.500"
                >
                  Actions
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {teamMembers.data.map((member) => (
              <Tr key={member.id}>
                <Td textTransform="capitalize" py={8} pl={0}>
                  {member.first_name} {member.last_name}
                </Td>
                <Td py={8}>{member.email}</Td>
                <Td py={8}>{member.last_active}</Td>
                {isTeamOwner && (
                  <Td py={8}>
                    <Button
                      fontWeight={500}
                      colorScheme="default"
                      color="red.400"
                      variant="ghost"
                      iconSpacing={2}
                      leftIcon={<Icon as={AiOutlineDelete} fontSize={20} />}
                      onClick={() => openDeleteMemberConfirmation(member.id)}
                    >
                      Remove User
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
            {teamMembers.unregistered_members.map((member) => (
              <Tr key={member.id}>
                <Td textTransform="capitalize" py={8} pl={0}></Td>
                <Td py={8}>{member.email}</Td>
                <Td py={8}>Pending Invite</Td>
                <Td py={8}>
                  {isTeamOwner && (
                    <Button
                      fontWeight={500}
                      colorScheme="default"
                      color="red.400"
                      variant="ghost"
                      iconSpacing={2}
                      leftIcon={<Icon as={AiOutlineDelete} fontSize={20} />}
                      onClick={() => openDeleteMemberConfirmation(member.id)}
                    >
                      Remove User
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <DeleteMemberModal {...rest} />
      </TableContainer>
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
