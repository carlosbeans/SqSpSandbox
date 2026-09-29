import * as React from "react";
import { Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-react/button/next";
import { ActionList } from "@sqs/rosetta-compositions";
import { ChevronSmallDown } from "@sqs/rosetta-icons";

/**
 * Domain Settings header — "Domain Actions" dropdown button.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2008-113039
 */
export default function DomainActionsMenu() {
  return (
    <ActionList.PopOver
      position="bottom-right"
      renderTrigger={({ toggleActionListOpen }) => (
        <Button.Alt
          size="large"
          icon={ChevronSmallDown}
          iconPosition="after"
          onClick={toggleActionListOpen}
          sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Domain Actions
        </Button.Alt>
      )}
    >
      {({ onRequestClose }) => (
        <Flex
          as="ul"
          bg="white"
          flexDirection="column"
          py={1}
          id="domain-settings-actions-menu"
        >
          <ActionList.Item onClick={onRequestClose}>
            Request transfer code
          </ActionList.Item>
          <ActionList.Item onClick={onRequestClose}>Move domain</ActionList.Item>
          <ActionList.Item
            onClick={onRequestClose}
            sx={{ color: "fg.danger" }}
          >
            Delete domain
          </ActionList.Item>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}
