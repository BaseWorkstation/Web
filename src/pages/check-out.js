import React from "react";
import CheckOut from "modules/CheckOut/CheckOut";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { withAuth } from "utils/withAuth";

function CheckOutPage() {
  return (
    <Box>
      <Head>
        <title>Check out to a space - Base</title>
      </Head>
      <CheckOut />
    </Box>
  );
}

export default withAuth(CheckOutPage);
