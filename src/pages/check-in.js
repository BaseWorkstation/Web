import React from "react";
import CheckIn from "modules/CheckIn/CheckIn";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { withAuth } from "utils/withAuth";

function CheckInPage() {
  return (
    <Box>
      <Head>
        <title>Check in to a space - Base</title>
      </Head>
      <CheckIn />
    </Box>
  );
}

export default withAuth(CheckInPage);