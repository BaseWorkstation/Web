import {
  Box,
  Center,
  Heading,
  Link as ChakraLink,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { QrReader } from "react-qr-reader";

export default function ScanQR({ handleScanResult, showScanning }) {
  return (
    <Stack divider={<StackDivider />} spacing={0}>
      <Stack pb={8} px={6}>
        <Heading fontSize="xl">Check-in</Heading>
        <Text>
          Scan the QR Code at the entrance of your current workspace to check-in
        </Text>
      </Stack>
      <Stack px={0} spacing={6}>
        <Box pos="relative" w="full">
          <QrReader
            constraints={{ facingMode: "environment" }}
            scanDelay={1000}
            onResult={(result, error) => handleScanResult(result, error, true)}
            videoContainerStyle={{ paddingTop: "76%" }}
            videoStyle={{ objectFit: "cover", objectFill: "cover" }}
            containerStyle={{ width: "100%", height: "fit-content" }}
          />

          <Center
            w="full"
            pos="absolute"
            flexDirection="column"
            h="100%"
            top={0}
          >
            {showScanning && (
              <VStack opacity={0.8} bg="gray.300" rounded={8} p={4}>
                <Spinner size="lg" />
                <Text mt={2}>Scanning...</Text>
              </VStack>
            )}
          </Center>
        </Box>
        <Text fontSize="xs" textAlign="center">
          Unable to scan?{" "}
          <Link href="/account/support">
            <ChakraLink fontWeight="semibold" color="primary.500">
              Get support
            </ChakraLink>
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
