import * as React from "react";
import { Dropdown } from "@sqs/rosetta-react/dropdown/next";
import { Box } from "@sqs/rosetta-primitives";

/**
 * Global domain switcher for the left rail. Shows the domain currently in
 * view and lets the user jump to any other domain, landing on the same
 * relative page (settings tab, website, pay-links, etc.).
 */
export default function DomainSwitcher({ domains, currentDomainName, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const options = React.useMemo(
    () =>
      (domains ?? []).map((domain) => ({
        label: domain.domainName,
        value: domain.domainName,
      })),
    [domains],
  );

  if (!domains || domains.length === 0) {
    return null;
  }

  return (
    <Box px={6} pb={3}>
      <Dropdown.Root
        variant="default"
        options={options}
        value={currentDomainName}
        onValueChange={onChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Dropdown.Trigger aria-label="Switch domain" sx={{ width: "100%" }}>
          <Dropdown.Trigger.Value placeholder="Select a domain" />
          <Dropdown.Trigger.Icon />
        </Dropdown.Trigger>
        {isOpen && (
          <Dropdown.Portal>
            <Dropdown.Positioner>
              <Dropdown.List>
                {options.map((option) => (
                  <Dropdown.Option key={option.value} option={option}>
                    <Dropdown.Option.Label>{option.label}</Dropdown.Option.Label>
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown.Positioner>
          </Dropdown.Portal>
        )}
      </Dropdown.Root>
    </Box>
  );
}
