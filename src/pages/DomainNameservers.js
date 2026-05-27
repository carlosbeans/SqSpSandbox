import { Stack } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { Button, Box } from "@sqs/rosetta-primitives";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { Flex } from "@sqs/rosetta-primitives";

export function NameserversContent() {
  const { borders, colors } = useTheme();

  return (
    <Flex flexDirection="column" gap={6} px={6}>
      <Stack>
        <Box pb={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}>ns-cloud-b1.googledomains.com
        </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b2.googledomains.com </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b3.googledomains.com </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b4.googledomains.com </Box>
        
      </Stack>
    </Flex>
  );
}

export default function DomainNameservers() {
  usePageHeader({
    title: "Domain Nameservers",
    actions: (
      <Breakpoint.Provider>
        <Breakpoint.Renderer
          render={{
            default: () => (
              <Button.Primary size="large">Use Squarespace Nameservers</Button.Primary>
            ),
            "mobile-0": () => (
              <Button.Primary>Use Squarespace Nameservers</Button.Primary>
            ),
          }}
        />
      </Breakpoint.Provider>
    ),
    subtitle: "Use Squarespace Nameservers to manage your domain's nameservers. Learn more about nameservers",
  });

  return <NameserversContent />;
}
