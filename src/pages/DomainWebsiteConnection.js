import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';

import { BackButton } from '@sqs/rosetta-elements';

// It's important to import the styles provided by the library.
import '@xyflow/react/dist/style.css';

// We'll create this file next to define some basic styles for the container.
import './DomainWebsiteConnection.scss';

// Import the custom nodes we created
import DomainNode from '../components/FlowNodes/DomainNode';
import WebsiteNode from '../components/FlowNodes/WebsiteNode';

// Map the node types to our custom components
const nodeTypes = {
  domain: DomainNode,
  website: WebsiteNode,
};

// Define the initial state for nodes based on the reference image
const initialNodes = [
  {
    id: 'domain-1',
    type: 'domain',
    position: { x: 0, y: 100 },
    data: {
      label: 'pixelperfect.design',
      renewalInfo: 'Renews February 26, 2026 for $20',
    },
  },
  {
    id: 'website-1',
    type: 'website',
    position: { x: 420, y: 0 },
    data: {},
  },
];

// Define the initial connection between the two nodes
const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'domain-1', 
    target: 'website-1', 
    type: 'smoothstep', // This creates the curved line
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
        type: 'smoothstep', // Ensure new connections are also curved
        animated: true,
      };
      setEdges((eds) => addEdge(newConnection, eds));
    },
    [setEdges]
  );
  const proOptions = { hideAttribution: true };
  return (
    <div className="dwc-container">
      <div className="pageSubNav">
        <BackButton onClick={() => navigate(-1)} />
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // Pass the custom node types
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // Limit zoom to 20% in either direction from the default
        minZoom={0.8}
        maxZoom={1.2}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}