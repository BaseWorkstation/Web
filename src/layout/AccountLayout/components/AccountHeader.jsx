import {
  Avatar,
  AvatarBadge,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import UserMenu from "../../shared/UserMenu";

export default function AccountHeader() {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <HStack
      color="blue.800"
      justify="space-between"
      pt={[6, 7]}
      pb={[4, 4, 7]}
      px={["5%", "5%", "5%", 57]}
    >
      <Stack direction={["column", "column", "row"]} spacing={[2, 2, 8]}>
        <Heading fontSize="xl" fontWeight="500">
          Welcome,{" "}
          <Box textTransform="capitalize" as="span" color="primary.500">
            {userDetails?.first_name}
          </Box>
          &nbsp; &nbsp;👋
        </Heading>

        <Text fontWeight={400} fontSize="md" color="gray.500">
          Today, <Moment format="Do MMMM YYYY">{new Date()}</Moment>
        </Text>
      </Stack>
      <HStack spacing={[4, 8]}>
        {/* <Avatar
          w={9}
          h={9}
          cursor="pointer"
          bg="white"
          icon={<IoMdNotificationsOutline fontSize={20} />}
        >
          <AvatarBadge
            top={-3}
            border="0"
            boxSize={5}
            color="white"
            fontSize="sm"
            bg="red.500"
          >
            4
          </AvatarBadge>
        </Avatar> */}
        <UserMenu />
      </HStack>
    </HStack>
  );
}
