import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Button,
  Text,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import ArrowDownIcon from "components/icons/ArrowDownIcon";
import WithdrawForm from "components/vault/WithdrawForm";

type Props = {
  vault: any;
};

const WithdrawModal: FC<Props> = ({ vault }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        isFullWidth
        onClick={onOpen}
      >
        Withdraw
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Deposit asset
              </Heading>
              <Text variant="light" textAlign="center" fontWeight="500" mb="8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>

              <WithdrawForm token="uusd" vault={vault} onClose={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithdrawModal;
