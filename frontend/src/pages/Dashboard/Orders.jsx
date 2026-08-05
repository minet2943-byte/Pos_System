import React, { useState } from "react";

const INITIAL_ORDERS = [
  {
    id: "#ORD-9021",
    initials: "EJ",
    color: "#6C9BD2",
    image:
      "https://i.pinimg.com/736x/e5/19/09/e51909dbc74fdf7247bce213f79bfae6.jpg",
    name: "Sun Screan",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    items: 3,
    total: 156.4,
    status: "COMPLETED",
  },
  {
    id: "#ORD-9022",
    initials: "MB",
    color: "#7B8EC8",
    image:
      "https://i.pinimg.com/736x/6a/78/14/6a7814eed081249b45a3b3d52377efb0.jpg",
    name: "Sarom",
    date: "Oct 24, 2023",
    time: "11:15 AM",
    items: 1,
    total: 42.0,
    status: "PENDING",
  },
  {
    id: "#ORD-9023",
    initials: "SC",
    color: "#E88FA0",
    image:
      "https://i.pinimg.com/1200x/5d/5c/f9/5d5cf90daacbd46a1a0915b3be60147d.jpg",
    name: "Sarom",
    date: "Oct 24, 2023",
    time: "01:45 PM",
    items: 5,
    total: 294.1,
    status: "CANCELLED",
  },
  {
    id: "#ORD-9024",
    initials: "DR",
    color: "#6BBFB5",
    image:
      "https://i.pinimg.com/736x/7d/8d/9d/7d8d9d66a915831d6a2b4824b4557dce.jpg",
    name: "Sun Screan",
    date: "Oct 24, 2023",
    time: "02:10 PM",
    items: 2,
    total: 89.99,
    status: "COMPLETED",
  },
  {
    id: "#ORD-9025",
    initials: "KW",
    color: "#A0C878",
    image:
      "https://i.pinimg.com/1200x/95/e5/da/95e5dad1bdb0ce356722f94ca71b92b5.jpg",
    name: "Sun Cream",
    date: "Oct 24, 2023",
    time: "03:00 PM",
    items: 4,
    total: 210.5,
    status: "PENDING",
  },
];

const STATUS_STYLES = {
  COMPLETED: { bg: "#E6F9F0", color: "#27AE60", border: "#B2E8CF" },
  PENDING: { bg: "#FFF9E6", color: "#D4A017", border: "#F5DFA0" },
  CANCELLED: { bg: "#FDE8E8", color: "#E05C5C", border: "#F5B8B8" },
};

const AVATAR_COLORS = [
  "#6C9BD2",
  "#7B8EC8",
  "#E88FA0",
  "#6BBFB5",
  "#A0C878",
  "#C89B6E",
  "#9B6EC8",
  "#6EC8B5",
];

const TABS = ["All Orders", "Pending", "Completed", "Cancelled"];

function fmt(n) {
  return "$" + Number(n).toFixed(2);
}

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function randomColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

function nextId(orders) {
  const nums = orders
    .map((o) => parseInt(o.id.replace("#ORD-", "")))
    .filter(Boolean);
  return "#ORD-" + (Math.max(...nums, 9025) + 1);
}

function nowDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

// ── sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.PENDING;
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 20,
        padding: "4px 14px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function Avatar({ initials, color, image }) {
  if (image) {
    return (
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: `1.5px solid ${color}55`,
          backgroundColor: color + "33",
        }}
      >
        <img
          src={image}
          alt={initials || "Product"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        backgroundColor: color + "33",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 13,
        flexShrink: 0,
        border: `1.5px solid ${color}55`,
      }}
    >
      {initials}
    </div>
  );
}

// ── Filter Panel ─────────────────────────────────────────────────────────────

