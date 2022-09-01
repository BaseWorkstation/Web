import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { RiTeamLine } from "react-icons/ri";
import UploadImage from "./UploadImage";

export default function TeamInfo({
  basicInfoDetails,
  handleChange,
  handleSubmit,
  isLoading,
  uploadImageFile,
  currentTeam,
}) {
  const { teamName, teamAddress, teamEmail, teamPhone } = basicInfoDetails;

  const isEditingDetails = isLoading === "EDIT_TEAM";
  const isEditingLogo = isLoading === "UPLOAD_TEAM_IMAGE";

  return (
    <Stack onSubmit={handleSubmit} as="form" pt={12} spacing={54}>
      <Stack spacing={6}>
        <Avatar
          src={currentTeam.logo?.file_path}
          icon={<RiTeamLine fontSize={60} color="white" />}
          rounded="full"
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
            <Text>Team Name</Text>
            <Input
              w="full"
              onChange={handleChange}
              name="teamName"
              value={teamName}
              size="lg"
              isRequired
              placeholder="Enter Team name"
            />
          </Stack>
        </WrapItem>
        <WrapItem>
          <Stack w={278}>
            <Text>Team Address</Text>
            <Input
              w="full"
              onChange={handleChange}
              name="teamAddress"
              value={teamAddress}
              size="lg"
              placeholder="Enter Team Address"
            />
          </Stack>
        </WrapItem>
        <WrapItem>
          <Stack w={278}>
            <Text>Team Email Address</Text>
            <Input
              w="full"
              type="email"
              onChange={handleChange}
              name="teamEmail"
              value={teamEmail}
              size="lg"
              placeholder="Enter Email Address"
            />
          </Stack>
        </WrapItem>
        <WrapItem>
          <Stack w={278}>
            <Text>Phone Number</Text>
            <Input
              w="full"
              type="tel"
              onChange={handleChange}
              name="teamPhone"
              value={teamPhone}
              size="lg"
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
