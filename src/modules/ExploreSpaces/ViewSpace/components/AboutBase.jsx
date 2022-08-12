import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import moment from "moment";

export default function AboutBase({ about, schedule, policies }) {
  return (
    <Stack spacing={6} rounded={20} px={[5, 8]} pt={8} pb={20} bg="white">
      <Stack spacing={4}>
        <Heading fontSize="xl" color="blue.800">
          About this Base
        </Heading>
        <Text as="span" dangerouslySetInnerHTML={{ __html: about }} />
      </Stack>

      {(schedule?.weekdays?.open_time || schedule?.weekends?.open_time) && (
        <Stack pt={6} spacing={4}>
          <Heading fontSize="xl" color="blue.800">
            Schedule:
          </Heading>
          <Stack spacing={[4, 4, 8]} direction={["column", "column", "row"]}>
            {schedule?.weekdays?.open_time && schedule?.weekdays?.close_time && (
              <Center bg="blue.800" rounded={20} w={242} h={53}>
                <Text textAlign="center" fontWeight={500} color="white">
                  Weekdays:{" "}
                  {moment(schedule?.weekdays?.open_time, "hh:mm:ss").format(
                    "hh:mm A"
                  )}{" "}
                  to{" "}
                  {moment(schedule?.weekdays?.close_time, "hh:mm:ss").format(
                    "hh:mm A"
                  )}
                </Text>
              </Center>
            )}

            {schedule?.weekends?.open_time && schedule?.weekends?.close_time && (
              <Center bg="blue.800" rounded={20} w={242} h={53}>
                <Text textAlign="center" fontWeight={500} color="white">
                  Weekends:{" "}
                  {moment(schedule?.weekends?.open_time, "hh:mm:ss").format(
                    "hh:mm A"
                  )}{" "}
                  to{" "}
                  {moment(schedule?.weekends?.close_time, "hh:mm:ss").format(
                    "hh:mm A"
                  )}
                </Text>
              </Center>
            )}
          </Stack>
        </Stack>
      )}

      <Stack pt={6} spacing={4}>
        <Heading fontSize="xl" color="blue.800">
          Other Policy:
        </Heading>

        <Text as="span" dangerouslySetInnerHTML={{ __html: policies }} />
      </Stack>
    </Stack>
  );
}
