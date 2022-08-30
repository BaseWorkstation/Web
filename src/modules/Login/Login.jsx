import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { Logo } from "components/Logo";
import React from "react";
import Link from "next/link";
import useLoginHook from "./useLoginHook";
import HowItWorks from "components/HowItWorks/HowItWorks";

export default function Login({ previousRoute }) {
  const {
    loginDetails,
    handleSubmit,
    isLoading,
    handleChange,
    showPassword,
    setShowPassword,
  } = useLoginHook(previousRoute);

  const { email, password } = loginDetails;

  return (
    <Center bg="gray.50" minH="100vh" py={[16, 20]}>
      <VStack w="full" spacing={16}>
        <Logo notLinked />
        <Flex maxW={["full", 400]}>
          <HowItWorks />
        </Flex>

        <VStack w="full" spacing={8}>
          <Stack
            w="full"
            maxW={["full", "sm"]}
            as="form"
            bg="white"
            onSubmit={handleSubmit}
            border="1px solid"
            borderColor="gray.100"
            rounded={20}
            divider={<StackDivider borderColor="gray.200" />}
            spacing={6}
            pt={9}
            pb={6}
          >
            <Heading pl={6} fontSize="xl">
              Log in to your account
            </Heading>

            <Stack px={6} spacing={6}>
              <Stack spacing={1}>
                <Text>Email Address</Text>
                <Input
                  size="lg"
                  placeholder="Enter email address"
                  type="email"
                  isRequired
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Text>Password</Text>
                <InputGroup size="lg">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    isRequired
                    value={password}
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                  />

                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      color="gray.400"
                      bg="transparent"
                      icon={showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                      onClick={() => setShowPassword(!showPassword)}
                      fontSize="xl"
                    />
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Flex>
                <Link href="/forgot-password">
                  <ChakraLink fontSize="xs" color="primary.500">
                    Forgot Password?
                  </ChakraLink>
                </Link>
              </Flex>
              <Box w="full" pt={9}>
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Checking..."
                  variant="solid"
                  colorScheme="primary"
                >
                  Log in
                </Button>
              </Box>
            </Stack>
          </Stack>

          <Text fontSize="sm" textAlign="center">
            I'm new to Base{" "}
            <Link href="/register">
              <ChakraLink fontWeight="semibold" color="primary.500">
                Create account
              </ChakraLink>
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
}
