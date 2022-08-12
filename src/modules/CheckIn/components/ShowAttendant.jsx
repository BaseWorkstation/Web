import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";
import { BsCheck2 } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ShowAttendant() {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <Stack color="blue.800" pb={4} px={6}>
        <Heading textAlign="center" fontSize="2xl">
          Show Attendant
        </Heading>
      </Stack>
      <VStack spacing={99} pt={8} px={4}>
        <VStack color="blue.800">
          <Avatar
            boxSize={128}
            size="2xl"
            src={userDetails?.avatar?.file_path}
            name={userDetails?.first_name}
          >
            <AvatarBadge borderWidth={3} boxSize={12} bg="green.400">
              <Icon fontSize={32} as={BsCheck2} />
            </AvatarBadge>
          </Avatar>

          <Heading pt={6} mb={2} textTransform="capitalize" fontSize="2xl">
            {userDetails.first_name} {userDetails.last_name}
          </Heading>

          <Text textAlign="center">
            Kindly show the attendant to allow you complete your check in and
            start working
          </Text>
        </VStack>
        <Button
          size="lg"
          colorScheme="primary"
          fontWeight={500}
          w={250}
          onClick={() => Router.push("/")}
          h={57}
          type="submit"
        >
          Done
        </Button>
      </VStack>
    </Stack>
  );
}
