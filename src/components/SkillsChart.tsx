import { useMemo } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { skillsData } from '../utils/data';

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; level: number } }> }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 shadow-xl">
        <p className="text-text-primary font-medium text-sm">{data.name}</p>
        <p className="text-neon-cyan text-xs">Proficiency: {data.level}%</p>
      </div>
    );
  }
  return null;
}

export default function SkillsChart() {
  const data = useMemo(() => skillsData, []);

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid
            stroke="#2a2a2a"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickCount={6}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Proficiency"
            dataKey="level"
            stroke="#05d9e8"
            strokeWidth={2}
            fill="#05d9e8"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

