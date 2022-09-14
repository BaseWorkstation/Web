import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Spinner from "components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentPlans,
  fetchPaymentReference,
} from "redux/slices/paymentSlice";
import theme from "theme";
import { kConvert, toastError } from "utils/helpers";
import { usePaystackPayment } from "react-paystack";
import { nanoid } from "@reduxjs/toolkit";

const ctaColors = ["primary.500", "#9747FF", "gray.800"]; // Used for mapping bgColors to the CTA buttons

export default function SubscriptionPlans({ currentPlanId, onSelect }) {
  const { paymentPlans, loading } = useSelector((state) => state.payments);
  const { userDetails } = useSelector((state) => state.user);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
    onSelect(selectedPlan?.plan_code, reference);
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

  return (
    <Stack
      w="full"
      direction={["column", "column", "column", "row"]}
      pt={4}
      spacing={6}
    >
      <Spinner loading={!paymentPlans.length} />

      {paymentPlans.map((plan, index) => {
        const { id, name, price_per_month } = plan;
        const isCurrent = currentPlanId === id;

        return (
          <Stack
            key={id}
            w="full"
            maxW={320}
            border="1px solid"
            borderColor="gray.200"
            rounded={20}
            spacing={2}
            divider={<StackDivider borderColor="gray.100" />}
          >
            <Stack spacing={0} p={6} pb={3}>
              <Heading color="blue.800" fontSize="3xl">
                {name}
              </Heading>
              <Text fontSize="xl" color="gray.400">
                ₦{kConvert(price_per_month)} p/month
              </Text>
            </Stack>
            <Stack spacing={6} p={6} pt={4}>
              {[0].map((index) => (
                <HStack key={index} spacing={3}>
                  <IoIosCheckmarkCircle
                    fontSize={24}
                    color={theme.colors.primary[500]}
                  />
                  <Text key={index} color="gray.500">
                    No contracts, cancel any time
                  </Text>
                </HStack>
              ))}

              <Box pt={7}>
                <Button
                  fontWeight={500}
                  iconSpacing={4}
                  rightIcon={
                    isCurrent ? <CheckCircleIcon /> : <HiOutlineArrowRight />
                  }
                  w="full"
                  colorScheme="default"
                  isLoading={isLoading && selectedPlan?.id === id}
                  isDisabled={isLoading || isCurrent}
                  loadingText="Loading..."
                  bg={ctaColors[index]}
                  size="lg"
                  h="56px"
                  onClick={() => {
                    setSelectedPlan(plan);
                    openPaymentWindow(id);
                  }}
                >
                  {isCurrent ? "Currently Active" : "Select Plan"}
                </Button>
              </Box>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
