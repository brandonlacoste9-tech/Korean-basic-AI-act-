import { ReactNode } from 'react';
import { RoadmapStatus, RoadmapLabel } from '@/data/roadmap';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'red' | 'yellow' | 'green' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'gray',
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variantStyles = {
    blue: 'gov-badge-blue',
    red: 'gov-badge-red',
    yellow: 'gov-badge-yellow',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span className={`gov-badge ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: RoadmapStatus }) {
  const statusConfig = {
    'planned': { label: { ko: '예정', en: 'Planned' }, variant: 'gray' as const },
    'in-progress': { label: { ko: '진행 중', en: 'In Progress' }, variant: 'blue' as const },
    'completed': { label: { ko: '완료', en: 'Completed' }, variant: 'green' as const },
    'blocked': { label: { ko: '차단됨', en: 'Blocked' }, variant: 'red' as const },
    'deferred': { label: { ko: '연기됨', en: 'Deferred' }, variant: 'gray' as const },
  };

  const config = statusConfig[status];
  return (
    <Badge variant={config.variant}>
      {config.label.ko}
    </Badge>
  );
}

export function LabelBadge({ label }: { label: RoadmapLabel }) {
  const labelConfig = {
    'critical': { label: { ko: '긴급', en: 'Critical' }, variant: 'red' as const },
    'high-priority': { label: { ko: '높은 우선순위', en: 'High Priority' }, variant: 'red' as const },
    'enhancement': { label: { ko: '개선', en: 'Enhancement' }, variant: 'blue' as const },
    'documentation': { label: { ko: '문서', en: 'Documentation' }, variant: 'gray' as const },
    'security': { label: { ko: '보안', en: 'Security' }, variant: 'red' as const },
    'performance': { label: { ko: '성능', en: 'Performance' }, variant: 'yellow' as const },
  };

  const config = labelConfig[label];
  return (
    <Badge variant={config.variant} size="sm">
      {config.label.ko}
    </Badge>
  );
}
