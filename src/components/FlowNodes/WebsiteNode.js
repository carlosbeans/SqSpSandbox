import { Handle, Position } from '@xyflow/react';
import SiteThumbnail from '../SiteThumbnail/SiteThumbnail';
import './WebsiteNode.scss';

export default function WebsiteNode({ data }) {
  return (
    <div className="website-node">
      <Handle type="target" position={Position.Left} />
      <div className="website-node-content">
        <SiteThumbnail size="large" />
      </div>
    </div>
  );
} 