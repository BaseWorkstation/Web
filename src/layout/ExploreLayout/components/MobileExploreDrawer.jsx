import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import MobileNav from "layout/shared/MobileNav";
import Link from "next/link";
import Router from "next/router";
import { useSelector } from "react-redux";
import { exploreMenuOptions } from "utils/constants";

export default function MobileExploreDrawer({ isOpen, onToggle }) {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <Drawer size="xs" isOpen={isOpen} onClose={onToggle} placement="right">
      <DrawerOverlay />
      <DrawerContent p={0}>
        <DrawerHeader px={5} pt={10}>
          {userDetails && (
            <HStack>
              <Avatar name={userDetails?.first_name} width={9} height={9} />
              <Box>
                <Text textTransform="capitalize" fontWeight="bold">
                  {userDetails?.first_name} {userDetails?.last_name}
                </Text>
                <Text fontSize="xs">{userDetails?.email}</Text>
              </Box>
            </HStack>
          )}
          {!userDetails && (
            <VStack spacing={8} mt={8}>
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
            </VStack>
          )}
        </DrawerHeader>

        <DrawerBody pb={24}>
          <Stack
            fontSize="lg"
            fontWeight={500}
            h="full"
            color="blue.800"
            justify="flex-end"
            spacing={12}
            pb={10}
          >
            {exploreMenuOptions.map(({ name, href, isProtected }) => {
              if (isProtected && !userDetails) return null;

              return (
                <Link key={href} href={href}>
                  <Text w="fit-content">{name}</Text>
                </Link>
              );
            })}

            {userDetails && (
              <Text
                cursor="pointer"
                onClick={() => Router.push("/login")}
                color="red.500"
              >
                Logout
              </Text>
            )}
          </Stack>
        </DrawerBody>

        <DrawerFooter p={0}>
          <MobileNav onToggle={onToggle} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
