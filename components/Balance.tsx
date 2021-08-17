import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { useBalance, useTokenInfo } from "@arthuryeti/terra";

import { formatAsset } from "libs/parse";

type Props = {
  asset: string;
};

const Balance: FC<Props> = ({ asset }) => {
  const { getSymbol } = useTokenInfo();
  const balance = useBalance(asset);

  return (
    <Text>
      <Text as="span" variant="light">
        Balance:
      </Text>{" "}
      <Text as="span" fontSize="sm" fontWeight="500">
        {formatAsset(balance, getSymbol(asset))}
      </Text>
    </Text>
  );
};

export default Balance;
