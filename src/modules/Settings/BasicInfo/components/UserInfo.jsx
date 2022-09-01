import {
  Avatar,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";

export default function UserInfo({
  basicInfoDetails,
  handleChange,
  handleSubmit,
  isLoading,
  uploadImageFile,
}) {
  const { userDetails } = useSelector((state) => state.user);
  const { firstName, lastName, address, phone } = basicInfoDetails;

  const isEditingDetails = isLoading === "EDIT_USER_DETAILS";
  const isEditingLogo = isLoading === "UPLOAD_USER_AVATAR";

  return (
    <Stack onSubmit={handleSubmit} as="form" pt={12} spacing={54}>
      <Stack spacing={6}>
        <Avatar
          rounded="full"
          src={userDetails.avatar?.file_path}
          boxSize={109}
        />
        <Flex w="fit-content" pos="relative">
          <UploadImage uploadImageFile={uploadImageFile} />
          <Button
            isLoading={isEditingLogo}
            loadingText="Updating..."
            size="sm"
            fontWeight={500}
          >
            Change Picture
          </Button>
        </Flex>
      </Stack>

      <Wrap spacingX={12} spacingY={30}>
        <WrapItem>
          <Stack w={278}>
            <Text>First Name</Text>
            <Input
              w="full"
              size="lg"
              isRequired
              onChange={handleChange}
              name="firstName"
              value={firstName}
              placeholder="Enter First name"
            />
          </Stack>
        </WrapItem>
        <WrapItem>
          <Stack w={278}>
            <Text>Last Name</Text>
            <Input
              w="full"
              size="lg"
              isRequired
              onChange={handleChange}
              name="lastName"
              value={lastName}
              placeholder="Enter Last name"
            />
          </Stack>
        </WrapItem>
        <WrapItem>
          <Stack w={278}>
            <Text>Address</Text>
            <Input
              w="full"
              size="lg"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
          </Stack>
        </WrapItem>

        <WrapItem>
          <Stack w={278}>
            <Text>Phone Number</Text>
            <Input
              w="full"
              type="tel"
              size="lg"
              onChange={handleChange}
              name="phone"
              value={phone}
              placeholder="Enter Phone Number"
            />
          </Stack>
        </WrapItem>
      </Wrap>

      <Button
        isLoading={isEditingDetails}
        loadingText="Updating..."
        maxW={176}
        colorScheme="primary"
        h={57}
        type="submit"
        size="lg"
      >
        Update
      </Button>
    </Stack>
  );
}
