import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";
import { PageHeader, Table } from "@sqs/rosetta-compositions";
import { Button, Text, Touchable } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-elements";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Ellipses, Refresh } from "@sqs/rosetta-icons";
import type { TableColumnDef } from "@sqs/rosetta-compositions";

import "../styles/styles.scss";
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
      },
    ],
    [],
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
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
      <div className="domainsDashboard">
        <Table columns={columns} data={domains} enableColumnHeaderSort>
          <Table.Controls showTopBorder>
            <Table.Controls.Right></Table.Controls.Right>
          </Table.Controls>
          <Table.List>
            <Table.List.Head />
            <Table.List.Body
              renderBodyRow={(props) => <ClickableBodyRow {...props} />}
            />
          </Table.List>
        </Table>
      </div>
    </div>
  );
}
