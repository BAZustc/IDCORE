import { NextPage } from "next";
import dayjs from "dayjs";
import { fromTerraAmount } from "@arthuryeti/terra";
import { Box, Flex, Text, HStack, Circle } from "@chakra-ui/react";

import { useTVL } from "hooks/useTVL";

import Card from "components/Card";
import LineChart from "components/LineChart";

const TVL: NextPage = () => {
  const { total, graph } = useTVL();

  const dataChart = graph.map((item) => {
    return {
      label: dayjs(item.createdAt).format("MMM D"),
      value: item.value,
    };
  }).reverse();

  return (
    <Card h="full">
      <Flex align="baseline" justify="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Total Value Locked
        </Text>
        <HStack align="baseline">
          <Text
            color="brand.500"
            fontWeight="700"
            fontSize="2xl"
            lineHeight="1"
          >
            {fromTerraAmount(total, "0,0")}
          </Text>
          <Text color="brand.500" fontWeight="700" lineHeight="1">
            UST
          </Text>
        </HStack>
      </Flex>
      <Box height="275" mt="12">
        <LineChart data={dataChart} />
      </Box>
    </Card>
  );
};

export default TVL;
