import React from "react";
import { Stack, Card, TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Checkmark, ChevronSmallDown } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";

const INDUSTRIES = [
  "interior design",
  "architecture",
  "photography",
  "restaurant",
  "fitness",
  "consulting",
];

function IndustryDropdown({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <Box ref={rootRef} sx={{ position: "relative", display: "inline-flex" }}>
      <Box
        as="button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "gray.300",
          font: "inherit",
          fontSize: 3,
          lineHeight: "27px",
        }}
      >
        <Box
          as="span"
          sx={{
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {value}
        </Box>
        <ChevronSmallDown css={{ width: 16, height: 16 }} />
      </Box>
      {open && (
        <Box
          role="listbox"
          sx={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 10,
            bg: "white",
            border: "1px solid",
            borderColor: "gray.800",
            borderRadius: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minWidth: 221,
            py: 1,
          }}
        >
          {INDUSTRIES.map((option) => (
            <Box
              key={option}
              as="button"
              type="button"
              role="option"
              aria-selected={option === value}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              sx={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 2,
                lineHeight: "22px",
                color: option === value ? "gray.100" : "gray.200",
                "&:hover": { bg: "gray.950" },
              }}
            >
              {option}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

function AICrossSellCard() {
  const [industry, setIndustry] = React.useState("interior design");

  return (
    <Card
      sx={{
        bg: "#f2f1ec",
        border: "1px solid",
        borderColor: "gray.900",
        borderRadius: 1,
        overflow: "hidden",
        p: 0,
      }}
    >
      <Flex alignItems="stretch" sx={{ width: "100%" }}>
        {/* Left content */}
        <Flex
          direction="column"
          justifyContent="space-between"
          sx={{
            flex: "1 0 0",
            minWidth: 0,
            py: 5,
            px: 6,
            gap: 4,
          }}
        >
          <Flex
            flexWrap="wrap"
            alignItems="center"
            sx={{ rowGap: 0, columnGap: 1 }}
          >
            <Text.Body
              m={0}
              sx={{
                fontSize: 3,
                lineHeight: "27px",
                color: "gray.100",
                whiteSpace: "nowrap",
              }}
            >
              Bring your custom
            </Text.Body>
            <IndustryDropdown value={industry} onChange={setIndustry} />
            <Text.Body
              m={0}
              sx={{
                fontSize: 3,
                lineHeight: "27px",
                color: "gray.100",
                whiteSpace: "nowrap",
              }}
            >
              website to life using the power of Blueprint AI.
            </Text.Body>
          </Flex>
          <Flex gap={4} alignItems="center">
            <Button.Primary>Create Website</Button.Primary>
            <Button.Tertiary>Connect Existing Website</Button.Tertiary>
          </Flex>
        </Flex>

        {/* Right image */}
        <Box
          sx={{
            flex: "0 0 auto",
            width: 256,
            alignSelf: "stretch",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/websitePreviewThumb.png"
            alt="Website preview"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top left",
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}

function SSLBanner() {
  return (
    <Flex
      alignItems="center"
      gap={2}
      sx={{
        bg: "gray.950",
        px: 3,
        py: 3,
        borderRadius: 1,
      }}
    >
      <Checkmark css={{ width: 16, height: 16, flex: "0 0 auto" }} />
      <Text.Body m={0} sx={{ flex: "1 0 0", minWidth: 0 }}>
        Squarespace automatically generates and renews an SSL certificate for
        your website for free, ensuring your visitors have a secure and
        encrypted connection
      </Text.Body>
    </Flex>
  );
}

function DomainForwardingSection() {
  return (
    <Stack space={2}>
      <Text.Title as="h2">Domain Forwarding</Text.Title>
      <Text.Body m={0} color="gray.300" sx={{ maxWidth: 900 }}>
        Forward your domain or subdomains to another site.{" "}
        <TextLink href="#">Learn more</TextLink>
      </Text.Body>
    </Stack>
  );
}

export default function Website() {
  usePageHeader({
    title: "Website",
    subtitle: "Manage your domain’s connection to a website.",
  });

  return (
    <Flex flexDirection="column" gap={8} px={6} pt={2} pb={6} id="websitePage">
      <AICrossSellCard />
      <SSLBanner />
      <DomainForwardingSection />
    </Flex>
  );
}
