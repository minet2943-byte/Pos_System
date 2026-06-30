import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartViews = {
  Daily: [
    { label: 'Mon', sales: 12, orders: 18 },
    { label: 'Tue', sales: 19, orders: 24 },
    { label: 'Wed', sales: 8, orders: 13 },
    { label: 'Thu', sales: 25, orders: 31 },
    { label: 'Fri', sales: 31, orders: 38 },
    { label: 'Sat', sales: 22, orders: 29 },
    { label: 'Sun', sales: 15, orders: 20 },
  ],
  Monthly: [
    { label: 'Jan', sales: 20, orders: 72 },
    { label: 'Feb', sales: 27, orders: 84 },
    { label: 'Mar', sales: 35, orders: 98 },
    { label: 'Apr', sales: 41, orders: 112 },
    { label: 'May', sales: 31, orders: 91 },
    { label: 'Jun', sales: 47, orders: 128 },
    { label: 'Jul', sales: 54, orders: 143 },
    { label: 'Aug', sales: 38, orders: 104 },
    { label: 'Sep', sales: 44, orders: 116 },
    { label: 'Oct', sales: 50, orders: 135 },
    { label: 'Nov', sales: 61, orders: 156 },
    { label: 'Dec', sales: 41, orders: 111 },
  ],
}

const recentOrders = [
  { id: '#ORD-001', customer: 'Sophea Mao', item: 'Beef Noodle', amount: '$24.00', status: 'Completed' },
  { id: '#ORD-002', customer: 'Dara Chea', item: 'Fried Rice', amount: '$12.50', status: 'Pending' },
  { id: '#ORD-003', customer: 'Lina Keo', item: 'Spring Rolls', amount: '$8.00', status: 'Completed' },
  { id: '#ORD-004', customer: 'Vuthy Prak', item: 'Amok Fish', amount: '$18.00', status: 'Preparing' },
  { id: '#ORD-005', customer: 'Sreymom Ty', item: 'Boba Tea', amount: '$5.50', status: 'Completed' },
]

const inventoryAlerts = [
  { name: 'Cola Can', stock: 5, target: 28 },
  { name: 'Hand Soap', stock: 8, target: 20 },
  { name: 'Orange Juice', stock: 18, target: 32 },
]

const quickStats = [
  {
    icon: 'cash',
    label: 'Total Sales',
    value: '$12,450',
    trend: '+12.5%',
    helper: 'vs last month',
    tone: 'teal',
  },
  {
    icon: 'receipt',
    label: 'Orders',
    value: '154',
    trend: '+8.2%',
    helper: 'new orders',
    tone: 'blue',
  },
  {
    icon: 'chart',
    label: 'Revenue',
    value: '$8,200',
    trend: '+5.4%',
    helper: 'net revenue',
    tone: 'amber',
  },
  {
    icon: 'users',
    label: 'Customers',
    value: '1,200',
    trend: '+1.2%',
    helper: 'active buyers',
    tone: 'rose',
  },
]

const statusClass = {
  Completed: 'success',
  Pending: 'warning',
  Preparing: 'info',
}

function DashboardIcon({ name }) {
  const icons = {
    cash: (
      <>
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <circle cx="12" cy="12" r="2.3" />
        <path d="M7 10v4M17 10v4" />
      </>
    ),
    receipt: (
      <>
        <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <rect x="7" y="11" width="3" height="5" rx="1" />
        <rect x="12" y="7" width="3" height="9" rx="1" />
        <rect x="17" y="9" width="3" height="7" rx="1" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15.5 15.5A5 5 0 0 1 21 20" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function DashboardTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="dashboard-tooltip">
      <span>{label}</span>
      <strong>{payload[0].value}k sales</strong>
    </div>
  )
}

export default function Dashboard() {
  const [view, setView] = useState('Monthly')
  const data = chartViews[view]
  const maxSales = useMemo(() => Math.max(...data.map((item) => item.sales)), [data])

  return (
    <section className="page dashboard-page">
      <div className="dashboard-summary">
        <div>
          <p className="eyebrow">Store overview</p>
          <h2>Today at a glance</h2>
        </div>
        <div className="dashboard-register">
          <span>Register</span>
          <strong>Open</strong>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        {quickStats.map((stat) => (
          <article className={`dashboard-stat-card ${stat.tone}`} key={stat.label}>
            <div className="dashboard-stat-icon">
              <DashboardIcon name={stat.icon} />
            </div>
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>
                <b>{stat.trend}</b> {stat.helper}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="content-panel dashboard-chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Sales Overview</h2>
              <p className="muted">{view === 'Monthly' ? 'Monthly sales performance' : 'Daily sales performance'}</p>
            </div>
            <div className="dashboard-segmented" aria-label="Sales chart range">
              {Object.keys(chartViews).map((option) => (
                <button
                  className={view === option ? 'active' : ''}
                  key={option}
                  onClick={() => setView(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap="34%" margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e8eef5" />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }}
                  tickLine={false}
                />
                <YAxis axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} />
                <Tooltip content={<DashboardTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                  {data.map((entry) => (
                    <Cell fill={entry.sales === maxSales ? '#0f766e' : '#99d8d0'} key={entry.label} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="content-panel dashboard-orders-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Orders</h2>
              <p className="muted">Latest kitchen and counter activity</p>
            </div>
            <button className="dashboard-link-button" type="button">View all</button>
          </div>

          <div className="dashboard-order-list">
            {recentOrders.map((order) => (
              <article className="dashboard-order" key={order.id}>
                <div>
                  <strong>{order.customer}</strong>
                  <span>{order.item} - {order.id}</span>
                </div>
                <div>
                  <b>{order.amount}</b>
                  <small className={`status-pill ${statusClass[order.status]}`}>{order.status}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-panel dashboard-alert-panel">
          <div className="panel-heading">
            <div>
              <h2>Inventory Watch</h2>
              <p className="muted">Items moving toward reorder</p>
            </div>
          </div>
          <div className="inventory-alert-list">
            {inventoryAlerts.map((item) => (
              <article className="inventory-alert" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.stock} left - target {item.target}</span>
                </div>
                <meter min="0" max={item.target} value={item.stock}>
                  {item.stock} of {item.target}
                </meter>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
