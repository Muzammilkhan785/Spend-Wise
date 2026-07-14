import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
 
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Props:
// data — array from the analytics API:
//   [{ month_number:1, income:'5000', expense:'2000' }, ...]
// loading — boolean
function MonthlyChart({ data = [], loading }) {
  if (loading) {
    return <div style={{ ...styles.card, height: 320, opacity: 0.4 }} />;
  }
 
  // Transform server data: month_number → month name, string amounts → numbers
  const chartData = data.map((item) => ({
    month: MONTH_NAMES[(item.month_number || 1) - 1],
    income: Number(item.income) || 0,
    expense: Number(item.expense) || 0,
  }));

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Monthly Comparison</h3>
        <div style={styles.legend}>
          <span style={{ ...styles.dot, background: '#10b981' }} /> Income
          <span style={{ ...styles.dot, background: '#374151' }} /> Expense
        </div>
      </div>
 
      {/* ResponsiveContainer makes the chart fill its parent's width */}
      <ResponsiveContainer width='100%' height={260}>
        <BarChart data={chartData} barGap={4} barCategoryGap='35%'>
 
          {/* CartesianGrid — the subtle horizontal lines in the background */}
          <CartesianGrid strokeDasharray='3 3' stroke='#1f2937' vertical={false} />
 
          {/* XAxis — the month labels at the bottom (JAN, FEB, ...) */}
          <XAxis
            dataKey='month'
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
 
          {/* YAxis — the amount labels on the left */}
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => '$' + (v / 1000).toFixed(0) + 'k'}
          />
 
          {/* Tooltip — the popup that shows exact values on hover */}
          <Tooltip
            contentStyle={{
              background: '#1f2937',
              border: '1px solid #1f2937',
              borderRadius: 8,
              color: '#f9fafb',
            }}
            formatter={(value) => ['$' + value.toLocaleString(), '']}
            labelStyle={{ color: '#9ca3af' }}
          />
 
          {/* Two Bar components = two bars side by side per month */}
          <Bar dataKey='income'  fill='#10b981' radius={[4, 4, 0, 0]} />
          <Bar dataKey='expense' fill='#374151' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
 
const styles = {
  card: { background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 24, border: '1px solid var(--color-border)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 600, color: 'var(--color-text)' },
  legend: { display: 'flex', gap: 16, fontSize: 13, color: 'var(--color-text-muted)', alignItems: 'center' },
  dot: { display: 'inline-block', width: 10, height: 10, borderRadius: '50%', marginRight: 4 },
};
 
export default MonthlyChart;

