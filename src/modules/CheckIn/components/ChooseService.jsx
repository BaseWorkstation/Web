import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { separateWithComma } from "utils/helpers";

export default function ChooseService({
  workspaceServices,
  handleSubmitService,
  isCheckingIn,
}) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <Stack divider={<StackDivider />} pb={6} spacing={0}>
      <Stack color="blue.800" pb={4} px={6}>
        <Heading textAlign="center" fontSize="2xl">
          Pick a service
        </Heading>
      </Stack>
      <VStack spacing={12} pt={8} px={0}>
        <Grid
          w="full"
          px={4}
          templateColumns="repeat(2, 1fr)"
          columnGap={5}
          rowGap={8}
        >
          {workspaceServices.map(({ id, name, price_per_minute, images }) => {
            const isSelected = selectedService === id;

            return (
              <GridItem key={id} w="100%">
                <Box
                  border="1px solid"
                  borderColor={isSelected ? "primary.500" : "transparent"}
                  onClick={() => setSelectedService(id)}
                  rounded={8}
                  cursor="pointer"
                  fontWeight={500}
                >
                  <Image
                    objectFit="cover"
                    w="full"
                    h={91}
                    rounded={8}
                    src={
                      [...(images ?? [])]?.reverse()?.[0]?.file_path ||
                      "/images/spaceholder.png"
                    }
                  />
                  <Box pl={2} pb={2}>
                    <Text
                      textTransform="capitalize"
                      color="blue.800"
                      fontSize="lg"
                      mt={3}
                    >
                      {name}
                    </Text>
                    <Text fontSize="md">
                      ₦{separateWithComma(price_per_minute?.amount)}/min
                    </Text>
                  </Box>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
        <Button
          size="lg"
          colorScheme="primary"
          fontWeight={500}
          isDisabled={!selectedService}
          isLoading={isCheckingIn}
          w={250}
          onClick={() => handleSubmitService(selectedService)}
          h={57}
          type="submit"
        >
          Check In
        </Button>
      </VStack>
    </Stack>
  );
}
