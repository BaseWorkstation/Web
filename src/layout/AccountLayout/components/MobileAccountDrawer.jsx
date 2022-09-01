import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { accountMenuOptions } from "utils/constants";
import AccountHeader from "./AccountHeader";
import MobileNav from "../../shared/MobileNav";

export default function MobileAccountDrawer({ isOpen, onToggle }) {
  return (
    <Drawer size="xs" isOpen={isOpen} onClose={onToggle} placement="right">
      <DrawerOverlay />
      <DrawerContent p={0}>
        <DrawerHeader p={0}>
          <AccountHeader />
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
            {accountMenuOptions.map(({ name, href }) => (
              <Link key={href} href={href}>
                <Text w="fit-content">{name}</Text>
              </Link>
            ))}

            <Text
              cursor="pointer"
              onClick={() => Router.push("/login")}
              color="red.500"
            >
              Logout
            </Text>
          </Stack>
        </DrawerBody>

        <DrawerFooter p={0}>
          <MobileNav onToggle={onToggle} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
