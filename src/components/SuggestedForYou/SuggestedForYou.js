import * as React from "react";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Image, Stack } from "@sqs/rosetta-elements";
import { Spotlight } from "@sqs/rosetta-dashboard";
import { Text } from "@sqs/rosetta-react/text/next";
import { Business, Website } from "@sqs/rosetta-icons";

/**
 * Domain Overview — "Suggested for you" cross-sell module. Rosetta's
 * `Spotlight` (aliased `Tip` / `FeaturePromo` / `Insight`) is a structural
 * match for these cards.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 */
const OFFERS = [
  {
    key: "website",
    icon: Website,
    description:
      "Bring your custom website to life using the power of Blueprint AI.",
    badge: "Free 14-day trial",
    ctaLabel: "Create Website",
    image: "/assets/websitePreviewThumb.png",
  },
  {
    key: "llc",
    icon: Business,
    description:
      "Make it official with Business Formation, backed by a team of experts.",
    badge: "LLC plans from $249/yr",
    ctaLabel: "Form an LLC",
    image: "/assets/upsellImg1.png",
  },
];

function OfferCard({ offer }) {
  const Icon = offer.icon;
  return (
    <Spotlight sx={{ backgroundColor: "#f2f1ec", height: "100%" }}>
      <Spotlight.Body>
        <Spotlight.Column>
          <Icon css={{ width: 24, height: 24, color: "gray.300" }} />
          <Text.Body m={0}>{offer.description}</Text.Body>
          <Text.Body.Small m={0} sx={{ color: "gray.400" }}>
            {offer.badge}
          </Text.Body.Small>
        </Spotlight.Column>
        <Spotlight.Actions>
          <Spotlight.Actions.Button>{offer.ctaLabel}</Spotlight.Actions.Button>
        </Spotlight.Actions>
      </Spotlight.Body>
      <Spotlight.ImageContainer>
        <Image
          src={offer.image}
          alt=""
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Spotlight.ImageContainer>
    </Spotlight>
  );
}

export default function SuggestedForYou() {
  const [startIndex, setStartIndex] = React.useState(0);

  const handleCycle = (direction) => () => {
    setStartIndex(
      (prev) => (prev + direction + OFFERS.length) % OFFERS.length,
    );
  };

  const orderedOffers = React.useMemo(
    () => [...OFFERS.slice(startIndex), ...OFFERS.slice(0, startIndex)],
    [startIndex],
  );

  return (
    <Stack space={4} id="suggestedForYou">
      <Flex alignItems="center" justifyContent="space-between">
        <Text.Heading.Small as="h2" m={0}>
          Suggested for you
        </Text.Heading.Small>
        <Spotlight.Actions.Arrows
          flexGrow={0}
          handleClickLeft={handleCycle(-1)}
          handleClickRight={handleCycle(1)}
        />
      </Flex>
      <Flex gap={4} flexWrap="wrap">
        {orderedOffers.map((offer) => (
          <Box key={offer.key} sx={{ flex: "1 1 360px", minWidth: 280 }}>
            <OfferCard offer={offer} />
          </Box>
        ))}
      </Flex>
    </Stack>
  );
}
