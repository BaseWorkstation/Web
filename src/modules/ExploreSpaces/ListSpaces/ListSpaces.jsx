import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Select,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import HowItWorks from "components/HowItWorks/HowItWorks";
import Spinner from "components/Spinner/Spinner";
import ExploreLayout from "layout/ExploreLayout/ExploreLayout";
import Link from "next/link";
import SearchSpaces from "./components/SearchSpaces";
import SpaceCard from "./components/SpaceCard";
import SpacesMap from "./components/SpacesMap";
import useListSpacesHook from "./useListSpacesHook";

export default function ListSpaces() {
  const {
    spaces,
    isLoading,
    handleFetchMoreSpaces,
    hasMore,
    searchValue,
    setSearchValue,
    debouncedOnChange,
    resultCount,
    isAlreadyCheckedIn,
    selectedSpace,
    setSelectedSpace,
  } = useListSpacesHook();

  return (
    <ExploreLayout>
      <Stack spacing={[8, 10, 12, 70]}>
        <VStack
          borderBottom="1px solid"
          borderColor="gray.200"
          bg="white"
          shadow="sm"
          px="5%"
          w="full"
          pt={[55, 55, 55, 181]}
          pb={[4, 4, 12]}
        >
          <Heading
            className="gradientText"
            textAlign="center"
            fontSize={[36, 36, 50, 64]}
          >
            Find your next workspace
          </Heading>

          <HStack
            w="full"
            pt={8}
            justify={["space-between", "space-between", "center"]}
          >
            <Select
              maxW={[174, 254, 610]}
              fontWeight="bold"
              rounded={[8, 8, "full"]}
              color="blue.800"
              placeholder="Select Location"
              borderWidth={[0, 0, "1px"]}
            >
              <option value="Lagos">Lagos</option>
            </Select>
            {!isAlreadyCheckedIn && (
              <Show below="md">
                <Link href="/check-in">
                  <Button
                    fontWeight={500}
                    colorScheme="primary"
                    size="lg"
                    w={152}
                  >
                    Check In
                  </Button>
                </Link>
              </Show>
            )}
          </HStack>

          <Show below="md">
            <Box w="full" pt={4}>
              <SearchSpaces
                value={searchValue}
                onChange={(value) => {
                  debouncedOnChange(value);
                  setSearchValue(value);
                }}
              />
            </Box>
          </Show>
        </VStack>

        <HStack align="flex-start" px="5%" justify="center" w="full">
          <Stack
            direction="row"
            w="full"
            pb={[20, 20, 20, 0]}
            maxW="6xl"
            spacing={5}
          >
            <Box pb={8} w="full">
              <HStack
                align={["flex-start", "flex-start", "center"]}
                justify="space-between"
              >
                <Flex>
                  {searchValue && !isLoading && (
                    <Text mb={12} fontSize={["sm", "md"]} fontWeight={500}>
                      {resultCount} results matching your search entries
                    </Text>
                  )}
                </Flex>
                <Show above="md">
                  <Flex pb={12}>
                    <SearchSpaces
                      value={searchValue}
                      onChange={(value) => {
                        debouncedOnChange(value);
                        setSearchValue(value);
                      }}
                    />
                  </Flex>
                </Show>
              </HStack>

              <Stack spacing={8}>
                <Flex maxW={["full"]}>
                  <HowItWorks />
                </Flex>

                {spaces.map((space) => (
                  <SpaceCard key={space.id} space={space} />
                ))}

                {isLoading && <Spinner />}

                {hasMore && (
                  <Button
                    fontWeight={500}
                    colorScheme="primary"
                    variant="link"
                    isLoading={isLoading}
                    onClick={handleFetchMoreSpaces}
                  >
                    Load more
                  </Button>
                )}
              </Stack>
            </Box>
            <Show above="lg">
              <SpacesMap
                spaces={spaces}
                selectedSpace={selectedSpace}
                setSelectedSpace={setSelectedSpace}
              />
            </Show>
          </Stack>
        </HStack>
      </Stack>
    </ExploreLayout>
  );
}
