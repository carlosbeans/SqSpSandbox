import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeroBanner } from "@sqs/rosetta-dashboard";
import { Box } from "@sqs/rosetta-primitives";
import { Stack, ActivityIndicator } from "@sqs/rosetta-elements";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { loadJsonData } from "../utils/dataUtils.ts";
import PaymentMethodCompare from "../components/PaymentMethodCompare/PaymentMethodCompare";

export default function PayLinks() {
  usePageHeader({
    title: "Pay Links",
    subtitle:
      "Create a pay link to collect payments from your customers. Learn more about pay links",
  });

  const { domainId } = useParams();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      setDomain(all.find((d) => d.domainName === decodedId) || null);
      setLoading(false);
    }
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  const hasNoProvidersConnected =
    !!domain && (domain.connectedPayments || []).length === 0;

  return (
    <Box id="payLinksPage" px={6}>
      <Stack space={6}>
        <HeroBanner variant="productsAndServices" />
        {loading ? (
          <ActivityIndicator />
        ) : (
          hasNoProvidersConnected && <PaymentMethodCompare />
        )}
      </Stack>
    </Box>
  );
}
