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
  Link,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";
import { BsCheck2 } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ShowConfirmation() {
  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <VStack spacing={99} pt={8} px={4}>
        <VStack color="blue.800">
          <Image src="/illustrations/verified.svg" />

          <Text pt={5} textAlign="center">
            You’ve successfully checked out of this base
          </Text>
        </VStack>
        <Link href="/">
          <Button
            size="lg"
            colorScheme="primary"
            fontWeight={500}
            w={250}
            // onClick={() => Router.back()}
            h={57}
            type="submit"
          >
            Done
          </Button>
        </Link>
      </VStack>
    </Stack>
  );
}
