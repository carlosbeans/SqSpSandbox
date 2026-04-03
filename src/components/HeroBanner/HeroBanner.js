import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-elements";
import { Checkmark, Link as LinkIcon } from "@sqs/rosetta-icons";

/**
 * Background image slot — production can swap this for webperf's Picture + static-images:
 *
 *   import { Picture } from '@sqs/image/react';
 *   import { HERO_1, HERO_1_MOBILE } from '@sqs/static-images-design-platform';
 *
 * and pass responsive `src` / `sources` from those constants into PictureBackground.
 */
const DEFAULT_HERO = `${process.env.PUBLIC_URL || ""}/images/pay-links-hero.png`;

const imgCover = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
};

const glass = {
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  background: "rgba(255, 255, 255, 0.18)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
};

function PictureBackground({
  desktopSrc = DEFAULT_HERO,
  mobileSrc = DEFAULT_HERO,
}) {
  return (
    <Box
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      {/* Desktop / tablet image — matches reference breakpoint split */}
      <Box
        display={{
          "mobile-0": "none",
          "mobile-50": "none",
          "mobile-100": "none",
          "tablet-0": "none",
          "tablet-50": "none",
          "tablet-100": "block",
          "desktop-0": "none",
          "desktop-50": "block",
          "desktop-100": "block",
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img alt="" src={desktopSrc} style={imgCover} />
      </Box>
      {/* Mobile image */}
      <Box
        display={{
          "mobile-0": "block",
          "mobile-50": "block",
          "mobile-100": "block",
          "tablet-0": "block",
          "tablet-50": "block",
          "tablet-100": "none",
          "desktop-0": "block",
          "desktop-50": "none",
          "desktop-100": "none",
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img alt="" src={mobileSrc} style={{ ...imgCover, objectPosition: "70% center" }} />
      </Box>
    </Box>
  );
}

/** Minimal QR-like tile for decorative chrome */
function QrPlaceholder() {
  const bits =
    "111011101011101111100010101010011010101101011101101010111011101000111011101011101111100010101010011010101101";
  return (
    <Box
      sx={{
        ...glass,
        borderRadius: 3,
        p: 1,
        width: 56,
        height: 56,
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        gridTemplateRows: "repeat(9, 1fr)",
        gap: "1px",
        background: "rgba(255,255,255,0.92)",
      }}
    >
      {bits.slice(0, 81).split("").map((b, i) => (
        <Box
          key={i}
          sx={{
            borderRadius: "1px",
            background: b === "1" ? "gray.900" : "transparent",
          }}
        />
      ))}
    </Box>
  );
}

function PayPreviewCluster() {
  return (
    <Flex
      position="absolute"
      alignItems="flex-end"
      flexDirection="column"
      gap={2}
      sx={{
        pointerEvents: "none",
        right: { "mobile-0": 12, "tablet-0": 20, "desktop-50": 28 },
        bottom: { "mobile-0": 12, "tablet-0": 20, "desktop-50": 28 },
        top: "auto",
        left: "auto",
        maxWidth: { "mobile-0": 140, "tablet-0": 200, _: 240 },
        display: { "mobile-0": "none", "mobile-100": "none", "tablet-0": "flex" },
      }}
    >
      <Box position="relative" sx={{ width: "100%", maxWidth: 200 }}>
        <Flex
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={3}
          sx={{
            ...glass,
            borderRadius: 5,
            pt: 4,
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <LinkIcon
              css={{
                width: 22,
                height: 22,
                color: "white",
              }}
            />
          </Flex>
          <Text.Caption color="fg.onStrong" margin={0} sx={{ opacity: 0.9 }}>
            Pay
          </Text.Caption>
          <Text.Title color="fg.onStrong" margin={0} sx={{ fontSize: "2rem", lineHeight: 1 }}>
            $200
          </Text.Title>
        </Flex>
        <Box position="absolute" top={-8} right={-8} sx={{ zIndex: 2 }}>
          <QrPlaceholder />
        </Box>
      </Box>

      <Flex
        alignItems="center"
        gap={2}
        px={3}
        py={2}
        sx={{
          ...glass,
          borderRadius: 999,
          alignSelf: "flex-end",
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#22c55e",
            flexShrink: 0,
          }}
        >
          <Checkmark
            css={{
              width: 14,
              height: 14,
              color: "white",
            }}
          />
        </Flex>
        <Text.Body color="fg.onStrong" fontWeight="medium" margin={0}>
          Payment successful
        </Text.Body>
      </Flex>
    </Flex>
  );
}

/**
 * Hero region modeled on design-platform HeroBannerBase (image + DisplayTitle + optional glass chips + decorative pay-link chrome).
 */
export default function HeroBanner({
  title,
  chips,
  desktopImage,
  mobileImage,
  showPreviewChrome = true,
}) {
  return (
    <Flex
      backgroundColor="gray.900"
      borderRadius={6}
      flexDirection="column"
      justifyContent="space-between"
      minHeight={{ "mobile-0": 260, "tablet-0": 300, "desktop-50": 340 }}
      overflow="hidden"
      position="relative"
      width="100%"
      zIndex={1}
    >
      <PictureBackground desktopSrc={desktopImage} mobileSrc={mobileImage} />
      {/* Readability veil on the left where the headline sits */}
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        width={{ "mobile-0": "72%", "tablet-0": "55%", _: "48%" }}
        sx={{
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 70%, transparent 100%)",
        }}
      />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        zIndex={1}
        width="100%"
        minHeight="inherit"
      >
        <Text.DisplayTitle color="fg.onStrong" maxWidth={480} p={4} margin={0}>
          {title}
        </Text.DisplayTitle>
        {chips?.length > 0 && (
          <Flex alignItems="center" flexWrap="wrap" gap={1} p={4} pt={0}>
            <Text.Body color="fg.onStrong" fontWeight="medium" margin={0}>
              Popular with
            </Text.Body>
            <Flex flexWrap="wrap" gap={2}>
              {chips.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  usage="badge"
                  sx={{
                    backdropFilter: "blur(30px)",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderColor: "transparent",
                    color: "fg.onStrong",
                  }}
                />
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
      {showPreviewChrome ? <PayPreviewCluster /> : null}
    </Flex>
  );
}
