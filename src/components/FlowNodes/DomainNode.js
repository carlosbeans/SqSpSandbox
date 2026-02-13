import { Handle } from '@xyflow/react';
import './DomainNode.scss';

export default function DomainNode({ data }) {
  return (
    <div className="domain-node">
      <div className="domain-node-status">Active</div>
      <div className="domain-node-label">{data.label}</div>
      <div className="domain-node-renewal">{data.renewalInfo}</div>
      {/* A "source" handle can only have outgoing connections */}
      <Handle type="source" position="right" />
    </div>
  );
} 