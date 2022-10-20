import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";

export default function ShowPin({ basePin }) {
  const goToPaymentMethod = () => {
    window.location.href = "/";
  };

  return (
    <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
      <Heading textAlign="center" pl={6} fontSize="xl">
        Welcome to Base
      </Heading>
      <Stack color="blue.800" px={8} spacing={6}>
        <VStack pt={[6, 10, 16]}>
          <Image src="/illustrations/verified.svg" />

          <Heading
            textAlign="center"
            fontSize={56}
            pl={8}
            pt={8}
            py={8}
            letterSpacing={48}
          >
            {basePin}
          </Heading>
          <Text fontSize={[16, 18]} textAlign="center">
            This is your base pin, you'll use this anytime you are checking in
            to a workspace.
          </Text>
        </VStack>
        <Box w="full" pt={9}>
          <Button
            onClick={goToPaymentMethod}
            width="full"
            size="lg"
            variant="solid"
            colorScheme="primary"
          >
            Ok
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
