import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
 
// Props:
// data — array: [{ category:'Housing', amount:1928, percentage:40.1, color:'#6B7280' }]
// loading — boolean
function CategoryChart({ data: rawData = [], loading }) {
  // Ensure amounts are numbers (server may return strings from PostgreSQL)
  const data = rawData.map((item) => ({
    ...item,
    amount: Number(item.amount) || 0,
    color: item.color || '#6B7280',
  }));

  // Calculate total for the center label
  const total = data.reduce((sum, item) => sum + item.amount, 0);
 
  if (loading) {
    return <div style={{ ...styles.card, height: 300, opacity: 0.4 }} />;
  }
 
  // Custom center label component — renders inside the donut hole
  const CenterLabel = () => (
    <text x='50%' y='50%' textAnchor='middle' dominantBaseline='middle'>
      <tspan x='50%' dy='-8' style={{ fill:'#9ca3af', fontSize:12 }}>
        TOTAL
      </tspan>
      <tspan x='50%' dy='22' style={{ fill:'#f9fafb', fontSize:18, fontWeight:700 }}>
        {'$' + (total / 1000).toFixed(1) + 'k'}
      </tspan>
    </text>
  );
 
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Spending by Category</h3>
 
      {/* Donut chart */}
      <ResponsiveContainer width='100%' height={200}>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}   // Creates the donut hole (vs. a full pie)
            outerRadius={90}
            dataKey='amount'   // Value that determines slice size
            paddingAngle={2}   // Small gap between slices
            labelLine={false}
          >
            {/* Map each data item to a Cell with its own color from the DB */}
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          {/* CenterLabel is an SVG element rendered inside the donut */}
          <CenterLabel />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Amount']}
            contentStyle={{ background: '#1f2937', border: '1px solid #1f2937', borderRadius: 8, color: '#f9fafb' }}
          />
        </PieChart>
      </ResponsiveContainer>
 
      {/* Legend below the chart */}
      <div style={styles.legend}>
        {data.map((item, i) => (
          <div key={i} style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: item.color }} />
            <span style={styles.legendName}>{item.category}</span>
            <span style={styles.legendAmount}>{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
const styles = {
  card: { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)' },
  title: { fontSize:18, fontWeight:600, color:'var(--color-text)', marginBottom:16 },
  legend: { display:'flex', flexDirection:'column', gap:12, marginTop:16 },
  legendItem: { display:'flex', alignItems:'center', gap:10 },
  legendDot: { width:10, height:10, borderRadius:'50%', flexShrink:0 },
  legendName: { flex:1, fontSize:14, color:'var(--color-text)' },
  legendAmount: { fontSize:14, fontWeight:600, color:'var(--color-text)' },
};
 
export default CategoryChart;
