import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { MdCompareArrows } from "react-icons/md";

const formatCurrency = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const calculateEmi = (principal, annualRate, years) => {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  if (!principal || !monthlyRate || !months) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  const rawEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const emi = Number(rawEmi.toFixed(0));
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest, months };
};

const calculateSip = (monthly, annualRate, years) => {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  if (!monthly || !monthlyRate || !months) return { futureValue: 0, investedAmount: 0, totalReturns: 0 };
  const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = monthly * months;
  const totalReturns = futureValue - investedAmount;
  return {
    futureValue: Number(futureValue.toFixed(0)),
    investedAmount: Number(investedAmount.toFixed(0)),
    totalReturns: Number(totalReturns.toFixed(0)),
    months,
  };
};

export default function EmiVsSipComparison() {
  const [loan, setLoan] = useState(500000);
  const [loanRate, setLoanRate] = useState(8);
  const [loanYears, setLoanYears] = useState(5);
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const emiResult = useMemo(() => calculateEmi(loan, loanRate, loanYears), [loan, loanRate, loanYears]);
  const sipResult = useMemo(() => calculateSip(sipMonthly, sipRate, sipYears), [sipMonthly, sipRate, sipYears]);

  const chartData = [
    { name: "EMI Total Payment", value: emiResult.totalPayment },
    { name: "SIP Future Value", value: sipResult.futureValue },
    { name: "SIP Invested", value: sipResult.investedAmount },
  ];

  return (
    <div className="card comparison-card">
      <div className="section-header">
        <div>
          <h2><MdCompareArrows className="section-icon" /> EMI vs SIP Calculator</h2>
          <p>Compare loan repayment reduction and investment compounding in one place, using fresh inputs.</p>
        </div>
      </div>

      <div className="comparison-input-grid">
        <div className="comparison-panel">
          <h3>EMI inputs</h3>
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
            Interest rate (% p.a.)
            <input 
              type="number" 
              step="0.1" 
              value={loanRate || ""} 
              onChange={e => setLoanRate(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="Enter interest rate"
            />
          </label>
          <label>
            Repayment period (years)
            <input 
              type="number" 
              value={loanYears || ""} 
              onChange={e => setLoanYears(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="Enter repayment period"
            />
          </label>
        </div>

        <div className="comparison-panel">
          <h3>SIP inputs</h3>
          <label>
            Monthly SIP amount
            <input 
              type="number" 
              value={sipMonthly || ""} 
              onChange={e => setSipMonthly(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="Enter monthly SIP amount"
            />
          </label>
          <label>
            Expected return (% p.a.)
            <input 
              type="number" 
              step="0.1" 
              value={sipRate || ""} 
              onChange={e => setSipRate(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="Enter expected return rate"
            />
          </label>
          <label>
            Investment period (years)
            <input 
              type="number" 
              value={sipYears || ""} 
              onChange={e => setSipYears(e.target.value === "" ? 0 : Number(e.target.value))}
              placeholder="Enter investment period"
            />
          </label>
        </div>
      </div>

      <div className="summary-grid" style={{ marginTop: 18 }}>
        <div className="summary-card">
          <span>EMI monthly</span>
          <strong>{formatCurrency(emiResult.emi)}</strong>
        </div>
        <div className="summary-card">
          <span>EMI total interest</span>
          <strong>{formatCurrency(emiResult.totalInterest)}</strong>
        </div>
        <div className="summary-card">
          <span>SIP future value</span>
          <strong>{formatCurrency(sipResult.futureValue)}</strong>
        </div>
        <div className="summary-card">
          <span>SIP total returns</span>
          <strong>{formatCurrency(sipResult.totalReturns)}</strong>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 32, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
            <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Tooltip formatter={value => formatCurrency(value)} />
            <Bar dataKey="value" fill="#6366f1" radius={[12, 12, 0, 0]}>
              <LabelList dataKey="value" position="top" formatter={value => formatCurrency(value)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="comparison-notes">
        <p><strong>What this means:</strong></p>
        <ul>
          <li>EMI is a reducing effect: as you pay, the loan balance decreases and interest falls each month.</li>
          <li>SIP is a compounding effect: returns are earned on both the invested amount and prior gains.</li>
          <li>Compare the <strong>total money paid</strong> for EMI vs the <strong>future value earned</strong> from SIP.</li>
        </ul>
      </div>
    </div>
  );
}
