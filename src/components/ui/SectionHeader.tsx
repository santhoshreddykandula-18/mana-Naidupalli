import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={clsx('flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8', className)}>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">{title}</h2>
        {subtitle && <p className="text-text-secondary mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}