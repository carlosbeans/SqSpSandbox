import React, { useState, useEffect } from "react";
import Table from "../components/Table/Table.tsx";
import { loadJsonData } from "../utils/dataUtils.ts";
import { PageHeader, Banner } from "@sqs/rosetta-compositions";
import { Button, Touchable } from "@sqs/rosetta-primitives";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Print, Ellipses } from "@sqs/rosetta-icons";

//css
import "../styles/styles.scss";

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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
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
                      <Button.Primary>Get a Domain</Button.Primary>
                    </>
                  ),
                  "mobile-0": () => (
                    <>
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
      <div className="domainsDashboard">
        <Table domains={domains} />
      </div>
    </div>
  );
}
