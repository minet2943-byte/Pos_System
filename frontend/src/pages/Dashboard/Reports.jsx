import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const reportData = {
  Week: [
    { label: 'Mon', sales: 1240, orders: 18 }, { label: 'Tue', sales: 1580, orders: 23 },
    { label: 'Wed', sales: 1120, orders: 16 }, { label: 'Thu', sales: 1840, orders: 27 },
    { label: 'Fri', sales: 2210, orders: 32 }, { label: 'Sat', sales: 2680, orders: 39 },
    { label: 'Sun', sales: 1930, orders: 28 },
  ],
  Month: [
    { label: 'Week 1', sales: 7420, orders: 108 }, { label: 'Week 2', sales: 8680, orders: 126 },
    { label: 'Week 3', sales: 7940, orders: 115 }, { label: 'Week 4', sales: 10010, orders: 146 },
  ],
}

const categories = [
  { name: 'Food', value: 52, color: '#0f766e' },
  { name: 'Drinks', value: 28, color: '#2563eb' },
  { name: 'Desserts', value: 20, color: '#f59e0b' },
]

const bestSellers = [
  { name: 'Beef Noodle', quantity: 86, sales: '$1,032.00' },
  { name: 'Fried Rice', quantity: 74, sales: '$925.00' },
  { name: 'Boba Tea', quantity: 68, sales: '$408.00' },
  { name: 'Spring Rolls', quantity: 51, sales: '$408.00' },
]

const formatCurrency = (value) => `$${Number(value).toLocaleString()}`

export default function Reports() {
  const [range, setRange] = useState('Week')
  const data = reportData[range]
  const totals = useMemo(() => data.reduce((summary, item) => ({
    sales: summary.sales + item.sales,
    orders: summary.orders + item.orders,
  }), { sales: 0, orders: 0 }), [data])
  const averageOrder = totals.sales / totals.orders

  return (
    <section className="page reports-page">
      <div className="reports-header">
        <div>
          <p className="muted">Track your store performance and top-selling products.</p>
        </div>
        <div className="dashboard-segmented" aria-label="Report period">
          {Object.keys(reportData).map((option) => (
            <button className={range === option ? 'active' : ''} key={option} onClick={() => setRange(option)} type="button">
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="report-stats">
        <article><span>Total sales</span><strong>{formatCurrency(totals.sales)}</strong><small>+12.5% from previous period</small></article>
        <article><span>Orders received</span><strong>{totals.orders}</strong><small>+8.2% from previous period</small></article>
        <article><span>Average order</span><strong>{formatCurrency(averageOrder.toFixed(2))}</strong><small>+3.1% from previous period</small></article>
      </div>

      <div className="reports-grid">
        <article className="content-panel report-chart-panel">
          <div className="panel-heading"><div><h2>Sales performance</h2><p className="muted">Revenue over the selected period</p></div></div>
          <div className="report-chart">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data} margin={{ top: 8, right: 6, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#e8eef5" vertical={false} />
                <XAxis axisLine={false} dataKey="label" tickLine={false} />
                <YAxis axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Sales']} />
                <Bar dataKey="sales" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="content-panel report-category-panel">
          <div><h2>Sales by category</h2><p className="muted">Share of total sales</p></div>
          <div className="category-chart">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart><Pie data={categories} dataKey="value" innerRadius={52} outerRadius={76} paddingAngle={3}>{categories.map((category) => <Cell fill={category.color} key={category.name} />)}</Pie><Tooltip formatter={(value) => `${value}%`} /></PieChart>
            </ResponsiveContainer>
          </div>
          <div className="category-legend">{categories.map((category) => <span key={category.name}><i style={{ background: category.color }} />{category.name}<b>{category.value}%</b></span>)}</div>
        </article>
      </div>

      <article className="content-panel best-sellers-panel">
        <div className="panel-heading"><div><h2>Best-selling products</h2><p className="muted">Products generating the most sales this {range.toLowerCase()}</p></div></div>
        <div className="table-wrap"><table><thead><tr><th>Product</th><th>Units sold</th><th>Sales</th></tr></thead><tbody>{bestSellers.map((product) => <tr key={product.name}><td>{product.name}</td><td>{product.quantity}</td><td><strong>{product.sales}</strong></td></tr>)}</tbody></table></div>
      </article>
    </section>
  )
}
