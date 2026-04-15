import { useState } from "react";
import axios from "axios";
import { MdAutoAwesome } from "react-icons/md";
import { apiBaseUrl } from "../apiBaseUrl";

export default function AiAdvisor() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [advice, setAdvice] = useState("");

  const getAdvice = async () => {
    const res = await axios.post(`${apiBaseUrl}/api/ai`, {
      income,
      expense,
    });
    setAdvice(res.data.advice);
  };

  return (
    <div className="glass">
      <h2><MdAutoAwesome className="section-icon" /> AI Advisor</h2>
      <input onChange={e => setIncome(e.target.value)} placeholder="Income" />
      <input onChange={e => setExpense(e.target.value)} placeholder="Expense" />
      <button onClick={getAdvice}>Get Advice</button>
      <p>{advice}</p>
    </div>
  );
}
