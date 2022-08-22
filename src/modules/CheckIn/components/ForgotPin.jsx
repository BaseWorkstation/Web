import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function ForgotPin({ forgotPinDisclosure, handleRequestPin }) {
  const { userDetails, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState(userDetails?.email);
  const { isOpen, onClose } = forgotPinDisclosure;

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent roundedTop={12}>
        <DrawerCloseButton />

        <DrawerHeader borderBottomWidth="1px" roundedTop={12}>
          Enter your email
        </DrawerHeader>
        <DrawerBody pt={4}>
          <Stack spacing={4} pb={3}>
            <Text>
              We'll send you the base pin of the user associated with the email
              you provide.
            </Text>
            <Input
              size="lg"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              isRequired
              placeholder="Enter your email here..."
            />

            <Button
              onClick={() => handleRequestPin(email)}
              type="submit"
              size="lg"
              isLoading={loading === "REQUEST_USER_PIN"}
              loadingText="Loading..."
              colorScheme="primary"
            >
              Send
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