function FilterPanel({ filters, onChange, onApply, onReset }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        right: 110,
        zIndex: 200,
        backgroundColor: "#fff",
        border: "1.5px solid #E2E6EF",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        padding: 24,
        width: 300,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 15,
          color: "#1A2C5B",
          marginBottom: 16,
        }}
      >
        Filter Orders
      </div>

      <label style={labelStyle}>Status</label>
      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
        style={inputStyle}
      >
        <option value="">All</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <label style={labelStyle}>Min Total ($)</label>
      <input
        type="number"
        placeholder="0"
        value={filters.minTotal}
        onChange={(e) => onChange("minTotal", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>Max Total ($)</label>
      <input
        type="number"
        placeholder="9999"
        value={filters.maxTotal}
        onChange={(e) => onChange("maxTotal", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>Product Name</label>
      <input
        type="text"
        placeholder="Search name…"
        value={filters.name}
        onChange={(e) => onChange("name", e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={onReset} style={{ ...btnOutline, flex: 1 }}>
          Reset
        </button>
        <button onClick={onApply} style={{ ...btnPrimary, flex: 1 }}>
          Apply
        </button>
      </div>
    </div>
  );
}

// ── Add Order Modal ───────────────────────────────────────────────────────────

function AddOrderModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    items: "",
    total: "",
    status: "PENDING",
  });
  const [error, setError] = useState("");

  function handleAdd() {
    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.items || isNaN(form.items) || +form.items < 1)
      return setError("Enter a valid item count.");
    if (!form.total || isNaN(form.total) || +form.total < 0)
      return setError("Enter a valid total price.");
    setError("");
    onAdd(form);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 32,
          width: 380,
          boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#8A94A6",
          }}
        >
          ✕
        </button>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A2C5B",
            marginBottom: 20,
          }}
        >
          Add New Order
        </div>

        {error && (
          <div
            style={{
              color: "#E05C5C",
              fontSize: 13,
              marginBottom: 12,
              backgroundColor: "#FDE8E8",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        )}

        <label style={labelStyle}>Product Name *</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Blue Sneakers"
          style={inputStyle}
        />

        <label style={labelStyle}>Product Image URL</label>
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          style={inputStyle}
        />

        <label style={labelStyle}>Number of Items *</label>
        <input
          type="number"
          min="1"
          value={form.items}
          onChange={(e) => setForm({ ...form, items: e.target.value })}
          placeholder="e.g. 3"
          style={inputStyle}
        />

        <label style={labelStyle}>Total Price ($) *</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.total}
          onChange={(e) => setForm({ ...form, total: e.target.value })}
          placeholder="e.g. 49.99"
          style={inputStyle}
        />

        <label style={labelStyle}>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={inputStyle}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ ...btnOutline, flex: 1 }}>
            Cancel
          </button>
          <button onClick={handleAdd} style={{ ...btnPrimary, flex: 1 }}>
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ── View Details Modal ────────────────────────────────────────────────────────

function DetailModal({ order, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 32,
          width: 360,
          boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#8A94A6",
          }}
        >
          ✕
        </button>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A2C5B",
            marginBottom: 20,
          }}
        >
          Order Details
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <Avatar initials={order.initials} color={order.color} />
          <div>
            <div style={{ fontWeight: 700, color: "#1A2C5B" }}>
              {order.name}
            </div>
            <div style={{ color: "#8A94A6", fontSize: 13 }}>{order.id}</div>
          </div>
        </div>
        {[
          ["Date", `${order.date} at ${order.time}`],
          ["Items", `${order.items} ${order.items === 1 ? "Item" : "Items"}`],
          ["Total Price", fmt(order.total)],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #F0F2F7",
            }}
          >
            <span style={{ color: "#8A94A6", fontSize: 14 }}>{k}</span>
            <span style={{ fontWeight: 600, color: "#1A2C5B", fontSize: 14 }}>
              {v}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <span style={{ color: "#8A94A6", fontSize: 14 }}>Status</span>
          <StatusBadge status={order.status} />
        </div>
        <button
          onClick={onClose}
          style={{ ...btnPrimary, width: "100%", marginTop: 16 }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ── shared styles ─────────────────────────────────────────────────────────────

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#8A94A6",
  marginBottom: 5,
  marginTop: 14,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #E2E6EF",
  borderRadius: 8,
  fontSize: 14,
  color: "#2D3A55",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Inter','Segoe UI',sans-serif",
};

