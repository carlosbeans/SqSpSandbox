import React from "react";

import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { Button, Text } from "@sqs/rosetta-primitives";
import { PageHeader, Table, Search } from "@sqs/rosetta-compositions";
import { Banner } from "@sqs/rosetta-compositions/banner/next";
import { Breakpoint, Keyboard, withFocusManagedDivider } from "@sqs/rosetta-utilities";
import { Touchable } from "@sqs/rosetta-primitives";
import { Print, Ellipses } from "@sqs/rosetta-icons";
import { SegmentedControl, Stack, Cell, Divider } from "@sqs/rosetta-elements";
import SiteThumbnail from "../components/SiteThumbnail/SiteThumbnail";

const columnHelper = Table.Utils.createColumnHelper();

const websiteColumns = [
  columnHelper.accessor("thumbnail", {
    header: "",
    cell: () => <SiteThumbnail size="small" />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("domain", {
    header: "Domain",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
];

const websiteData = [
  {
    thumbnail: null,
    name: "Portfolio Site",
    domain: "portfolio.example.com",
    role: "Owner",
  },
  {
    thumbnail: null,
    name: "Online Store",
    domain: "shop.example.com",
    role: "Owner",
  },
  {
    thumbnail: null,
    name: "Company Blog",
    domain: "blog.example.com",
    role: "Editor",
  },
  {
    thumbnail: null,
    name: "Marketing Site",
    domain: "marketing.example.com",
    role: "Admin",
  },
  {
    thumbnail: null,
    name: "Client Project",
    domain: "client.example.com",
    role: "Contributor",
  },
];
const FocusManagedCell = withFocusManagedDivider(Cell, Divider);

export default function Websites() {
  const [query, setQuery] = React.useState('');
  const debouncedSearch = (value) => {
    // add search logic
  };
  return (
    <ThemeContext.Provider theme={rosetta.light}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title
            subtitle="Modern solutions making it with Squarespace"
            title="Dashboard"
          />
          <PageHeader.Actions>
            <Breakpoint.Provider>
              <Breakpoint.Renderer
                render={{
                  default: () => (
                    <>
                      <FocusManagedCell
                        variant="floating"
                        p={0}
                        body={
                          <Search.Input
                            inputValue={query}
                            onChange={setQuery}
                            onKeyDown={(e) => {
                              if (Keyboard.isEnter(e)) {
                                debouncedSearch(query);
                              }
                            }}
                            placeholder="Search"
                            variant="floating"
                          />
                        }
                      />
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
        { false && (
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
      <Stack space={4}>
        <Table columns={websiteColumns} data={websiteData}>
          <Table.List>
            <Table.List.Head />
            <Table.List.Body />
          </Table.List>
        </Table>
      </Stack>
    </ThemeContext.Provider>
  );
}
