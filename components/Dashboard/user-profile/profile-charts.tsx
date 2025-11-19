"use client";

import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import { PopulatedPuzzleSession } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatDateLabel = (dateString: string | Date) => {
  const date = new Date(dateString);
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

const ProfileCharts = ({
  sessionHistory,
}: {
  sessionHistory: PopulatedPuzzleSession[];
}) => {
  const solvedPuzzles = sessionHistory.flatMap((session) =>
    session.puzzleHistory.filter((puzzle) => puzzle.result === "correct")
  );

  const categoryData = mathPuzzleCategories.map((category) => ({
    category,
    solved: solvedPuzzles.filter(
      (puzzle) => puzzle.puzzleId.category === category
    ).length,
  }));

  const difficultyData = mathPuzzleDifficultyLevels.map((difficulty) => ({
    difficulty,
    solved: solvedPuzzles.filter(
      (puzzle) => puzzle.puzzleId.difficulty === difficulty
    ).length,
  }));

  const accuracyTrend = sessionHistory
    .map((session) => {
      const attempted = session.puzzleHistory.filter(
        (puzzle) => puzzle.result !== "skipped"
      );
      const correct = attempted.filter((puzzle) => puzzle.result === "correct");
      const accuracy =
        attempted.length === 0 ? 0 : (correct.length / attempted.length) * 100;
      return {
        date: session.createdAt,
        accuracy: Number(accuracy.toFixed(1)),
        puzzles: session.puzzleHistory.length,
      };
    })
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .map((item) => ({
      ...item,
      label: formatDateLabel(item.date),
    }));

  const hasData =
    categoryData.some((d) => d.solved > 0) ||
    difficultyData.some((d) => d.solved > 0) ||
    accuracyTrend.length > 0;

  if (!hasData) {
    return (
      <div className="w-full grid gap-4">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
          Not enough data yet to generate insights. Solve some puzzles to see
          your charts here!
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">
              Performance by Category
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              Solved puzzles by category
            </h3>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={categoryData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#475569" }} />
              <PolarRadiusAxis
                tick={{ fill: "#475569" }}
                stroke="#cbd5e1"
                angle={45}
              />
              <Radar
                dataKey="solved"
                stroke="#06b6d4"
                fill="#22d3ee"
                fillOpacity={0.35}
                strokeWidth={2}
                animationDuration={900}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-700">
              Difficulty Mix
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              Solved puzzles by difficulty
            </h3>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Stacked view
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={difficultyData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
              <XAxis dataKey="difficulty" tick={{ fill: "#475569" }} />
              <YAxis tick={{ fill: "#475569" }} />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
              />
              <Legend />
              <Bar
                dataKey="solved"
                name="Solved"
                stackId="a"
                fill="#a855f7"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
              Accuracy Trend
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              Accuracy over time
            </h3>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Animated
          </span>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fill: "#475569" }} />
              <YAxis
                tick={{ fill: "#475569" }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                name="Accuracy"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#ecfdf3" }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfileCharts;
