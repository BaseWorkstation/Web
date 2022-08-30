import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import SubscriptionPlans from "components/SubscriptionPlans/SubscriptionPlans";
import Spinner from "components/Spinner/Spinner";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { toastError } from "utils/helpers";
import { nanoid } from "@reduxjs/toolkit";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentPlans } from "redux/slices/paymentSlice";

export default function TeamSubscription({
  teamLoading,
  teamMembers,
  handleChoosePlan,
}) {
  const { paymentPlans, loading } = useSelector((state) => state.payments);
  const { userDetails } = useSelector((state) => state.user);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [reference, setReference] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // If plans havent been fetched, then fetch them
    if (!paymentPlans.length) {
      dispatch(fetchPaymentPlans());
    }
  }, []);

  const config = {
    reference,
    email: userDetails?.email,
    amount: selectedPlan?.price_per_month * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    firstname: userDetails?.first_name,
    lastname: userDetails?.last_name,
    plan: selectedPlan?.plan_code,
  };
  const initializePayment = usePaystackPayment(config);

  const onSuccess = ({ reference }) => {
    handleChoosePlan(
      selectedPlan?.plan_code,
      reference,
      selectedMember.id,
      "Team"
    );
    setReference("");
  };

  const onClosed = () => {
    setReference("");
  };

  useEffect(() => {
    if (reference) {
      initializePayment(onSuccess, onClosed);
    }
  }, [reference]);

  const openPaymentWindow = async (id) => {
    try {
      const uniqueReference = `base_plan_${nanoid()}`;
      setReference(uniqueReference);
    } catch (error) {
      toastError(null, error);
    }
  };

  const isLoading = loading === "ADD_PAYMENT_METHOD";

  if (teamLoading) return <Spinner />;

  if (!teamMembers.data?.length && !teamMembers.unregistered_members?.length)
    return (
      <Text textAlign="center">
        When you add members to your team, they will appear here
      </Text>
    );

  return (
    <Stack w="full" spacing={[4, 8]} divider={<StackDivider />}>
      <TableContainer>
        <Table variant="simple">
          <Thead color="primary.500">
            <Tr>
              <Th
                textTransform="capitalize"
                fontSize="md"
                color="primary.500"
                pl={0}
              >
                Name
              </Th>

              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Email address
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Current Plan
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="primary.500">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamMembers.data.map((member) => {
              const memberPlan = member?.payment_methods?.find(
                ({ method }) => method === "plan"
              )?.plan;

              return (
                <Tr key={member.id}>
                  <Td textTransform="capitalize" py={4} pl={0}>
                    {member.first_name} {member.last_name}
                  </Td>
                  <Td py={4}>{member.email}</Td>
                  <Td py={4}>
                    {memberPlan ? (
                      <Box as="span" fontWeight="bold" color="primary.500">
                        {memberPlan?.name}
                      </Box>
                    ) : (
                      "None"
                    )}
                  </Td>
                  <Td py={4}>
                    <Menu gutter={2}>
                      <MenuButton
                        as={Button}
                        onClick={() => setSelectedMember(member)}
                        fontWeight={500}
                        colorScheme="default"
                        color="primary.500"
                        isLoading={isLoading}
                        variant="ghost"
                        iconSpacing={2}
                        rightIcon={<ChevronDownIcon />}
                      >
                        Buy Plan
                      </MenuButton>
                      <MenuList>
                        {paymentPlans.map((plan) => (
                          <MenuItem
                            onClick={() => {
                              setSelectedPlan(plan);
                              openPaymentWindow();
                            }}
                            key={plan.id}
                          >
                            {plan.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
