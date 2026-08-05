import React, { useState } from "react";

const INITIAL_USERS = [
  {
    id: 1,
    username: "eleanor_j",
    email: "eleanor@example.com",
    role: "Admin",
    password: "secret123",
    status: "Active",
  },
  {
    id: 2,
    username: "marcus_b",
    email: "marcus@example.com",
    role: "Manager",
    password: "secret123",
    status: "Active",
  },
  {
    id: 3,
    username: "kelly_w",
    email: "kelly@example.com",
    role: "User",
    password: "secret123",
    status: "Active",
  },
];

const ROLES = ["Admin", "Manager", "User"];

// ── shared styles ──────────────────────────────────────────────────────────────

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
  backgroundColor: "#fff",
};

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

const btnPrimary = {
  padding: "10px 22px",
  backgroundColor: "#1A2C5B",
  color: "#fff",
  border: "none",
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};

const btnOutline = {
  padding: "10px 22px",
  backgroundColor: "#fff",
  color: "#3B4A6B",
  border: "1.5px solid #E2E6EF",
  borderRadius: 9,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const btnDanger = {
  padding: "10px 22px",
  backgroundColor: "#FDE8E8",
  color: "#E05C5C",
  border: "1.5px solid #F5B8B8",
  borderRadius: 9,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

// ── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span
      style={{
        backgroundColor: active ? "#E6F9F0" : "#F3F4F8",
        color: active ? "#27AE60" : "#8A94A6",
        border: "1px solid " + (active ? "#B2E8CF" : "#E2E6EF"),
        borderRadius: 20,
        padding: "5px 16px",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}

// ── Role Badge ─────────────────────────────────────────────────────────────────

const ROLE_COLORS = {
  Admin: { bg: "#EEF2FF", color: "#3B5BDB", border: "#C5D0FA" },
  Manager: { bg: "#FFF4E6", color: "#E08A00", border: "#FFCC80" },
  User: { bg: "#F3F4F8", color: "#5A6480", border: "#D8DCE8" },
};

function RoleBadge({ role }) {
  const s = ROLE_COLORS[role] || ROLE_COLORS.User;
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: "1px solid " + s.border,
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {role}
    </span>
  );
}

// ── Add / Edit Modal ───────────────────────────────────────────────────────────

function UserModal({ user, onClose, onSave }) {
  const isEdit = !!user;
  const [form, setForm] = useState(
    user
      ? {
          username: user.username,
          email: user.email,
          role: user.role,
          password: "",
          status: user.status,
        }
      : {
          username: "",
          email: "",
          role: "User",
          password: "",
          status: "Active",
        },
  );
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!form.username.trim()) return "Username is required.";
    if (!/^[a-zA-Z0-9_]+$/.test(form.username))
      return "Username can only contain letters, numbers, and underscores.";
    if (!form.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
    if (!isEdit && !form.password) return "Password is required.";
    if (form.password && form.password.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  }

  function handleSave() {
    const err = validate();
    if (err) return setError(err);
    onSave({ ...form, password: form.password || user?.password || "" });
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
          width: 400,
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
            marginBottom: 4,
          }}
        >
          {isEdit ? "Edit User" : "Add New User"}
        </div>
        <div style={{ fontSize: 13, color: "#8A94A6", marginBottom: 20 }}>
          {isEdit
            ? `Editing @${user.username}`
            : "Fill in the details to create a new user."}
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

        <label style={labelStyle}>Username *</label>
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="e.g. john_d"
          style={inputStyle}
        />

        <label style={labelStyle}>Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="e.g. john@example.com"
          style={inputStyle}
        />

        <label style={labelStyle}>Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={inputStyle}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label style={labelStyle}>
          {isEdit ? "New Password (leave blank to keep)" : "Password *"}
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder={isEdit ? "••••••••" : "Min. 6 characters"}
            style={{ ...inputStyle, paddingRight: 44 }}
          />
          <button
            onClick={() => setShowPw((v) => !v)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8A94A6",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        <label style={labelStyle}>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={inputStyle}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ ...btnOutline, flex: 1 }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ ...btnPrimary, flex: 1 }}>
            {isEdit ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────────
function DeleteModal({ user, onClose, onConfirm }) {
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
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            backgroundColor: "#FDE8E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 24,
          }}
        >
          🗑️
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A2C5B",
            marginBottom: 8,
          }}
        >
          Delete User?
        </div>
        <div style={{ color: "#8A94A6", fontSize: 14, marginBottom: 24 }}>
          Are you sure you want to delete{" "}
          <strong style={{ color: "#2D3A55" }}>@{user.username}</strong>? This
          action cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ ...btnOutline, flex: 1 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              ...btnDanger,
              flex: 1,
              backgroundColor: "#E05C5C",
              color: "#fff",
              border: "none",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

function Users() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [visiblePw, setVisiblePw] = useState({});
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()),
  );

  function handleAdd(form) {
    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    setUsers((prev) => [...prev, { id: newId, ...form }]);
    setShowAdd(false);
  }

  function handleEdit(form) {
    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)),
    );
    setEditUser(null);
  }

  function handleDelete() {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
  }

  function togglePw(id) {
    setVisiblePw((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div
      style={{
        padding: "32px 32px",
        fontFamily: "'Inter','Segoe UI',sans-serif",
        minHeight: "100vh",
        backgroundColor: "#F3F4F8",
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1A7FC1",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          USERS
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#0D1B2A",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
        
        </h1>
        <p
          style={{
            color: "#8A94A6",
            fontSize: 14,
            marginTop: 6,
            marginBottom: 0,
          }}
        >
          Review user profiles, roles, and account status.
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "24px 28px",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#0D1B2A" }}>
              User List
            </div>
            <div style={{ fontSize: 13, color: "#8A94A6", marginTop: 2 }}>
              {filtered.length} {filtered.length === 1 ? "user" : "users"} total
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <svg
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle cx="9" cy="9" r="6" stroke="#8A94A6" strokeWidth="2" />
                <path
                  d="M13.5 13.5L17 17"
                  stroke="#8A94A6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users…"
                style={{ ...inputStyle, width: 200, paddingLeft: 32 }}
              />
            </div>
            {/* Add User */}
            <button
              onClick={() => setShowAdd(true)}
              style={{
                ...btnPrimary,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #F0F2F7" }}>
                {[
                  "USERNAME",
                  "EMAIL",
                  "ROLE",
                  "PASSWORD",
                  "STATUS",
                  "ACTIONS",
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
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "48px 0",
                      color: "#8A94A6",
                      fontSize: 15,
                    }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom:
                        i < filtered.length - 1 ? "1px solid #F0F2F7" : "none",
                      transition: "background 0.13s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F8F9FC")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {/* Username */}
                    <td
                      style={{
                        padding: "16px 16px",
                        fontWeight: 700,
                        color: "#0D1B2A",
                        fontSize: 14,
                      }}
                    >
                      {user.username}
                    </td>

                    {/* Email */}
                    <td
                      style={{
                        padding: "16px 16px",
                        color: "#5A6480",
                        fontSize: 14,
                      }}
                    >
                      {user.email}
                    </td>

                    {/* Role */}
                    <td style={{ padding: "16px 16px" }}>
                      <RoleBadge role={user.role} />
                    </td>
                    {/* Password */}
                    <td style={{ padding: "16px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            color: "#0D1B2A",
                            fontSize: 16,
                            letterSpacing: 2,
                          }}
                        >
                          {visiblePw[user.id] ? user.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePw(user.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#8A94A6",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                            backgroundColor: "#F3F4F8",
                          }}
                        >
                          {visiblePw[user.id] ? "Hide" : "Show"}
                        </button>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "16px 16px" }}>
                      <StatusBadge status={user.status} />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "16px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => setEditUser(user)}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#EEF2FF",
                            color: "#3B5BDB",
                            border: "1px solid #C5D0FA",
                            borderRadius: 7,
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteUser(user)}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#FDE8E8",
                            color: "#E05C5C",
                            border: "1px solid #F5B8B8",
                            borderRadius: 7,
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div style={{ marginTop: 20, color: "#8A94A6", fontSize: 13 }}>
          Showing {filtered.length} of {users.length} users
        </div>
      </div>

      {/* Modals */}
      {showAdd && (
        <UserModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {editUser && (
        <UserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleEdit}
        />
      )}
      {deleteUser && (
        <DeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Users;
