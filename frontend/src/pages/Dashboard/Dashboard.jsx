import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "JAN", value: 20 },
  { month: "FEB", value: 27 },
  { month: "MAR", value: 35 },
  { month: "APR", value: 41 },
  { month: "MAY", value: 31 },
  { month: "JUN", value: 47 },
  { month: "JUL", value: 54 },
  { month: "AUG", value: 38 },
  { month: "SEP", value: 44 },
  { month: "OCT", value: 50 },
  { month: "NOV", value: 61 },
  { month: "DEC", value: 41 },
];

const dailyData = [
  { month: "MON", value: 12 },
  { month: "TUE", value: 19 },
  { month: "WED", value: 8 },
  { month: "THU", value: 25 },
  { month: "FRI", value: 31 },
  { month: "SAT", value: 22 },
  { month: "SUN", value: 15 },
];

const statCards = [
  {
    label: "TOTAL SALES",
    value: "$12,450",
    change: "12.5% from last month",
    color: "#3b82f6",
    bg: "#dbeafe",
  },
  {
    label: "TOTAL ORDERS",
    value: "154",
    change: "8.2% from last month",
    color: "#6b7280",
    bg: "#f3f4f6",
  },
  {
    label: "REVENUE",
    value: "$8,200",
    change: "5.4% from last month",
    color: "#10b981",
    bg: "#d1fae5",
  },
  {
    label: "CUSTOMERS",
    value: "1,200",
    change: "1.2% from last month",
    color: "#94a3b8",
    bg: "#e2e8f0",
  },
];

const CustomBar = (props) => {
  const { x, y, width, height, isActive } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={4}
      ry={4}
      fill={isActive ? "#2563eb" : "#bfdbfe"}
    />
  );
};

export default function Dashboard() {
  const [view, setView] = useState("Monthly");
  const data = view === "Monthly" ? monthlyData : dailyData;

  // Highlight the highest bar
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div style={{ padding: "24px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  letterSpacing: "0.08em",
                }}
              >
                {card.label}
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: card.bg,
                }}
              />
            </div>
            <div
              style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: card.color,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>▲</span>
              <span>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Overview Chart */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Sales Overview
            </h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0" }}>
              {view === "Monthly"
                ? "Monthly sales performance"
                : "Daily sales performance"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "#f1f5f9",
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            {["Daily", "Monthly"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: view === v ? "#2563eb" : "transparent",
                  color: view === v ? "#fff" : "#64748b",
                  transition: "all 0.15s",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            barCategoryGap="30%"
            margin={{ top: 4, right: 0, left: -10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              shape={(props) => (
                <CustomBar {...props} isActive={props.value === maxVal} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}