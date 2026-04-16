import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { PageHeader, ActionList } from "@sqs/rosetta-compositions";
import { useTheme } from "@sqs/rosetta-styled";
import { Ellipses } from "@sqs/rosetta-icons";

const DOMAIN_OWNER = { name: "Martin Scorsese", avatar: "https://i.pravatar.cc/40?img=11" };

const CONTRIBUTOR_INVITES = [
  { name: "Chris Chen", role: "Manager", email: "cchen@squarespace.com", avatar: null },
];

const DOMAIN_MANAGERS = [
  { name: "Francesca Scorsese", email: "fscorsese@squarespace.com", avatar: "https://i.pravatar.cc/40?img=5" },
  { name: "Laura Lejano", email: "laura@squarespace.com", avatar: null },
];

function Avatar({ src, name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
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
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ color: "#999", fontSize: "10px", fontWeight: 600 }}>{initials}</span>
      )}
    </Box>
  );
}

function OverflowMenu() {
  return (
    <ActionList.PopOver
      renderTrigger={({ toggleActionListOpen }) => (
        <button onClick={toggleActionListOpen} aria-label="More options" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          <Ellipses css={{ width: 20, height: 20 }} />
        </button>
      )}
      position="bottom-right"
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
    <Text.Body sx={{ color: "gray.500", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
      {children}
    </Text.Body>
  );
}

function PersonRow({ name, subtitle, avatar, showMenu }) {
  const { borders, colors } = useTheme();
  return (
    <Box sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }} py={3}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={2}>
          <Avatar src={avatar} name={name} />
          <Stack space={0}>
            <Text.Body sx={{ fontWeight: 500 }}>{name}</Text.Body>
            {subtitle && <Text.Body sx={{ color: "gray.500", fontSize: "13px" }}>{subtitle}</Text.Body>}
          </Stack>
        </Flex>
        {showMenu && <OverflowMenu />}
      </Flex>
    </Box>
  );
}

export default function Permissions() {
  return (
    <Stack space={6}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title
            title="Domain Permissions"
            subtitle={
              <>
                Add people to help manage your domain or transfer domain ownership. Please note: Domain
                ownership can only be transferred to an existing manager.{" "}
                <TextLink href="#">Learn more</TextLink>
              </>
            }
          />
          <PageHeader.Actions>
            <Button.Primary>Add Domain Manager</Button.Primary>
          </PageHeader.Actions>
        </PageHeader.Body>
      </PageHeader>

      <Stack space={1}>
        <SectionLabel>Domain Owner</SectionLabel>
        <PersonRow
          name={DOMAIN_OWNER.name}
          avatar={DOMAIN_OWNER.avatar}
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
    </Stack>
  );
}
