import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, Icon, color }: StatsCardProps) {
  return (
    <div className={`bg-${color}-50 p-6 rounded-lg`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold text-${color}-900`}>{title}</h3>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
      <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
    </div>
  );
}