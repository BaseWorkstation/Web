import { Button, HStack, Link as ChakraLink, Show } from "@chakra-ui/react";
import { Logo } from "components/Logo";
import UserMenu from "layout/shared/UserMenu";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function DesktopExporeNav() {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <Show above="lg">
      <HStack
        pos="fixed"
        top={0}
        bg="white"
        px="5%"
        py={4}
        zIndex={10}
        justify="center"
        w="full"
      >
        <HStack w="full" maxW="6xl" justify="space-between">
          <Logo w={90} />

          <HStack fontSize="lg" fontWeight={500} spacing={12}>
            <Link href="https://www.trybase.co/for-team">
              <ChakraLink>For teams</ChakraLink>
            </Link>
            <Link href="/">
              <ChakraLink color="primary.500">Explore spaces</ChakraLink>
            </Link>
            {/* <Link href="/spaces">
              <ChakraLink>List my space</ChakraLink>
            </Link> */}
          </HStack>

          {userDetails && <UserMenu />}
          {!userDetails && (
            <HStack spacing={10}>
              <Link href="/login">
                <Button fontWeight={500} variant="link">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  fontWeight={500}
                  shadow="xl"
                  colorScheme="primary"
                  w={176}
                  h={55}
                >
                  Try for free
                </Button>
              </Link>
            </HStack>
          )}
        </HStack>
      </HStack>
    </Show>
  );
}
