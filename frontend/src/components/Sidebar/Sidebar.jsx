const menuItems = [
  "Dashboard",
  "Products",
  // "Create Product",
  "Categories",
  "Orders",
  "Reports",
  "Users",
];

const sidebarIcons = {
  Dashboard: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  ),
  Products: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l4 6H8l4-6z" />
      <rect x="4" y="15" width="6" height="5" rx="1" />
      <rect x="14" y="15" width="6" height="5" rx="1" />
    </svg>
  ),
  Categories: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
      <circle cx="7" cy="7" r="1" />
      <circle cx="7" cy="12" r="1" />
      <circle cx="7" cy="17" r="1" />
    </svg>
  ),
  Orders: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h12l1 18H5L6 3z" />
      <path d="M9 7a3 3 0 0 0 6 0" />
    </svg>
  ),
  Reports: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 15v-4" />
      <path d="M12 15V8" />
      <path d="M15 15v-2" />
    </svg>
  ),
  Users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 15.5A5 5 0 0 1 21 20" />
    </svg>
  ),
  // "Create Product": (
  //   <svg viewBox="0 0 24 24" aria-hidden="true">
  //     <path d="M12 5v14" />
  //     <path d="M5 12h14" />
  //   </svg>
  // ),
  Settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-2 .3 1.7 1.7 0 0 0-.5 1.4v.2H9v-.2a1.7 1.7 0 0 0-.5-1.4 1.7 1.7 0 0 0-2-.3l-.2.1-2-3.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.2-1.1l-.2-.1V10l.2-.1a1.7 1.7 0 0 0 1.2-1.1 1.7 1.7 0 0 0-.3-1.9L4.3 6.8l2-3.4.2.1a1.7 1.7 0 0 0 2-.3A1.7 1.7 0 0 0 9 1.8v-.2h6v.2a1.7 1.7 0 0 0 .5 1.4 1.7 1.7 0 0 0 2 .3l.2-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.2 1.1l.2.1v3.8l-.2.1a1.7 1.7 0 0 0-1.1 1.1z" />
    </svg>
  ),
  Logout: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M12 4h7v16h-7" />
    </svg>
  ),
};

function Sidebar({ activePage, onLogout, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">P</span>
        <strong>POS System</strong>
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <button
            className={activePage === item ? "active" : ""}
            key={item}
            onClick={() => onNavigate(item)}
            type="button"
          >
            <span className="sidebar-icon">{sidebarIcons[item]}</span>
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <nav
        className="sidebar-nav sidebar-account-nav"
        aria-label="Account navigation"
      >
        <button
          className={activePage === "Settings" ? "active" : ""}
          onClick={() => onNavigate("Settings")}
          type="button"
        >
          <span className="sidebar-icon">{sidebarIcons.Settings}</span>
          <span>Settings</span>
        </button>
        <button onClick={onLogout} type="button">
          <span className="sidebar-icon">{sidebarIcons.Logout}</span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
