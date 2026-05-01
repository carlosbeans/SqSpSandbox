import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";
import { PageHeader, Table, Drawer, Accordion } from "@sqs/rosetta-compositions";
import { Button, Text, Touchable, Flex } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-elements";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Ellipses, Refresh } from "@sqs/rosetta-icons";
import type { TableColumnDef } from "@sqs/rosetta-compositions";
import { Stack } from "@sqs/rosetta-elements";

import "./Domains.scss";


interface Domain {
  thumbnailImage: string;
  domainName: string;
  domainStatus: string;
  domainProvider: string;
  expirationDate: string;
}

interface DomainsData {
  domains: Domain[];
}

type ChipStatus = "default" | "error" | "warning" | "success";

function getChipStatus(status: string): ChipStatus {
  const s = status.toLowerCase();
  if (s === "active") return "success";
  if (s === "transfer-in-progress" || s === "transfer in progress")
    return "warning";
  if (s === "transfer-canceled" || s === "transfer canceled") return "error";
  return "default";
}

function getStatusLabel(status: string): string {
  const s = status.toLowerCase();
  if (s === "active") return "Active";
  if (s === "transfer-in-progress") return "Transfer in progress";
  if (s === "transfer-canceled") return "Transfer canceled";
  if (s === "pending-renewal") return "Pending renewal";
  if (s === "pending") return "Pending";
  return status;
}

function formatExpiration(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function DomainCell({
  domainName,
  thumbnailImage,
}: {
  domainName: string;
  thumbnailImage: string;
}) {
  return (
    <div className="domainCell">
      <div className="domainThumbnail">
        {thumbnailImage && <img src={thumbnailImage} alt={domainName} />}
      </div>
      <Text.Body m={0} color="gray.100">
        {domainName}
      </Text.Body>
    </div>
  );
}

function StatusCell({ status }: { status: string }) {
  return (
    <Chip
      label={getStatusLabel(status)}
      status={getChipStatus(status)}
      usage="badge"
    />
  );
}

function ExpirationCell({ date }: { date: string }) {
  return (
    <div className="expirationCell">
      <span className="refreshIcon">
        <Refresh />
      </span>
      <Text.Body m={0} color="gray.300">
        {formatExpiration(date)}
      </Text.Body>
    </div>
  );
}

const statusMatchesFilter = (row: any, columnId: string, filterValue: any) => {
  if (!filterValue || !Array.isArray(filterValue) || !filterValue.length) return true;
  return filterValue.includes(row.getValue(columnId));
};

const expirationWithinDays = (row: any, columnId: string, filterValue: any) => {
  if (!filterValue || !Array.isArray(filterValue) || !filterValue.length) return true;
  const days = filterValue[0];
  const expDate = new Date(row.getValue(columnId) as string);
  const now = new Date();
  const diffDays = (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
};

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Transfer in progress", value: "transfer-in-progress" },
  { label: "Action required", value: "action-required" },
  { label: "Expired", value: "expired" },
  { label: "Registration failed", value: "registration-failed" },
  { label: "Pending renewal", value: "pending-renewal" },
];

const expirationOptions = [
  { label: "30 days or less", value: 30 },
  { label: "60 days", value: 60 },
  { label: "90 days", value: 90 },
  { label: "180 days", value: 180 },
];

function CheckboxOption({ label, isChecked, onClick }: { label: string; isChecked: boolean; onClick: () => void }) {
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
          borderRadius: 3,
          border: "2px solid",
          borderColor: isChecked ? "gray.100" : "gray.400",
          bg: isChecked ? "gray.100" : "transparent",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {isChecked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Flex>
      <Text.Body m={0}>{label}</Text.Body>
    </Flex>
  );
}

function RadioOption({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) {
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
      <Text.Body m={0}>{label}</Text.Body>
    </Flex>
  );
}

function ResetButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <Button.Base
      onClick={onClick}
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
  );
}

function FilterSideSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const table = Table.useTable();

  const expirationColumn = table.getColumn("expirationDate");
  const expirationFilterValue = expirationColumn?.getFilterValue();
  const selectedExpiration = Array.isArray(expirationFilterValue) ? expirationFilterValue[0] : null;

  const statusColumn = table.getColumn("domainStatus");
  const statusFilterValue = statusColumn?.getFilterValue();
  const selectedStatuses: string[] = Array.isArray(statusFilterValue) ? statusFilterValue : [];

  const setSelectedExpiration = (value: number | null) => {
    expirationColumn?.setFilterValue(value !== null ? [value] : undefined);
  };

  const toggleStatus = (value: string) => {
    const next = selectedStatuses.includes(value)
      ? selectedStatuses.filter((s) => s !== value)
      : [...selectedStatuses, value];
    statusColumn?.setFilterValue(next.length ? next : undefined);
  };

  const handleReset = () => {
    setSelectedExpiration(null);
    statusColumn?.setFilterValue(undefined);
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
                  label="Status"
                  interiorAccessory={
                    selectedStatuses.length > 0 ? (
                      <ResetButton onClick={(e) => { e.stopPropagation(); statusColumn?.setFilterValue(undefined); }} />
                    ) : null
                  }
                />
                <Accordion.Body py={2}>
                  <Stack space={0}>
                    {statusOptions.map((opt) => (
                      <CheckboxOption
                        key={opt.value}
                        label={opt.label}
                        isChecked={selectedStatuses.includes(opt.value)}
                        onClick={() => toggleStatus(opt.value)}
                      />
                    ))}
                  </Stack>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header
                  label="Expiration"
                  interiorAccessory={
                    selectedExpiration !== null ? (
                      <ResetButton onClick={(e) => { e.stopPropagation(); setSelectedExpiration(null); }} />
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
            <Button.Tertiary onClick={handleReset}>Reset Filters</Button.Tertiary>
            <Button.Primary onClick={onClose}>Done</Button.Primary>
          </Drawer.Footer>
        </Drawer.SideSheet>
      </Drawer.Transition>
    </Drawer.Modal>
  );
}

function ClickableBodyRow(props: any) {
  const navigate = useNavigate();
  const domainName = props.row.original.domainName;
  const handleClick = () => {
    navigate(`/domains/${encodeURIComponent(domainName)}`);
  };
  return (
    <Table.List.Body.Row
      {...props}
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
    />
  );
}

export default function Domains() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      const response = await loadJsonData<DomainsData>("domains");
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setDomains(response.data.domains);
      }
    };
    fetchDomains();
  }, []);

  const columns = useMemo<TableColumnDef<Domain, any>[]>(
    () => [
      {
        accessorKey: "domainName",
        header: "Domain",
        cell: (info) => (
          <DomainCell
            domainName={info.getValue() as string}
            thumbnailImage={info.row.original.thumbnailImage}
          />
        ),
        meta: {
          headCellProps: { sx: { width: "49%" } },
        },
      },
      {
        accessorKey: "domainStatus",
        header: "Status",
        cell: (info) => <StatusCell status={info.getValue() as string} />,
        filterFn: "statusMatchesFilter" as any,
        meta: {
          headCellProps: { sx: { width: "14%" } },
        },
      },
      {
        accessorKey: "domainProvider",
        header: "Provider",
        cell: (info) => (
          <Text.Body m={0} color="gray.300">
            {info.getValue() as string}
          </Text.Body>
        ),
        meta: {
          headCellProps: { sx: { width: "18%" } },
        },
      },
      {
        accessorKey: "expirationDate",
        header: "Expiration",
        cell: (info) => <ExpirationCell date={info.getValue() as string} />,
        filterFn: "expirationWithinDays" as any,
      },
    ],
    [],
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <Stack>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Domains" />
          <PageHeader.Actions>
            <Breakpoint.Provider>
              <Breakpoint.Renderer
                render={{
                  default: () => (
                    <>
                      <Button.Tertiary>Transfer Domain</Button.Tertiary>
                      <Button.Primary
                        onClick={() =>
                          window.open(
                            "https://domains.squarespace.com/",
                            "_blank",
                          )
                        }
                      >
                        Get a Domain
                      </Button.Primary>
                    </>
                  ),
                  "mobile-0": () => (
                    <Touchable.Element.Icon
                      aria-label="Extra Options"
                      onClick={() => {}}
                    >
                      <Ellipses />
                    </Touchable.Element.Icon>
                  ),
                }}
              />
            </Breakpoint.Provider>
          </PageHeader.Actions>
        </PageHeader.Body>
      </PageHeader>
      <Stack mx={4}>
        <Table
          columns={columns}
          data={domains}
          enableSearch
          enableFilter
          enableSort
          filterFns={{ expirationWithinDays, statusMatchesFilter }}
        >
          <Table.Controls showTopBorder showBottomBorder>
            <Table.Controls.Left>
              <Table.Search placeholder="Search" />
            </Table.Controls.Left>
            <Table.Controls.Right>
              <Table.Filter onClick={() => setFilterOpen(true)} />
              <Table.Sort
                sortingOptions={[
                  { id: "domainName", ascLabel: "Domain A–Z", descLabel: "Domain Z–A" },
                  { id: "domainProvider", ascLabel: "Provider A–Z", descLabel: "Provider Z–A" },
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
            <Table.List.Body
              renderBodyRow={(props) => <ClickableBodyRow {...props} />}
            />
          </Table.List>
        </Table>
      </Stack>
    </Stack>
  );
}
