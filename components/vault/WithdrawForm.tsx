import React, { FC, useEffect } from "react";
import { Box, HStack, chakra, Button, useToast } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/vault";
import { useFeeToString } from "@arthuryeti/terra";

type IFormInputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  token: string;
  vault: any;
  onClose: () => void;
};

const WithdrawForm: FC<Props> = ({ token: tokenContract, vault, onClose }) => {
  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: tokenContract ?? "uluna",
      },
    },
  });
  const token = watch("token");

  const withdrawState = useWithdraw({
    // lpToken: lpToken,
    contract: vault.contract_addr,
    amount: toAmount(token.amount),
  });

  useEffect(() => {
    if (withdrawState.result?.success) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawState.result]);

  const submit = async () => {
    withdrawState.withdraw();
  };

  const feeString = useFeeToString(withdrawState.fee);

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full">
        <Controller
          name="token"
          control={control}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Box mt="6">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      <HStack spacing="6" width="full" mt="8">
        <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" variant="primary" size="lg" flex="1">
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default WithdrawForm;