const btnPrimary = {
  padding: "10px 20px",
  backgroundColor: "#1A2C5B",
  color: "#fff",
  border: "none",
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const btnOutline = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#3B4A6B",
  border: "1.5px solid #E2E6EF",
  borderRadius: 9,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

// ── Main Component ────────────────────────────────────────────────────────────

function Orders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [showFilter, setShowFilter] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    minTotal: "",
    maxTotal: "",
    name: "",
  });
  const [appliedFilters, setApplied] = useState({
    status: "",
    minTotal: "",
    maxTotal: "",
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // ── filtering ──
  const allVisible = orders.filter((o) => {
    if (activeTab !== "All Orders" && o.status !== activeTab.toUpperCase())
      return false;
    if (appliedFilters.status && o.status !== appliedFilters.status)
      return false;
    if (appliedFilters.minTotal && o.total < +appliedFilters.minTotal)
      return false;
    if (appliedFilters.maxTotal && o.total > +appliedFilters.maxTotal)
      return false;
    if (
      appliedFilters.name &&
      !o.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(allVisible.length / PAGE_SIZE);
  const visible = allVisible.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ── export CSV ──
  function exportCSV() {
    const header = [
      "Order ID",
      "Product Name",
      "Date",
      "Time",
      "Items",
      "Total Price",
      "Status",
    ];
    const rows = allVisible.map((o) =>
      [
        o.id,
        '"' + o.name + '"',
        o.date,
        o.time,
        o.items,
        fmt(o.total),
        o.status,
      ].join(","),
    );
    const csv = [header.join(","), ...rows].join("\r\n");
    try {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "orders.csv";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (e) {
      // fallback for environments that block Blob URLs
      const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      const a = document.createElement("a");
      a.style.display = "none";
      a.setAttribute("href", uri);
      a.setAttribute("download", "orders.csv");
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 100);
    }
  }

  // ── add order ──
  function handleAdd(form) {
    const initials = getInitials(form.name);
    const color = randomColor();
    const newOrder = {
      id: nextId(orders),
      initials,
      color,
      image: form.image.trim() || undefined,
      name: form.name.trim(),
      date: nowDate(),
      time: nowTime(),
      items: +form.items,
      total: +form.total,
      status: form.status,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowAdd(false);
  }

  const hasActiveFilters = Object.values(appliedFilters).some(Boolean);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "'Inter','Segoe UI',sans-serif",
        minHeight: "100vh",
        backgroundColor: "#F3F4F8",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 6,
              backgroundColor: "#F3F4F8",
              borderRadius: 10,
              padding: 4,
              flexWrap: "wrap",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 14,
                  backgroundColor: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? "#1A2C5B" : "#8A94A6",
                  boxShadow:
                    activeTab === tab ? "0 1px 6px rgba(0,0,0,0.10)" : "none",
                  transition: "all 0.18s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, position: "relative" }}>
            {/* Filter */}
            <button
              onClick={() => setShowFilter((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                border:
                  showFilter || hasActiveFilters
                    ? "1.5px solid #1A2C5B"
                    : "1.5px solid #E2E6EF",
                borderRadius: 9,
                backgroundColor: showFilter ? "#F0F4FF" : "#fff",
                color: showFilter || hasActiveFilters ? "#1A2C5B" : "#3B4A6B",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                position: "relative",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M6 10h8M9 15h2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Filters
              {hasActiveFilters && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: "#E05C5C",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />
              )}
            </button>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                border: "1.5px solid #E2E6EF",
                borderRadius: 9,
                backgroundColor: "#fff",
                color: "#3B4A6B",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3v10M6 9l4 4 4-4M4 16h12"
                  stroke="#3B4A6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export CSV
            </button>

            {/* Filter dropdown */}
            {showFilter && (
              <FilterPanel
                filters={filters}
                onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))}
                onApply={() => {
                  setApplied({ ...filters });
                  setCurrentPage(1);
                  setShowFilter(false);
                }}
                onReset={() => {
                  const empty = {
                    status: "",
                    minTotal: "",
                    maxTotal: "",
                    name: "",
                  };
                  setFilters(empty);
                  setApplied(empty);
                }}
              />
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {appliedFilters.status && (
              <Chip
                label={`Status: ${appliedFilters.status}`}
                onRemove={() => {
                  const f = { ...appliedFilters, status: "" };
                  setApplied(f);
                  setFilters(f);
                  setCurrentPage(1);
                }}
              />
            )}
            {appliedFilters.minTotal && (
              <Chip
                label={`Min: $${appliedFilters.minTotal}`}
                onRemove={() => {
                  const f = { ...appliedFilters, minTotal: "" };
                  setApplied(f);
                  setFilters(f);
                  setCurrentPage(1);
                }}
              />
            )}
            {appliedFilters.maxTotal && (
              <Chip
                label={`Max: $${appliedFilters.maxTotal}`}
                onRemove={() => {
                  const f = { ...appliedFilters, maxTotal: "" };
                  setApplied(f);
                  setFilters(f);
                  setCurrentPage(1);
                }}
              />
            )}
            {appliedFilters.name && (
              <Chip
                label={`Name: "${appliedFilters.name}"`}
                onRemove={() => {
                  const f = { ...appliedFilters, name: "" };
                  setApplied(f);
                  setFilters(f);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "ORDER ID",
                  "PRODUCT NAME",
                  "DATE",
                  "ITEMS",
                  "TOTAL PRICE",
                  "STATUS",
                  "ACTION",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#8A94A6",
                      letterSpacing: 0.8,
                      borderBottom: "1.5px solid #F0F2F7",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "48px 0",
                      color: "#8A94A6",
                      fontSize: 15,
                    }}
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                visible.map((order, i) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom:
                        i < visible.length - 1 ? "1px solid #F0F2F7" : "none",
                      transition: "background 0.13s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F8F9FC")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "18px 16px",
                        fontWeight: 700,
                        color: "#1A2C5B",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.id}
                    </td>

                    <td style={{ padding: "18px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Avatar
                          initials={order.initials}
                          color={order.color}
                          image={order.image}
                        />
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#2D3A55",
                            fontSize: 14,
                          }}
                        >
                          {order.name}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: "18px 16px", whiteSpace: "nowrap" }}>
                      <div
                        style={{
                          fontWeight: 500,
                          color: "#2D3A55",
                          fontSize: 14,
                        }}
                      >
                        {order.date}
                      </div>
                      <div
                        style={{ color: "#8A94A6", fontSize: 12, marginTop: 2 }}
                      >
                        {order.time}
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "18px 16px",
                        color: "#2D3A55",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {order.items} {order.items === 1 ? "Item" : "Items"}
                    </td>

                    <td
                      style={{
                        padding: "18px 16px",
                        fontWeight: 700,
                        color: "#1A2C5B",
                        fontSize: 15,
                      }}
                    >
                      {fmt(order.total)}
                    </td>

                    <td style={{ padding: "18px 16px" }}>
                      <StatusBadge status={order.status} />
                    </td>

                    <td style={{ padding: "18px 16px" }}>
                      <button
                        onClick={() => setDetailOrder(order)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#2563EB",
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: "pointer",
                          padding: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        View
                        <br />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 24,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span style={{ color: "#8A94A6", fontSize: 13 }}>
            {allVisible.length === 0
              ? "No orders"
              : `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, allVisible.length)} of ${allVisible.length} orders`}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1.5px solid #E2E6EF",
                backgroundColor: currentPage === 1 ? "#F3F4F8" : "#fff",
                cursor: currentPage === 1 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPage === 1 ? "#C5CAD6" : "#3B4A6B",
                fontSize: 18,
              }}
            >
              ‹
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === Math.max(totalPages, 1) ||
                  Math.abs(p - currentPage) <= 1,
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    style={{ color: "#8A94A6", fontSize: 14, padding: "0 4px" }}
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      border:
                        p === currentPage ? "none" : "1.5px solid #E2E6EF",
                      backgroundColor: p === currentPage ? "#1A2C5B" : "#fff",
                      color: p === currentPage ? "#fff" : "#3B4A6B",
                      fontWeight: p === currentPage ? 700 : 500,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ),
              )}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(Math.max(totalPages, 1), p + 1))
              }
              disabled={currentPage >= Math.max(totalPages, 1)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1.5px solid #E2E6EF",
                backgroundColor:
                  currentPage >= Math.max(totalPages, 1) ? "#F3F4F8" : "#fff",
                cursor:
                  currentPage >= Math.max(totalPages, 1)
                    ? "default"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  currentPage >= Math.max(totalPages, 1)
                    ? "#C5CAD6"
                    : "#3B4A6B",
                fontSize: 18,
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        title="Add Order"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: "#1A2C5B",
          color: "#fff",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(26,44,91,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        +
      </button>

      {/* Modals */}
      {showAdd && (
        <AddOrderModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />
      )}
      {detailOrder && (
        <DetailModal order={detailOrder} onClose={() => setDetailOrder(null)} />
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#EEF2FF",
        color: "#1A2C5B",
        borderRadius: 20,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#8A94A6",
          fontSize: 14,
          lineHeight: 1,
          padding: 0,
          marginLeft: 2,
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Orders;
