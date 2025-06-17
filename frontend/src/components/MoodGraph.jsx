// src/components/MoodGraph.jsx
import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { format, parseISO } from 'date-fns';

const moodLevels = {
  furious: 1, angry: 2, annoyed: 3, sad: 4,
  neutral: 5, happy: 6, joyful: 7, grateful: 8
};

const levelToLabel = Object.keys(moodLevels)
  .reduce((acc, k) => ({ ...acc, [moodLevels[k]]: k }), {});

const MoodGraph = ({ moodData = [] }) => {
  /* ❶ sort + memoise so the chart only recalculates on data change */
  const chartData = useMemo(
    () => moodData
      .slice()                                   // avoid mutating parent array
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(e => ({
        date: format(parseISO(e.date), 'dd MMM'),
        moodScore: moodLevels[e.mood.toLowerCase()] ?? 5,
        moodLabel: e.mood
      })),
    [moodData]
  );

  /* ❷ custom tooltip */
  const CustomTooltip = ({ active, payload }) =>
    active && payload?.length ? (
      <div className="rounded-lg bg-white/90 backdrop-blur p-2 shadow">
        <p className="text-sm font-medium">
          {payload[0].payload.date}
        </p>
        <p className="capitalize">
          {payload[0].payload.moodLabel}
        </p>
      </div>
    ) : null;

  return (
    <div className="w-full h-72 bg-white/60 backdrop-blur rounded-2xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Trend</h2>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          {/* gradient stroke */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[1, 8]}
            tickFormatter={v => levelToLabel[v]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="moodScore"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodGraph;
