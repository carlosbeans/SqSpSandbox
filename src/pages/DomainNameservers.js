import { PageHeader } from "@sqs/rosetta-compositions";
import { Stack } from "@sqs/rosetta-elements";
import { borders, colors } from "@sqs/rosetta-tokens";
import { Button, Box } from "@sqs/rosetta-primitives";
import { Breakpoint } from "@sqs/rosetta-utilities";
export default function DomainNameservers() {
  return (
    <Stack space={6}>
      <Stack>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title title="Domain Nameservers" />
            <PageHeader.Actions>
              <Breakpoint.Provider>
                <Breakpoint.Renderer
                  render={{
                    default: () => (
                      <>
                        <Button.Primary>
                          Use Squarespace Nameservers
                        </Button.Primary>
                      </>
                    ),
                    "mobile-0": () => (
                      <>
                        <Button.Primary>
                          Use Squarespace Nameservers
                        </Button.Primary>
                      </>
                    ),
                  }}
                />
              </Breakpoint.Provider>
            </PageHeader.Actions>
          </PageHeader.Body>
        </PageHeader>
      </Stack>
      <Stack>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}>ns-cloud-b1.googledomains.com
        </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b2.googledomains.com </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b3.googledomains.com </Box>
        <Box py={4} sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}> ns-cloud-b4.googledomains.com </Box>
        
      </Stack>
    </Stack>
  );
}
