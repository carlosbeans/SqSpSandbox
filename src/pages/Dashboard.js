import React from "react";

import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { Text, Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-react/button/next";
import { PageHeader, Table, ActionList } from "@sqs/rosetta-compositions";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Touchable } from "@sqs/rosetta-primitives";
import { Ellipses, Portfolio, TextAlignJustify } from "@sqs/rosetta-icons";
import { Stack, SegmentedControl } from "@sqs/rosetta-elements";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_ENTRANCE, EASE_EXIT } from "../constants/motion";
import SiteThumbnail from "../components/SiteThumbnail/SiteThumbnail";

const columnHelper = Table.Utils.createColumnHelper();

const websiteData = [
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 1.jpg",
    name: "Portfolio Site",
    domain: "portfolio.example.com",
    role: "Owner",
    features: ["Website"],
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 2.jpg",
    name: "Online Store",
    domain: "shop.example.com",
    role: "Owner",
    features: ["Website", "Selling"],
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 3.jpg",
    name: "Company Blog",
    label: "Internal",
    domain: "blog.example.com",
    role: "Editor",
    features: ["Website", "Email Campaigns"],
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 4.jpg",
    name: "Marketing Site",
    label: "Internal",
    domain: "marketing.example.com",
    role: "Admin",
    features: ["Website", "Selling", "Email Campaigns"],
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 1.jpg",
    name: "Client Project",
    domain: "client.example.com",
    role: "Contributor",
    features: ["Website", "Domains"],
  },
];

const layoutVariants = {
  initial: { opacity: 0 },
  animate: (reduceMotion) => ({
    opacity: 1,
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.18, ease: EASE_ENTRANCE },
  }),
  exit: (reduceMotion) => ({
    opacity: 0,
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.15, ease: EASE_EXIT },
  }),
};

function NameCell({ name, label }) {
  return (
    <Flex flexDirection="column">
      <Text.Body m={0}>{name}</Text.Body>
      {label && (
        <Text.Body m={0} color="gray.300" fontSize={1}>
          {label}
        </Text.Body>
      )}
    </Flex>
  );
}

function OverflowMenu() {
  return (
    <ActionList.PopOver
      renderTrigger={({ toggleActionListOpen }) => (
        <button
          onClick={toggleActionListOpen}
          aria-label="More options"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <Ellipses css={{ width: 20, height: 20 }} />
        </button>
      )}
      position="bottom-center"
    >
      {({ onRequestClose }) => (
        <Flex as="ul" bg="white" flexDirection="column" py={1}>
          <ActionList.Item onClick={onRequestClose}>Edit</ActionList.Item>
          <ActionList.Item onClick={onRequestClose}>Remove</ActionList.Item>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}

const websiteColumns = [
  columnHelper.accessor("thumbnail", {
    header: "",
    enableSorting: false,
    cell: (info) => <SiteThumbnail size="xsmall" src={info.getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <NameCell name={info.getValue()} label={info.row.original.label} />
    ),
  }),
  columnHelper.accessor("domain", {
    header: "Domain",
    cell: (info) => <Text.Body m={0}>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => <Text.Body m={0}>{info.getValue()}</Text.Body>,
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    enableSorting: false,
    cell: () => <OverflowMenu />,
    meta: {
      headCellProps: { sx: { width: "1%", textAlign: "right" } },
    },
  }),
];

function SiteGridRecord({ record }) {
  const site = record.original;

  return (
    <Flex borderBottom={1} borderColor="border.default" gap={4} py={4}>
      <SiteThumbnail size="grid" src={site.thumbnail} />
      <Flex flexDirection="column" gap={2} sx={{ flex: "1 1 auto", minWidth: 0 }}>
        <Flex alignItems="flex-start" justifyContent="space-between" gap={2}>
          <Flex flexDirection="column">
            <Text.Body m={0} fontWeight="medium">
              {site.name}
            </Text.Body>
            <Text.Body m={0} color="gray.300">
              {site.domain}
            </Text.Body>
            {site.label && <Text.Body m={0}>{site.label}</Text.Body>}
          </Flex>
          <OverflowMenu />
        </Flex>
        {site.features?.length > 0 && (
          <Flex flexWrap="wrap" gap={2}>
            {site.features.map((feature) => (
              <Button.Alt
                key={feature}
                size="small"
                sx={{ textTransform: "uppercase" }}
              >
                {feature}
              </Button.Alt>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default function Dashboard() {
  const [layout, setLayout] = React.useState("list");
  const reduceMotion = useReducedMotion();

  return (
    <ThemeContext.Provider theme={rosetta.light}>
      <Table
        columns={websiteColumns}
        data={websiteData}
        enableSearch
        enableColumnHeaderSort
        enablePagination
        initialState={{ pagination: { pageSize: 10 } }}
      >
        <PageHeader maxWidth="100%">
          <PageHeader.Body>
            <PageHeader.Title title="Dashboard" />
            <PageHeader.Actions flexWrap="wrap" justifyContent="flex-end">
              <Breakpoint.Provider>
                <Breakpoint.Renderer
                  render={{
                    default: () => (
                      <>
                        <SegmentedControl
                          aria-label="Layout"
                          onChange={setLayout}
                          value={layout}
                          variant="compact"
                        >
                          <SegmentedControl.Option label="Grid view" value="grid">
                            <Portfolio />
                          </SegmentedControl.Option>
                          <SegmentedControl.Option label="List view" value="list">
                            <TextAlignJustify />
                          </SegmentedControl.Option>
                        </SegmentedControl>
                        <Table.Search
                          placeholder="Search"
                          sx={{ width: "auto", minWidth: 160, maxWidth: 240 }}
                        />
                        <Button.Strong>Create Website</Button.Strong>
                      </>
                    ),
                    "mobile-0": () => (
                      <>
                        <Button.Strong>Create Website</Button.Strong>
                        <Touchable.Element.Icon
                          aria-label="Extra Options"
                          onClick={() => {}}
                        >
                          <Ellipses />
                        </Touchable.Element.Icon>
                      </>
                    ),
                  }}
                />
              </Breakpoint.Provider>
            </PageHeader.Actions>
          </PageHeader.Body>
        </PageHeader>
        <Stack space={4} px={6}>
          <AnimatePresence mode="wait">
            <motion.div
              key={layout}
              custom={reduceMotion}
              variants={layoutVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {layout === "list" ? (
                <Table.List>
                  <Table.List.Head />
                  <Table.List.Body />
                </Table.List>
              ) : (
                <Table.Grid
                  renderRecord={SiteGridRecord}
                  borderTop={1}
                  borderColor="border.default"
                  sx={{ gridTemplateColumns: "1fr", gap: 0 }}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <Table.Controls showTopBorder>
            <Table.Controls.Right>
              <Table.Pagination>
                <Table.Pagination.ItemRangeLabel unit="items" />
              </Table.Pagination>
            </Table.Controls.Right>
          </Table.Controls>
        </Stack>
      </Table>
    </ThemeContext.Provider>
  );
}
