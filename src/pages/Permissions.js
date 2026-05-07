import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, TextLink, ActivityIndicator } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { ActionList } from "@sqs/rosetta-compositions";
import { useTheme } from "@sqs/rosetta-styled";
import { Ellipses } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { loadJsonData } from "../utils/dataUtils.ts";

function PermissionsHeaderSubtitle() {
  return (
    <>
      Add people to help manage your domain or transfer domain ownership. Please
      note: Domain ownership can only be transferred to an existing manager.{" "}
      <TextLink href="#">Learn more</TextLink>
    </>
  );
}

/** Domain owner from mock `domains.json`: nested `owner` if present, else registrant fields on the domain. */
function getDomainOwnerDisplay(domain) {
  if (!domain) return null;
  const o = domain.owner || {
    firstName: domain.firstName,
    lastName: domain.lastName,
    email: domain.email,
  };
  const name = [o.firstName, o.lastName].filter(Boolean).join(" ").trim();
  const email = o.email || "";
  return {
    name: name || email || "Domain owner",
    email,
  };
}

const CONTRIBUTOR_INVITES = [
  {
    name: "Chris Chen",
    role: "Manager",
    email: "cchen@squarespace.com",
    avatar: null,
  },
];

const DOMAIN_MANAGERS = [
  {
    name: "Francesca Scorsese",
    email: "fscorsese@squarespace.com",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  { name: "Laura Lejano", email: "laura@squarespace.com", avatar: null },
];

function Avatar({ src, name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        backgroundColor: "gray.800",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ color: "#999", fontSize: "10px", fontWeight: 600 }}>
          {initials}
        </span>
      )}
    </Box>
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

function SectionLabel({ children }) {
  return (
    <Text.Body
      sx={{
        color: "gray.500",
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {children}
    </Text.Body>
  );
}

function PersonRow({ name, subtitle, avatar, showMenu }) {
  const { borders, colors } = useTheme();
  return (
    <Box
      sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
      py={3}
    >
      <Flex alignItems="center" justifyContent="space-between" className="person-row-content">
        <Flex alignItems="center" gap={2}>
          <Avatar src={avatar} name={name} />
          <Stack space={0}>
            <Text.Body>{name}</Text.Body>
            {subtitle && (
              <Text.Body sx={{ color: "gray.500", fontSize: "13px" }}>
                {subtitle}
              </Text.Body>
            )}
          </Stack>
        </Flex>
        {showMenu && <OverflowMenu />}
      </Flex>
    </Box>
  );
}

/**
 * @param {{ inlineHeader?: boolean }} props
 * When `inlineHeader` is true (e.g. Domain Settings tab), renders the former page-header title, description, and primary action inline.
 */
export function PermissionsContent({ inlineHeader = false }) {
  const { domainId } = useParams();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      const allDomains = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = allDomains.find((d) => d.domainName === decodedId) || null;
      setDomain(found);
      setLoading(false);
    }
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  const contentId = inlineHeader
    ? "domain-settings-tab-permissions"
    : "permissions-page-content";

  if (loading) {
    return <ActivityIndicator />;
  }

  const errorBoxSx = {
    px: inlineHeader ? 0 : 6,
    pt: inlineHeader ? 0 : 2,
    pb: 6,
  };

  if (error) {
    return (
      <Box {...errorBoxSx}>
        <Text.Body>{error}</Text.Body>
      </Box>
    );
  }

  const domainOwner = getDomainOwnerDisplay(domain);

  if (!domain || !domainOwner) {
    return (
      <Box {...errorBoxSx}>
        <Text.Body>
          Domain not found. Unable to show permissions for this domain.
        </Text.Body>
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      px={inlineHeader ? 0 : 6}
      pt={inlineHeader ? 0 : 2}
      id={contentId}
    >
      {inlineHeader ? (
        <Stack space={4} pb={6} id="domain-settings-permissions-intro">
          <Text.Subtitle>Domain Permissions</Text.Subtitle>
          <Text.Body>
            <PermissionsHeaderSubtitle />
          </Text.Body>
          <Flex>
            <Button.Primary>Add Domain Manager</Button.Primary>
          </Flex>
        </Stack>
      ) : null}

      <Stack space={1}>
        <SectionLabel>Domain Owner</SectionLabel>
        <PersonRow
          name={domainOwner.name}
          subtitle={domainOwner.email || undefined}
          avatar={null}
          showMenu={false}
        />
      </Stack>

      <Stack space={1}>
        <SectionLabel>Contributor Invites</SectionLabel>
        {CONTRIBUTOR_INVITES.map((p) => (
          <PersonRow
            key={p.email}
            name={p.name}
            subtitle={`${p.role} | ${p.email}`}
            avatar={p.avatar}
            showMenu
          />
        ))}
      </Stack>

      <Stack space={1}>
        <SectionLabel>Domain Managers</SectionLabel>
        {DOMAIN_MANAGERS.map((p) => (
          <PersonRow
            key={p.email}
            name={p.name}
            subtitle={p.email}
            avatar={p.avatar}
            showMenu
          />
        ))}
      </Stack>
    </Box>
  );
}

export default function Permissions() {
  usePageHeader({
    title: "Domain Permissions",
    subtitle: <PermissionsHeaderSubtitle />,
    actions: <Button.Primary>Add Domain Manager</Button.Primary>,
  });

  return <PermissionsContent inlineHeader={false} />;
}
