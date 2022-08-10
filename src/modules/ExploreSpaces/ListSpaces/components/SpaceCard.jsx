import { Box, Circle, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";
import "moment-timezone";
import { checkIfCurrentTimeIsBetweenRange } from "utils/helpers";

export default function SpaceCard({ space }) {
  const {
    id,
    name,
    city,
    state,
    country_iso,
    country_name,
    phone,
    email,
    open_time,
    close_time,
    currency_code,
    default_service,
    logo,
    qr_code_path,
  } = space;

  const isOpen = checkIfCurrentTimeIsBetweenRange(open_time, close_time);

  return (
    <Link href={`/spaces/${id}`}>
      <HStack
        cursor="pointer"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        fontWeight={700}
        minH={[134, 154, 215]}
        align="stretch"
        spacing={[4, 6]}
        rounded={["xl", "xl", "2xl"]}
      >
        <Box
          w={[131, 151, 210]}
          bgSize={logo ? "cover" : "60%"}
          rounded={["xl", "xl", "2xl"]}
          bgRepeat="no-repeat"
          bgPos="center"
          bgImage={`url(${logo?.file_path || "/images/spaceholder.png"})`}
        />
        <Stack justify="center" py={[3, 3, 3, 0]} pr={2}>
          <Text fontSize={["md", "md", "lg"]} color="primary.900">
            {name}
          </Text>
          <HStack spacing={0} color="primary.900" align="baseline">
            <Text>
              {default_service?.price_per_minute?.amount} {currency_code}/
            </Text>
            <Text fontSize={10}>MIN</Text>
          </HStack>
          <Stack fontSize={["xs", "xs", "md"]} spacing={1} mt={[1, 1, 3]}>
            <HStack spacing={2}>
              <Circle size={2} bg={isOpen ? "green.400" : "red.600"} />
              <Text color="gray.500">{isOpen ? "OPEN" : "CLOSED"}</Text>
            </HStack>
            <Text fontWeight={500}>
              {moment(open_time, "hh:mm:ss").format("hh:mm A")} -{" "}
              {moment(close_time, "hh:mm:ss").format("hh:mm A")}
            </Text>
            <Text textTransform="capitalize" fontWeight={500}>
              {city}, {state}
            </Text>
          </Stack>
        </Stack>
      </HStack>
    </Link>
  );
}
