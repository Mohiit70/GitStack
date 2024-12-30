import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorMap = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    hover: 'hover:from-blue-600 hover:to-blue-700',
    text: 'text-white',
    icon: 'text-blue-200',
    value: 'text-white',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    hover: 'hover:from-emerald-600 hover:to-emerald-700',
    text: 'text-white',
    icon: 'text-emerald-200',
    value: 'text-white',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    hover: 'hover:from-purple-600 hover:to-purple-700',
    text: 'text-white',
    icon: 'text-purple-200',
    value: 'text-white',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    hover: 'hover:from-orange-600 hover:to-orange-700',
    text: 'text-white',
    icon: 'text-orange-200',
    value: 'text-white',
  },
};

export function StatsCard({ title, value, Icon, color }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div 
      className={`
        ${colors.bg} 
        ${colors.hover}
        p-6 rounded-xl 
        shadow-lg 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        relative overflow-hidden
        group
      `}
    >
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Icon className="h-24 w-24" />
      </div>
      <div className="flex items-center justify-between relative z-10">
        <h3 className={`text-lg font-semibold ${colors.text}`}>{title}</h3>
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
      </div>
      <p className={`text-3xl font-bold ${colors.value} mt-4 relative z-10`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}