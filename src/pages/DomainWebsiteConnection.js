import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import { BackButton } from "@sqs/rosetta-elements";

import "@xyflow/react/dist/style.css";

import "./DomainWebsiteConnection.scss";

import DomainNode from "../components/FlowNodes/DomainNode";
import WebsiteNode from "../components/FlowNodes/WebsiteNode";
const nodeTypes = {
  domain: DomainNode,
  website: WebsiteNode,
};

const initialNodes = [
  {
    id: "domain-1",
    type: "domain",
    position: { x: 0, y: 100 },
    data: {
      label: "pixelperfect.design",
      renewalInfo: "Renews February 26, 2026 for $20",
    },
  },
  {
    id: "website-1",
    type: "website",
    position: { x: 420, y: 0 },
    data: {},
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "domain-1",
    target: "website-1",
    type: "smoothstep",
    animated: true,
  },
];

export default function DomainWebsiteConnection() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const navigate = useNavigate();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      const newConnection = {
        ...connection,
        type: "smoothstep",
        animated: true,
      };
      setEdges((eds) => [
        ...eds,
        {
          ...newConnection,
          id: `${newConnection.source}-${newConnection.target}`,
        },
      ]);
    },
    [setEdges]
  );
  const proOptions = { hideAttribution: true };

  return (
    <div className="dwc-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.8}
        maxZoom={1.2}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
