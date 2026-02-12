
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Refresh } from '@sqs/rosetta-icons';
import "./TableRow.scss";

interface TableRowProps {
    domain: string;
    status: string;
    provider: string;
    expiration: string;
    thumbnail?: React.ReactNode;
    thumbnailImage?: string;
}

function getStatusChipClass(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized === 'active') return 'statusChip statusChip--active';
    if (normalized === 'transfer-in-progress' || normalized === 'transfer in progress') return 'statusChip statusChip--warning';
    if (normalized === 'transfer-canceled' || normalized === 'transfer canceled') return 'statusChip statusChip--danger';
    if (normalized === 'pending-renewal' || normalized === 'pending renewal') return 'statusChip statusChip--pending';
    if (normalized === 'pending') return 'statusChip statusChip--default';
    return 'statusChip statusChip--default';
}

function getStatusLabel(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized === 'active') return 'Active';
    if (normalized === 'transfer-in-progress') return 'Transfer in progress';
    if (normalized === 'transfer-canceled') return 'Transfer canceled';
    if (normalized === 'pending-renewal') return 'Pending renewal';
    if (normalized === 'pending') return 'Pending';
    return status;
}

function formatExpiration(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

export default function TableRow({ domain, status, provider, expiration, thumbnail, thumbnailImage }: TableRowProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        const domainId = encodeURIComponent(domain);
        navigate(`/domainoverview/${domainId}`);
    };
    return (
        <tr className="tr" onClick={handleClick}>
            <td className="td">
                <div className="domain-with-thumbnail">
                    <div className="domainThumbnail">
                        {thumbnailImage && <img src={thumbnailImage} alt={domain} />}
                    </div>
                    <span className="domainName">{domain}</span>
                </div>
            </td>
            <td className="td">
                <span className={getStatusChipClass(status)}>
                    {getStatusLabel(status)}
                </span>
            </td>
            <td className="td tdMuted">{provider}</td>
            <td className="td tdMuted">
                <div className="expirationCell">
                    <span className="refreshIcon">
                        <Refresh />
                    </span>
                    {formatExpiration(expiration)}
                </div>
            </td>
        </tr>
    );
}