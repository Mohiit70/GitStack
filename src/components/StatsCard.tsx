import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    icon: 'text-blue-600',
    value: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    icon: 'text-green-600',
    value: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    icon: 'text-purple-600',
    value: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    icon: 'text-orange-600',
    value: 'text-orange-600',
  },
};

export function StatsCard({ title, value, Icon, color }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${colors.text}`}>{title}</h3>
        <Icon className={`h-6 w-6 ${colors.icon}`} />
      </div>
      <p className={`text-3xl font-bold ${colors.value} mt-2`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}