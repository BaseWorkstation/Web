import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Spinner from "components/Spinner/Spinner";
import ExploreLayout from "layout/ExploreLayout/ExploreLayout";
import Head from "next/head";
import Link from "next/link";
import AboutBase from "./components/AboutBase";
import Amenities from "./components/Amenities";
import BillingRate from "./components/Billing";
import CheckInInstructions from "./components/CheckInInstructions";
import Hero from "./components/Hero";
import Ratings from "./components/Ratings";
import SpaceOnMap from "./components/SpaceOnMap";
import useViewSpaceHook from "./useViewSpaceHook";

export default function ViewSpace() {
  const { isAlreadyCheckedIn, currentSpace, spaceServices, spaceReviews } =
    useViewSpaceHook();

  if (
    !currentSpace ||
    !spaceServices ||
    spaceReviews?.total_no_of_ratings === undefined
  )
    return (
      <Center w="full" minH="100vh">
        <Spinner />
      </Center>
    );

  return (
    <ExploreLayout>
      <Head>
        <title>{currentSpace.name} - Base</title>
      </Head>
      <Box pb={[48, 48, 40, 12]}>
        <Hero currentSpace={currentSpace} spaceServices={spaceServices} />

        <Stack
          spacing={[6, 6, 12]}
          mt={[6, 12, 67]}
          px={[0, 0, "5%"]}
          pb={[40, 40, 0]}
          w="full"
          justify="center"
          align="center"
        >
          <Stack
            w="full"
            maxW="6xl"
            direction={["column", "column", "column", "column", "row"]}
            spacing={8}
            align="stretch"
          >
            <Stack w="full" spacing={[6, 6, 12]}>
              {/* <Amenities amenities={currentSpace.amenities} /> */}
              <AboutBase
                name={currentSpace.name}
                about={currentSpace.about}
                schedule={currentSpace.schedule}
                policies={currentSpace.other_policies}
                coordinates={currentSpace.coordinates}
              />
            </Stack>
            <Stack w="full" rounded={20} bg="white" spacing={8}>
              <Show above="md">
                <Stack spacing={12} p={8}>
                  <BillingRate rate={currentSpace.default_service} />

                  <CheckInInstructions />

                  <Ratings spaceReviews={spaceReviews} />
                </Stack>
              </Show>

              <Show below="md">
                <Ratings spaceReviews={spaceReviews} />
              </Show>
            </Stack>
          </Stack>

          <SpaceOnMap coordinates={currentSpace.coordinates} />
        </Stack>

        <Show below="md">
          {!isAlreadyCheckedIn && (
            <VStack
              pb={24}
              pt={4}
              pos="fixed"
              roundedTop={16}
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              shadow="md"
              bottom={0}
              left={0}
              w="full"
              justify="center"
            >
              <Text fontSize="md" fontWeight={500} pb={0} textAlign="center">
                Already at {currentSpace.name}?
              </Text>
              <Flex w="fit-content">
                <Link href="/check-in">
                  <Button w={150} h={47} colorScheme="primary">
                    Check In
                  </Button>
                </Link>
              </Flex>
            </VStack>
          )}
        </Show>
      </Box>
    </ExploreLayout>
  );
}
