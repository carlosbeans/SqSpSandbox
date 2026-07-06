import { useState, useRef, useLayoutEffect } from "react";
import { Stack, BackButton, TextLink } from "@sqs/rosetta-elements";
import { Table } from "@sqs/rosetta-compositions";
import { Button, Box, Flex, Text } from "@sqs/rosetta-primitives";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageHeader } from "../../layouts/PageHeaderContext";

const columnHelper = Table.Utils.createColumnHelper();

function Avatar({ src, name, size = 32 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <Box      
      sx={{
        width: size,
        height: size,
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
          width={size}
          height={size}
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

function NameCell({ name, role, avatar }) {
  return (
    <Flex id="domain-activity-v2-name-cell" alignItems="center" gap={2}>
      <Avatar src={avatar} name={name} />
      <Stack space={0}>
        <Text.Body m={0} color="gray.100" sx={{ fontWeight: 500 }}>
          {name}
        </Text.Body>
        {role && (
          <Text.Body m={0} color="gray.300" sx={{  }}>
            {role}
          </Text.Body>
        )}
      </Stack>
    </Flex>
  );
}

function StatusMessage({ children }) {
  return (
    <Text.Body
      m={0}
      sx={{ color: "#925b20", fontSize: "12px", lineHeight: "16px", fontWeight: 400 }}
    >
      {children}
    </Text.Body>
  );
}

function ActionCell({ action, suspicious }) {
  return (
    <Stack space={0}>
      <Text.Body m={0} color="gray.100">
        {action}
      </Text.Body>
      {suspicious && <StatusMessage>Suspicious activity</StatusMessage>}
    </Stack>
  );
}

const columns = [
  columnHelper.accessor("action", {
    header: "Action",
    cell: (info) => (
      <ActionCell
        action={info.getValue()}
        suspicious={info.row.original.suspicious}
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <NameCell
        name={info.getValue()}
        role={info.row.original.role}
        avatar={info.row.original.avatar}
      />
    ),
  }),
  columnHelper.accessor("location", { header: "Location" }),
  columnHelper.accessor("time", { header: "Time" }),
];

const data = [
  { id: "1", action: "Registered domain", name: "Carlos Andujar", role: "Owner", avatar: "https://i.pravatar.cc/64?img=12", location: "Atlanta, GA", time: "1 hr ago", date: "Jun 18, 2026", clockTime: "1:42 PM", details: "Domain registered and added to your account.", suspicious: false },
  { id: "2", action: "Disabled DNSSEC", name: "Laura Lejano", role: "Manager", avatar: "https://i.pravatar.cc/64?img=5", location: "Richmond, VA", time: "2 hrs ago", date: "Jun 18, 2026", clockTime: "11:35 AM", details: "DNSSEC disabled on this domain.", suspicious: true },
  { id: "3", action: "Transferred domain", name: "Laura Lejano", role: "Manager", avatar: "https://i.pravatar.cc/64?img=5", location: "Richmond, VA", time: "5 hrs ago", date: "Jun 18, 2026", clockTime: "8:05 AM", details: "Domain transferred from another registrar.", suspicious: false },
  { id: "4", action: "Renewed domain", name: "Carlos Andujar", role: "Owner", avatar: "https://i.pravatar.cc/64?img=12", location: "Atlanta, GA", time: "2 weeks ago", date: "Jun 04, 2026", clockTime: "2:45 PM", details: "Domain renewed for one year.", suspicious: false },
  { id: "5", action: "Updated DNS records", name: "Laura Lejano", role: "Manager", avatar: "https://i.pravatar.cc/64?img=5", location: "Richmond, VA", time: "1 mon ago", date: "May 18, 2026", clockTime: "4:30 PM", details: "A and CNAME records were updated.", suspicious: false },
  { id: "6", action: "Connected website", name: "Carlos Andujar", role: "Owner", avatar: "https://i.pravatar.cc/64?img=12", location: "Atlanta, GA", time: "6 mon ago", date: "Dec 18, 2025", clockTime: "11:20 AM", details: "Domain connected to your Squarespace site.", suspicious: false },
  { id: "7", action: "Enabled DNSSEC", name: "Laura Lejano", role: "Manager", avatar: "https://i.pravatar.cc/64?img=5", location: "Richmond, VA", time: "1 year ago", date: "Jun 18, 2025", clockTime: "8:00 AM", details: "DNSSEC enabled for added security.", suspicious: false },
];

function DetailRow({ label, value, valueColor = "gray.300", isFirst }) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-start"
      gap={1}
      py={4}
      sx={{
        borderBottom: "1px solid",
        borderColor: "gray.800",
      }}
    >
      <Text.Body m={0} color="gray.100">
        {label}
      </Text.Body>
      <Text.Body
        m={0}
        color={valueColor}
        sx={{ textAlign: "right" }}
      >
        {value}
      </Text.Body>
    </Flex>
  );
}

function DetailPanel({ row }) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] };

  const panelRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState("100vh");

  useLayoutEffect(() => {
    const measure = () => {
      if (!panelRef.current) return;
      const docTop =
        panelRef.current.getBoundingClientRect().top + window.scrollY;
      setPanelHeight(`calc(100vh - ${Math.max(0, Math.round(docTop))}px)`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <Box
      ref={panelRef}
      id="domain-activity-v2-detail-panel"
      sx={{
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        flexShrink: 0,
        width: 377,
        height: panelHeight,
        minHeight: panelHeight,
        borderLeft: "1px solid",
        borderColor: "gray.800",
        bg: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!row ? (
        <Flex flex={1} alignItems="center" justifyContent="center" p={6}>
          <Text.Body m={0} color="gray.300" sx={{ textAlign: "center" }}>
            Select an activity to see its details.
          </Text.Body>
        </Flex>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition}
            style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
          >
            <Box p={6} sx={{ borderBottom: "1px solid", borderColor: "gray.800" }}>
              <Flex alignItems="baseline" justifyContent="space-between" gap={2}>
                <Text.Subtitle m={0} color="gray.100">
                  {row.action}
                </Text.Subtitle>
                {row.suspicious && <StatusMessage>Suspicious activity</StatusMessage>}
              </Flex>
              <Flex alignItems="center" gap={1} mt={2}>
                <Avatar src={row.avatar} name={row.name} />
                <Text.Body m={0} color="gray.300">
                  by {row.name}
                </Text.Body>
              </Flex>
            </Box>

            <Flex flexDirection="column" justifyContent="space-between" alignItems="stretch" flex={1} minHeight={0} px={6} py={2} sx={{ overflowY: "auto" }}>
              <Box>
                <DetailRow label="Location" value={row.location} isFirst />
                <DetailRow label="Date" value={row.date} />
                <DetailRow label="Time" value={row.clockTime} />
                <DetailRow
                  label="Details"
                  value={row.details}
                />
              </Box>

              <Box>
                <Button.Secondary
                  sx={{ width: "100%" }}
                  onClick={() => {}}
                  size="large"
                >
                  Undo Action
                </Button.Secondary>
                <Box py={3}>
                  <Text.Caption m={0} color="gray.300">
                    If you don't recognize this activity, take action to secure the account.{" "}
                    <TextLink href="#">Learn more</TextLink>
                  </Text.Caption>
                </Box>
              </Box>
            </Flex>
          </motion.div>
        </AnimatePresence>
      )}
    </Box>
  );
}

export default function DomainActivityV2() {
  const [selectedId, setSelectedId] = useState(data[0].id);
  const selectedRow = data.find((d) => d.id === selectedId) || null;

  usePageHeader({
    title: "Domain Activity",
    actions: <Button.Primary size="large">Manage Notifications</Button.Primary>,
    subtitle: "View your domain's activity and notifications. Learn more about activity",
  });

  const renderBodyRow = (props) => {
    const isSelected = props.row.original.id === selectedId;
    return (
      <Table.List.Body.Row
        {...props}
        onClick={() => setSelectedId(props.row.original.id)}
        sx={{
          cursor: "pointer",
          bg: isSelected ? "gray.950" : undefined,
        }}
      />
    );
  };

  return (
    <Flex id="domain-activity-v2-main" alignItems="flex-start" borderTop="1px solid" borderColor="gray.800">
      <Box flex={1} minWidth={0} pl={6} pr={4} py={0}>
        <Table columns={columns} data={data} enableSearch enableSort>
          <Table.Controls showBottomBorder>
            <Table.Controls.Left>
              <Table.Search placeholder="Search" />
            </Table.Controls.Left>
          </Table.Controls>
          <Table.List>
            <Table.List.Head />
            <Table.List.Body renderBodyRow={renderBodyRow} />
          </Table.List>
        </Table>
      </Box>
      <DetailPanel row={selectedRow} />
    </Flex>
  );
}
