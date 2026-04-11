import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MdCalculate } from "react-icons/md";

const formatCurrency = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function EmiCalculator({ setEmiData }) {
  const [loan, setLoan] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  // eslint-disable-next-line no-unused-vars
  // const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [summary, setSummary] = useState({ emi: 0, months: 0, totalPayment: 0, totalInterest: 0 });
  // const [selectedMonth, setSelectedMonth] = useState(1);

  useEffect(() => {
    const principal = Number(loan) || 0;
    const annualRate = Number(rate) || 0;
    const yearsCount = Number(years) || 0;
    const months = yearsCount * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (!principal || !monthlyRate || !months) {
      setEmi(0);
      setSchedule([]);
      setSummary({ emi: 0, months: 0, totalPayment: 0, totalInterest: 0 });
      // setSelectedMonth(1);
      setEmiData?.({ emi: 0, months: 0, totalPayment: 0, totalInterest: 0, loan: principal, rate: annualRate, years: yearsCount });
      return;
    }

    const rawEmi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const emiValue = Number(rawEmi.toFixed(0));

    let remaining = principal;
    let totalInterest = 0;
    const rows = [];

    for (let month = 1; month <= months; month += 1) {
      const interestAmount = remaining * monthlyRate;
      const principalAmount = rawEmi - interestAmount;
      remaining = Math.max(remaining - principalAmount, 0);
      totalInterest += interestAmount;

      rows.push({
        month,
        emi: emiValue,
        principal: principalAmount,
        interest: interestAmount,
        outstanding: remaining,
      });
    }

    const totalPayment = emiValue * months;
    setSchedule(rows);
    setEmi(emiValue);
    setSummary({
      emi: emiValue,
      months,
      totalPayment,
      totalInterest: Number(totalInterest.toFixed(0)),
    });
    // setSelectedMonth(prev => Math.min(Math.max(prev, 1), months));
    setEmiData?.({
      emi: emiValue,
      months,
      totalPayment,
      totalInterest: Number(totalInterest.toFixed(0)),
      loan: principal,
      rate: annualRate,
      years: yearsCount,
    });
  }, [loan, rate, years, setEmiData]);

  const principalPaidTotal = summary.totalPayment - summary.totalInterest;
  const pieData = [
    { name: "Principal", value: principalPaidTotal },
    { name: "Interest", value: summary.totalInterest },
  ];
  const pieColors = ["#22c55e", "#6366f1"];
  const lineData = schedule.map(item => ({ month: item.month, outstanding: Number(item.outstanding.toFixed(0)) }));

  const downloadSchedule = () => {
    if (!schedule.length) return;

    const header = ["Month", "EMI", "Principal", "Interest"].join(",");
    const rows = schedule
      .map(row => [row.month, row.emi, row.principal.toFixed(0), row.interest.toFixed(0)].join(","))
      .join("\n");

    const blob = new Blob([header + "\n" + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "emi_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="section-header">
        <div>
          <h2><MdCalculate className="section-icon" /> EMI Calculator</h2>
          <p>See your monthly payment, interest breakdown, and amortization schedule.</p>
        </div>
      </div>

      <div className="card-grid">
        <label>
          Loan amount
          <input 
            type="number" 
            value={loan || ""} 
            onChange={e => setLoan(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter loan amount"
          />
        </label>
        <label>
          Annual interest rate (%)
          <input 
            type="number" 
            step="0.1" 
            value={rate || ""} 
            onChange={e => setRate(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter interest rate"
          />
        </label>
        <label>
          Loan term (years)
          <input 
            type="number" 
            value={years || ""} 
            onChange={e => setYears(e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder="Enter loan term"
          />
        </label>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Monthly EMI</span>
          <strong>{formatCurrency(summary.emi)}</strong>
        </div>
        <div className="summary-card">
          <span>Loan term</span>
          <strong>{summary.months} months</strong>
        </div>
        <div className="summary-card">
          <span>Total interest</span>
          <strong>{formatCurrency(summary.totalInterest)}</strong>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Payment breakup</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={value => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Outstanding balance trend</h3>
          <div className="chart-scroll-container">
            {lineData.length > 0 && (
              <LineChart 
                width={Math.max(lineData.length * 35 + 80, 500)} 
                height={260} 
                data={lineData} 
                margin={{ top: 18, right: 18, left: 40, bottom: 8 }}
              >
                <CartesianGrid stroke="rgba(148,163,184,0.18)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "#cbd5e1", fontSize: 10 }} 
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  label={{ value: "Month", position: "insideBottom", offset: -10, fill: "#94a3b8" }} 
                />
                <YAxis tick={{ fill: "#cbd5e1", fontSize: 11 }} width={35} />
                <Tooltip 
                  formatter={value => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(99, 102, 241, 0.5)",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    color: "#cbd5e1"
                  }}
                  cursor={{ stroke: "rgba(99, 102, 241, 0.3)", strokeWidth: 1 }}
                />
                <Line type="monotone" dataKey="outstanding" stroke="#6366f1" strokeWidth={2} dot={{ r: 2, fill: "#38bdf8" }} activeDot={{ r: 4, fill: "#ccff00" }} />
              </LineChart>
            )}
          </div>
        </div>
      </div>

      <div className="schedule-table-wrapper">
        <div className="schedule-header">
          <h3>Amortization Schedule</h3>
          <button className="primary-button" onClick={downloadSchedule} disabled={!schedule.length}>
            Export Full Schedule
          </button>
        </div>
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(row => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{formatCurrency(row.emi)}</td>
                  <td>{formatCurrency(Number(row.principal.toFixed(0)))}</td>
                  <td>{formatCurrency(Number(row.interest.toFixed(0)))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="schedule-note">Showing all {schedule.length} of {schedule.length} months. Scroll to view all rows.</p>
      </div>
    </div>
  );
}
