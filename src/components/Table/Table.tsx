import React, { useState } from "react";
import "./Table.scss";
import TableRow from "../TableRow/TableRow.tsx";
import { Cell, Divider } from "@sqs/rosetta-elements";
import { Keyboard, withFocusManagedDivider } from "@sqs/rosetta-utilities";
import { Search } from "@sqs/rosetta-compositions";

// import { Search } from "@sqs/rosetta-icons";

interface Domain {
  thumbnailImage: string;
  domainName: string;
  domainStatus: string;
  domainProvider: string;
  expirationDate: string;
}

interface TableProps {
  domains: Domain[];
}

function SortIcon() {
  return (
    <span className="sortIcon">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 0L7 3H1L4 0Z" fill="currentColor" />
        <path d="M4 8L1 5H7L4 8Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function Table({ domains = [] }: TableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDomains = domains.filter((domain) =>
    domain.domainName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const FocusManagedCell = withFocusManagedDivider(Cell, Divider);
  const [query, setQuery] = React.useState("");
  const debouncedSearch = (value) => {
    // add search logic
  };

  return (
    <div>
      <div className="tableSearchRow">
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
              sx={{ width: '100%', backgroundColor: 'transparent' }}
            />
          }
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="th colDomain">
              <span className="thLabel">
                Domain <SortIcon />
              </span>
            </th>
            <th className="th colStatus">
              <span className="thLabel">
                Status <SortIcon />
              </span>
            </th>
            <th className="th colProvider">
              <span className="thLabel">
                Provider <SortIcon />
              </span>
            </th>
            <th className="th colExpiration">
              <span className="thLabel">
                Expiration <SortIcon />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDomains.map((domain, index) => (
            <TableRow
              key={index}
              domain={domain.domainName}
              status={domain.domainStatus}
              provider={domain.domainProvider}
              expiration={domain.expirationDate}
              thumbnailImage={domain.thumbnailImage}
            />
          ))}
          {filteredDomains.length === 0 && (
            <tr>
              <td colSpan={4} className="empty-state">
                No domains found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
