import { Stack } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { Button, Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";

const NAMESERVER_HOSTS = [
  "ns-cloud-b1.googledomains.com",
  "ns-cloud-b2.googledomains.com",
  "ns-cloud-b3.googledomains.com",
  "ns-cloud-b4.googledomains.com",
];

function UseSquarespaceNameserversButton() {
  return (
    <Breakpoint.Provider>
      <Breakpoint.Renderer
        render={{
          default: () => (
            <Button.Primary>Use Squarespace Nameservers</Button.Primary>
          ),
          "mobile-0": () => (
            <Button.Primary>Use Squarespace Nameservers</Button.Primary>
          ),
        }}
      />
    </Breakpoint.Provider>
  );
}

/**
 * @param {{ inlineHeader?: boolean }} props
 * When `inlineHeader` is true (Domain Settings DNS tab), renders title + primary action inline.
 */
export function NameserversContent({ inlineHeader = false }) {
  const { borders, colors } = useTheme();

  return (
    <Stack
      space={6}
      px={inlineHeader ? 0 : 6}
      id={
        inlineHeader
          ? "domain-settings-nameservers-block"
          : "nameservers-page-content"
      }
    >
      {inlineHeader ? (
        <Flex
          id="domain-settings-nameservers-intro"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          flexWrap="wrap"
        >
          <Text.Subtitle>Domain Nameservers</Text.Subtitle>
          <UseSquarespaceNameserversButton />
        </Flex>
      ) : null}
      <Stack id="domain-settings-nameservers-list">
        {NAMESERVER_HOSTS.map((host) => (
          <Box
            key={host}
            py={4}
            sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
          >
            <Text.Body m={0}>{host}</Text.Body>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default function DomainNameservers() {
  usePageHeader({
    title: "Domain Nameservers",
    actions: <UseSquarespaceNameserversButton />,
  });

  return <NameserversContent inlineHeader={false} />;
}
