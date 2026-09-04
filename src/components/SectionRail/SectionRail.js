import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { Flex } from "@sqs/rosetta-primitives";
import { TextLink } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";

/**
 * Sticky in-page navigation rail with IntersectionObserver-driven scroll-spy.
 * Replaces a second row of Tabs for pages combining multiple long sections.
 */
export default function SectionRail({
  sections,
  onActiveChange,
  initialActiveId,
  topOffsetPx,
}) {
  const { space } = useTheme();
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState(
    initialActiveId || sections[0]?.id,
  );

  React.useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const visibleRatios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });
        const topmostVisible = sections.find(
          (section) => (visibleRatios.get(section.id) || 0) > 0,
        );
        if (topmostVisible) {
          setActiveId((prev) =>
            prev === topmostVisible.id ? prev : topmostVisible.id,
          );
        }
      },
      {
        root: null,
        rootMargin: `-${topOffsetPx + parseInt(space[2], 10)}px 0px -70% 0px`,
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections, topOffsetPx, space]);

  React.useEffect(() => {
    onActiveChange?.(activeId);
    // Only fire when the active section actually changes.
  }, [activeId]);

  const handleSelect = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveId(id);
  };

  return (
    <Flex
      as="nav"
      id="dns-section-rail"
      aria-label="DNS sections"
      flexDirection="column"
      sx={{ position: "sticky", top: topOffsetPx, alignSelf: "flex-start" }}
    >
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <TextLink
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) => {
              event.preventDefault();
              handleSelect(section.id);
            }}
            px={3}
            fontWeight={isActive ? "medium" : "regular"}
            color={isActive ? "gray.100" : "gray.300"}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              minHeight: space[8],
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {section.label}
          </TextLink>
        );
      })}
    </Flex>
  );
}
