import {
  Box,
  Button,
  Divider,
  Heading,
  Show,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import CheckInStatus from "components/CheckInStatus/CheckInStatus";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const settingsLinks = [
  { name: "Basic information", href: "/account/settings" },
  // { name: "Manage card", href: "/account/settings/card" },
  { name: "Change password", href: "/account/settings/password" },
];

export default function SettingsLayout({ children }) {
  const { asPath } = useRouter();

  return (
    <AccountLayout>
      <Stack
        color="blue.800"
        border="1px solid"
        bg="white"
        borderColor="gray.200"
        rounded={16}
        minH="lg"
        spacing={0}
        direction="row"
        divider={
          <StackDivider display={["none", "none", "none", "none", "block"]} />
        }
      >
        <CheckInStatus />

        <Show above="xl">
          <Stack w={247} spacing={24} p={[5, 5, 8]}>
            <Heading fontSize="xl">Settings</Heading>

            <Stack spacing={7} fontWeight={500}>
              {settingsLinks.map(({ name, href }) => (
                <Link key={href} href={href}>
                  <Button
                    px={0}
                    w="full"
                    justifyContent="space-between"
                    iconSpacing={6}
                    rightIcon={asPath === href ? <BsChevronRight /> : null}
                    colorScheme="default"
                    color="blue.800"
                    fontWeight={500}
                  >
                    {name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Show>

        <Box w="full">
          <Show below="xl">
            <Box w="full" py={7} px={5}>
              <Heading fontSize="xl">Settings</Heading>
              <Divider my={5} />
              <Stack spacing={5}>
                {settingsLinks.map(({ name, href }) => {
                  const isSelected = asPath === href;
                  return (
                    <Stack key={href}>
                      <Link href={href}>
                        <Button
                          px={0}
                          justifyContent="left"
                          iconSpacing={6}
                          rightIcon={
                            isSelected ? <BsChevronDown /> : <BsChevronRight />
                          }
                          colorScheme="default"
                          color="blue.800"
                          fontWeight={500}
                        >
                          {name}
                        </Button>
                      </Link>
                      {isSelected && children}
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </Show>
          <Show above="xl">{children}</Show>
        </Box>
      </Stack>
    </AccountLayout>
  );
}
