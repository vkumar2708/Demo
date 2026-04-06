import { Bar } from "react-chartjs-2";

export default function CompareChart({ emi, sip }) {
  const data = {
    labels: ["EMI", "SIP"],
    datasets: [{ data: [emi, sip] }],
  };

  return <Bar data={data} />;
}