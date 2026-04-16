import React from "react";

import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { Button, Text, Flex } from "@sqs/rosetta-primitives";
import { PageHeader, Table, Drawer, Accordion, Banner } from "@sqs/rosetta-compositions";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Touchable } from "@sqs/rosetta-primitives";
import { Ellipses } from "@sqs/rosetta-icons";
import { Stack, Cell, Divider } from "@sqs/rosetta-elements";
import { withFocusManagedDivider } from "@sqs/rosetta-utilities";
import SiteThumbnail from "../components/SiteThumbnail/SiteThumbnail";

const FocusManagedCell = withFocusManagedDivider(Cell, Divider);

const columnHelper = Table.Utils.createColumnHelper();

const websiteColumns = [
  columnHelper.accessor("thumbnail", {
    header: "",
    cell: (info) => <SiteThumbnail size="small" src={info.getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("domain", {
    header: "Domain",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
    filterFn: () => true,
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
];

const websiteData = [
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 1.jpg",
    name: "Portfolio Site",
    domain: "portfolio.example.com",
    role: "Owner",
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 2.jpg",
    name: "Online Store",
    domain: "shop.example.com",
    role: "Owner",
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 3.jpg",
    name: "Company Blog",
    domain: "blog.example.com",
    role: "Editor",
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 4.jpg",
    name: "Marketing Site",
    domain: "marketing.example.com",
    role: "Admin",
  },
  {
    thumbnail: "/assets/screenshots/connected/Thumbnail - 1.jpg",
    name: "Client Project",
    domain: "client.example.com",
    role: "Contributor",
  },
];

const expirationOptions = [
  { label: "30 days or less", value: 30 },
  { label: "60 days", value: 60 },
  { label: "90 days", value: 90 },
  { label: "180 days", value: 180 },
];

function RadioOption({ label, isSelected, onClick }) {
  return (
    <Flex
      as="button"
      type="button"
      alignItems="center"
      gap={3}
      onClick={onClick}
      sx={{
        background: "none",
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        padding: 0,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 20,
          height: 20,
          minWidth: 20,
          minHeight: 20,
          borderRadius: "50%",
          border: "2px solid",
          borderColor: isSelected ? "gray.100" : "gray.400",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Flex
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bg: isSelected ? "gray.100" : "transparent",
            position: "absolute",
          }}
        />
      </Flex>
      <Text.Body m={0}>
        {label}
      </Text.Body>
    </Flex>
  );
}

function FilterSideSheet({ isOpen, onClose }) {
  const table = Table.useTable();
  const domainColumn = table.getColumn("domain");
  const currentFilterValue = domainColumn?.getFilterValue();
  const selectedExpiration = Array.isArray(currentFilterValue) ? currentFilterValue[0] : null;

  const setSelectedExpiration = (value) => {
    domainColumn?.setFilterValue(value !== null ? [value] : undefined);
  };

  const handleReset = () => {
    setSelectedExpiration(null);
  };

  return (
    <Drawer.Modal isOpen={isOpen} onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Transition>
        <Drawer.SideSheet>
          <Drawer.Header>
            <Drawer.Header.TitleRow>
              <Drawer.Header.Title>Filter</Drawer.Header.Title>
              <Drawer.CloseButton onClick={onClose} />
            </Drawer.Header.TitleRow>
          </Drawer.Header>
          <Drawer.Body px={{ _: 6, "mobile-*": 4 }} py={4}>
            <Accordion allowMultipleItemsOpen>
              <Accordion.Item>
                <Accordion.Header
                  label="Expiration"
                  interiorAccessory={
                    selectedExpiration !== null ? (
                      <Button.Base
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExpiration(null);
                        }}
                        sx={{
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontSize: 1,
                          color: "fg.muted",
                          "&:hover": { color: "fg.default" },
                        }}
                      >
                        <Text.Body
                          color="inherit"
                          fontSize={1}
                          fontWeight="medium"
                          sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
                        >
                          Reset
                        </Text.Body>
                      </Button.Base>
                    ) : null
                  }
                />
                <Accordion.Body py={2}>
                  <Stack space={0}>
                    {expirationOptions.map((opt) => (
                      <RadioOption
                        key={opt.value}
                        label={opt.label}
                        isSelected={selectedExpiration === opt.value}
                        onClick={() => setSelectedExpiration(opt.value)}
                      />
                    ))}
                  </Stack>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Drawer.Body>
          <Drawer.Footer>
            <Button.Tertiary onClick={handleReset}>
              Reset Filters
            </Button.Tertiary>
            <Button.Primary onClick={onClose}>Done</Button.Primary>
          </Drawer.Footer>
        </Drawer.SideSheet>
      </Drawer.Transition>
    </Drawer.Modal>
  );
}

export default function Websites() {
  const [filterOpen, setFilterOpen] = React.useState(false);

  return (
    <ThemeContext.Provider theme={rosetta.light}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title            
            title="Dashboard"
          />
          <PageHeader.Actions>
            <Breakpoint.Provider>
              <Breakpoint.Renderer
                render={{
                  default: () => (
                    <>
                      <Button.Primary>Create Website</Button.Primary>
                    </>
                  ),
                  "mobile-0": () => (
                    <>
                      <Button.Primary>Create Website</Button.Primary>
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
        {false && (
          <Banner>
            <Banner.Main>
              <Banner.Row>
                <Banner.Glyph />
                <Banner.Column>
                  <Banner.Title>Title</Banner.Title>
                  <Banner.Body>Description</Banner.Body>
                </Banner.Column>
              </Banner.Row>
              <Banner.Action>Action</Banner.Action>
            </Banner.Main>
            <Banner.Close />
          </Banner>
        )}
      </PageHeader>
      <Stack space={4} mx={4}>
        <Table
          columns={websiteColumns}
          data={websiteData}
          enableSearch
          enableFilter
          enableSort
        >
          <Table.Controls showTopBorder showBottomBorder>
            <Table.Controls.Left>
              <Table.Search placeholder="Search" />
            </Table.Controls.Left>
            <Table.Controls.Right>
              <Table.Filter onClick={() => setFilterOpen(true)} />
              <Table.Sort
                sortingOptions={[
                  { id: "name", ascLabel: "Name A–Z", descLabel: "Name Z–A" },
                  { id: "role", ascLabel: "Role A–Z", descLabel: "Role Z–A" },
                ]}
              />
              <Table.Filter.Reset />
            </Table.Controls.Right>
          </Table.Controls>
          {filterOpen && (
            <FilterSideSheet
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
            />
          )}
          <Table.Filter.Bar />
          <Table.List>
            <Table.List.Head />
            <Table.List.Body />
          </Table.List>
        </Table>
      </Stack>
    </ThemeContext.Provider>
  );
}
