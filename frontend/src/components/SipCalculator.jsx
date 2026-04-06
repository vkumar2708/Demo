import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { GiMoneyStack } from "react-icons/gi";

const formatCurrency = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function SipCalculator({ setSipData }) {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(9.3);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  useEffect(() => {
    const monthlyAmount = Number(monthly) || 0;
    const annualRate = Number(rate) || 0;
    const yearsCount = Number(years) || 0;
    const months = yearsCount * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (!monthlyAmount || !monthlyRate || !months) {
      setFutureValue(0);
      setInvestedAmount(0);
      setTotalReturns(0);
      setSipData?.({ futureValue: 0, investedAmount: 0, totalReturns: 0, monthly: monthlyAmount, rate: annualRate, years: yearsCount });
      return;
    }

    const future = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthlyAmount * months;
    const returnsValue = future - invested;

    setFutureValue(Number(future.toFixed(0)));
    setInvestedAmount(invested);
    setTotalReturns(Number(returnsValue.toFixed(0)));
    setSipData?.({
      futureValue: Number(future.toFixed(0)),
      investedAmount: invested,
      totalReturns: Number(returnsValue.toFixed(0)),
      monthly: monthlyAmount,
      rate: annualRate,
      years: yearsCount,
    });
  }, [monthly, rate, years, setSipData]);

  const barData = [
    { name: "Invested", value: investedAmount },
    { name: "Profit", value: totalReturns },
    { name: "Total", value: futureValue },
  ];

  const pieData = [
    { name: "Invested", value: investedAmount },
    { name: "Returns", value: totalReturns },
  ];

  const pieColors = ["#38bdf8", "#84cc16"];

  return (
    <div className="card">
      <div className="section-header">
        <div>
          <h2><GiMoneyStack className="section-icon" /> SIP Calculator</h2>
          <p>See your investment growth and compounding returns.</p>
        </div>
      </div>

      <div className="card-grid">
        <label>
          Monthly SIP amount
          <input 
            type="number" 
            value={monthly || ""} 
            onChange={e => setMonthly(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter monthly SIP amount"
          />
        </label>
        <label>
          Expected annual return (%)
          <input 
            type="number" 
            step="0.1" 
            value={rate || ""} 
            onChange={e => setRate(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter expected return rate"
          />
        </label>
        <label>
          Investment horizon (years)
          <input 
            type="number" 
            value={years || ""} 
            onChange={e => setYears(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter investment period"
          />
        </label>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Invested amount</span>
          <strong>{formatCurrency(investedAmount)}</strong>
        </div>
        <div className="summary-card">
          <span>Estimated growth</span>
          <strong>{formatCurrency(futureValue)}</strong>
        </div>
        <div className="summary-card">
          <span>Total returns</span>
          <strong>{formatCurrency(totalReturns)}</strong>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Growth breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 20, right: 24, left: 0, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <Tooltip formatter={value => formatCurrency(value)} />
              <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#38bdf8">
                <LabelList dataKey="value" position="top" formatter={value => formatCurrency(value)} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Returns share</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={value => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="comparison-notes">
        <p><strong>What this shows:</strong></p>
        <ul>
          <li>Total invested is your monthly SIP amount times all months.</li>
          <li>Returns are the extra value created by compounding.</li>
          <li>The total growth is invested amount plus returns.</li>
        </ul>
      </div>
    </div>
  );
}
